import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'jsr:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const app = new Hono();

// Middleware
app.use('*', cors());
app.use('*', logger(console.log));

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

// Helper function to generate unique IDs
function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// ==================== AUTH ====================

// Sign up a new user with auto-confirmation
app.post('/make-server-46b7cb79/auth/signup', async (c) => {
  try {
    const body = await c.req.json();
    const { email, password, name } = body;

    if (!email || !password || !name) {
      return c.json({ error: 'Missing required fields: email, password, name' }, 400);
    }

    // Use admin API to create user with email_confirm: true
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since we're disabling email confirmation
      email_confirm: true
    });

    if (error) {
      console.error('Signup error:', error);
      return c.json({ error: error.message }, 400);
    }

    if (!data.user) {
      return c.json({ error: 'Failed to create user' }, 500);
    }

    console.log(`User created successfully: ${data.user.id} (${email})`);

    return c.json({
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email,
        name: name,
        created_at: data.user.created_at
      }
    });
  } catch (error) {
    console.error('Signup exception:', error);
    return c.json({ error: 'Failed to create user', details: error.message }, 500);
  }
});

// ==================== BOOKINGS ====================

// Create a new booking
app.post('/make-server-46b7cb79/bookings', async (c) => {
  try {
    const body = await c.req.json();
    const { sport, venueId, venueName, date, timeSlot, price, promoCode, userId } = body;

    if (!sport || !venueId || !venueName || !date || !timeSlot || !price) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    const bookingId = generateId('booking');
    const booking = {
      id: bookingId,
      sport,
      venueId,
      venueName,
      date,
      timeSlot,
      price,
      promoCode: promoCode || null,
      userId: userId || 'guest',
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await kv.set(`booking:${bookingId}`, booking);
    
    // Also store by user for easy retrieval
    if (userId) {
      const userBookingsKey = `user_bookings:${userId}`;
      const existingBookings = await kv.get(userBookingsKey) || [];
      existingBookings.push(bookingId);
      await kv.set(userBookingsKey, existingBookings);
    }

    console.log(`Booking created successfully: ${bookingId}`);
    return c.json({ success: true, booking });
  } catch (error) {
    console.error('Error creating booking:', error);
    return c.json({ error: 'Failed to create booking', details: error.message }, 500);
  }
});

// Get a specific booking
app.get('/make-server-46b7cb79/bookings/:id', async (c) => {
  try {
    const bookingId = c.req.param('id');
    const booking = await kv.get(`booking:${bookingId}`);

    if (!booking) {
      return c.json({ error: 'Booking not found' }, 404);
    }

    return c.json({ success: true, booking });
  } catch (error) {
    console.error('Error fetching booking:', error);
    return c.json({ error: 'Failed to fetch booking', details: error.message }, 500);
  }
});

// Get all bookings for a user
app.get('/make-server-46b7cb79/users/:userId/bookings', async (c) => {
  try {
    const userId = c.req.param('userId');
    const bookingIds = await kv.get(`user_bookings:${userId}`) || [];
    
    const bookings = await Promise.all(
      bookingIds.map(async (id: string) => await kv.get(`booking:${id}`))
    );

    return c.json({ success: true, bookings: bookings.filter(Boolean) });
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    return c.json({ error: 'Failed to fetch bookings', details: error.message }, 500);
  }
});

// Cancel a booking
app.delete('/make-server-46b7cb79/bookings/:id', async (c) => {
  try {
    const bookingId = c.req.param('id');
    const booking = await kv.get(`booking:${bookingId}`);

    if (!booking) {
      return c.json({ error: 'Booking not found' }, 404);
    }

    // Update status instead of deleting
    booking.status = 'cancelled';
    booking.updatedAt = new Date().toISOString();
    await kv.set(`booking:${bookingId}`, booking);

    console.log(`Booking cancelled: ${bookingId}`);
    return c.json({ success: true, message: 'Booking cancelled successfully' });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    return c.json({ error: 'Failed to cancel booking', details: error.message }, 500);
  }
});

// ==================== REVIEWS ====================

// Create a new review
app.post('/make-server-46b7cb79/reviews', async (c) => {
  try {
    const body = await c.req.json();
    const { venueId, userId, userName, rating, comment } = body;

    if (!venueId || !rating || !comment) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    if (rating < 1 || rating > 5) {
      return c.json({ error: 'Rating must be between 1 and 5' }, 400);
    }

    const reviewId = generateId('review');
    const review = {
      id: reviewId,
      venueId,
      userId: userId || 'guest',
      userName: userName || 'Anonymous',
      rating,
      comment,
      date: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    };

    await kv.set(`review:${reviewId}`, review);
    
    // Store by venue for easy retrieval
    const venueReviewsKey = `venue_reviews:${venueId}`;
    const existingReviews = await kv.get(venueReviewsKey) || [];
    existingReviews.push(reviewId);
    await kv.set(venueReviewsKey, existingReviews);

    console.log(`Review created successfully: ${reviewId}`);
    return c.json({ success: true, review });
  } catch (error) {
    console.error('Error creating review:', error);
    return c.json({ error: 'Failed to create review', details: error.message }, 500);
  }
});

// Get all reviews for a venue
app.get('/make-server-46b7cb79/venues/:venueId/reviews', async (c) => {
  try {
    const venueId = c.req.param('venueId');
    const reviewIds = await kv.get(`venue_reviews:${venueId}`) || [];
    
    const reviews = await Promise.all(
      reviewIds.map(async (id: string) => await kv.get(`review:${id}`))
    );

    return c.json({ success: true, reviews: reviews.filter(Boolean) });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return c.json({ error: 'Failed to fetch reviews', details: error.message }, 500);
  }
});

// ==================== VENUE AVAILABILITY ====================

// Get booked slots for a venue on a specific date
app.get('/make-server-46b7cb79/venues/:venueId/availability', async (c) => {
  try {
    const venueId = c.req.param('venueId');
    const date = c.req.query('date');

    if (!date) {
      return c.json({ error: 'Date parameter is required' }, 400);
    }

    // Get all bookings with prefix
    const allBookings = await kv.getByPrefix('booking:');
    
    // Filter bookings for this venue and date
    const bookedSlots = allBookings
      .filter((booking: any) => 
        booking.venueId === venueId && 
        booking.date === date &&
        booking.status === 'confirmed'
      )
      .map((booking: any) => booking.timeSlot);

    return c.json({ success: true, bookedSlots });
  } catch (error) {
    console.error('Error fetching availability:', error);
    return c.json({ error: 'Failed to fetch availability', details: error.message }, 500);
  }
});

// ==================== STATISTICS ====================

// Get booking statistics
app.get('/make-server-46b7cb79/stats', async (c) => {
  try {
    const allBookings = await kv.getByPrefix('booking:');
    const confirmedBookings = allBookings.filter((b: any) => b.status === 'confirmed');
    
    const stats = {
      totalBookings: allBookings.length,
      confirmedBookings: confirmedBookings.length,
      cancelledBookings: allBookings.filter((b: any) => b.status === 'cancelled').length,
      totalRevenue: confirmedBookings.reduce((sum: number, b: any) => sum + (b.price || 0), 0)
    };

    return c.json({ success: true, stats });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return c.json({ error: 'Failed to fetch stats', details: error.message }, 500);
  }
});

// ==================== HEALTH CHECK ====================

app.get('/make-server-46b7cb79/health', (c) => {
  return c.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    service: 'SportHub Booking API'
  });
});

// 404 handler
app.notFound((c) => {
  return c.json({ error: 'Not found' }, 404);
});

// Error handler
app.onError((err, c) => {
  console.error('Server error:', err);
  return c.json({ error: 'Internal server error', details: err.message }, 500);
});

Deno.serve(app.fetch);
