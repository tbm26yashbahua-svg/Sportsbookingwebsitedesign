# Supabase Integration Guide

## Overview

Your SportHub booking platform is now connected to Supabase with a fully functional backend API. All bookings, reviews, and availability data are stored in the Supabase key-value store.

## 🎯 Features Implemented

### 1. **Booking Management**
- ✅ Create new bookings with payment processing
- ✅ Retrieve booking details by ID
- ✅ Get all bookings for a user
- ✅ Cancel bookings (soft delete)
- ✅ Real-time availability checking

### 2. **Review System**
- ✅ Post reviews for venues
- ✅ Retrieve all reviews for a specific venue
- ✅ Ratings from 1-5 stars

### 3. **Availability Tracking**
- ✅ Check booked time slots for any venue on any date
- ✅ Prevent double bookings
- ✅ Real-time slot availability updates

### 4. **Statistics & Analytics**
- ✅ Total bookings count
- ✅ Confirmed vs cancelled bookings
- ✅ Total revenue tracking

## 🗄️ Data Structure

The application uses Supabase's KV (Key-Value) store with the following structure:

### Bookings
```typescript
Key: "booking:{bookingId}"
Value: {
  id: string,
  sport: string,
  venueId: string,
  venueName: string,
  date: string,
  timeSlot: string,
  price: number,
  promoCode?: string,
  userId: string,
  status: 'confirmed' | 'cancelled',
  createdAt: string,
  updatedAt: string
}
```

### User Bookings Index
```typescript
Key: "user_bookings:{userId}"
Value: string[] // Array of booking IDs
```

### Reviews
```typescript
Key: "review:{reviewId}"
Value: {
  id: string,
  venueId: string,
  userId: string,
  userName: string,
  rating: number (1-5),
  comment: string,
  date: string,
  createdAt: string
}
```

### Venue Reviews Index
```typescript
Key: "venue_reviews:{venueId}"
Value: string[] // Array of review IDs
```

## 🚀 API Endpoints

Base URL: `https://{projectId}.supabase.co/functions/v1/make-server-46b7cb79`

### Bookings

#### Create Booking
```
POST /bookings
Body: {
  sport: string,
  venueId: string,
  venueName: string,
  date: string,
  timeSlot: string,
  price: number,
  promoCode?: string,
  userId?: string
}
```

#### Get Booking
```
GET /bookings/:id
```

#### Get User Bookings
```
GET /users/:userId/bookings
```

#### Cancel Booking
```
DELETE /bookings/:id
```

### Reviews

#### Create Review
```
POST /reviews
Body: {
  venueId: string,
  userId?: string,
  userName?: string,
  rating: number (1-5),
  comment: string
}
```

#### Get Venue Reviews
```
GET /venues/:venueId/reviews
```

### Availability

#### Check Venue Availability
```
GET /venues/:venueId/availability?date={date}
```

### Statistics

#### Get Booking Statistics
```
GET /stats
```

### Health Check
```
GET /health
```

## 💡 How It Works

### 1. **Creating a Booking**
When a user completes payment:
- A unique booking ID is generated
- Booking data is stored in the KV store
- The booking ID is added to the user's booking list
- The time slot becomes unavailable for that date

### 2. **Checking Availability**
When a user selects a date:
- All bookings are fetched from the KV store
- Bookings are filtered by venue and date
- Booked time slots are returned
- Frontend disables those slots in the UI

### 3. **Posting Reviews**
After a booking:
- Users can submit reviews with ratings
- Reviews are stored with venue association
- Average ratings can be calculated from all reviews

## 🧪 Testing the Integration

### Test a Complete Booking Flow:

1. **Browse Sports**: Visit `/sports`
2. **Select a Sport**: Choose any sport (e.g., Badminton)
3. **View Venues**: Select a venue
4. **Book a Slot**: 
   - Choose a date
   - Select a time slot (note which ones are available)
   - Continue to summary
   - Apply promo code: `SAVE10`, `FIRST10`, or `WELCOME10`
   - Proceed to payment
5. **Complete Payment**: 
   - Enter card: `1234 5678 9012 3456`
   - Expiry: `12/25`
   - CVV: `123`
   - Submit payment
6. **Confirmation**: View booking confirmation with booking ID
7. **Check Stats**: Visit `/admin/stats` to see your booking

### Test Availability:

1. Book a time slot for a specific date
2. Go back and try to book the same venue on the same date
3. The previously booked time slot should now show as "Booked"

## 📊 Viewing Your Data

### Admin Dashboard
Visit `/admin/stats` to see:
- Total number of bookings
- Confirmed vs cancelled bookings
- Total revenue generated
- List of all recent bookings

### Browser Console
The app logs all API calls to the console:
- Open Developer Tools (F12)
- Check the Console tab
- You'll see confirmation of successful bookings, API responses, etc.

## 🔧 API Client Usage

The frontend uses a centralized API client located at `/utils/api.ts`:

```typescript
import { createBooking, getVenueAvailability } from './utils/api';

// Create a booking
const response = await createBooking({
  sport: 'badminton',
  venueId: 'v1',
  venueName: 'Elite Sports Arena',
  date: 'Monday, December 2, 2025',
  timeSlot: '6:00 PM',
  price: 25.00,
  userId: 'guest'
});

// Check availability
const availability = await getVenueAvailability('v1', 'Monday, December 2, 2025');
console.log('Booked slots:', availability.data.bookedSlots);
```

## 🔐 Security

- All API calls use Bearer token authentication
- The Supabase service role key is kept server-side only
- Frontend uses the public anon key for API requests
- User data is isolated by userId

## 📝 Notes

- **No Schema Required**: The KV store is schema-less, perfect for rapid prototyping
- **Flexible Data**: You can easily add new fields to bookings or reviews
- **Fast Queries**: Prefix-based queries allow efficient data retrieval
- **Scalable**: The KV store can handle thousands of bookings

## 🎉 Next Steps

You can extend the functionality by:
1. Adding user authentication with Supabase Auth
2. Implementing email notifications for bookings
3. Adding venue owner dashboards
4. Creating a review moderation system
5. Implementing recurring bookings
6. Adding payment provider integration

## 🆘 Troubleshooting

**Bookings not saving?**
- Check browser console for API errors
- Verify the backend server is running
- Check network tab for failed requests

**Availability not updating?**
- The availability updates in real-time
- Try refreshing the booking page
- Check the console for API response

**Stats not showing?**
- Visit `/admin/stats` after making at least one booking
- Check that bookings have status 'confirmed'

---

**Everything is set up and ready to use!** 🚀

Your booking data is now persistent and stored in Supabase. Try making a few bookings and see them appear in the stats dashboard!
