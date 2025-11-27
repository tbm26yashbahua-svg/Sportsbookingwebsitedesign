import { projectId, publicAnonKey } from './supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-46b7cb79`;

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(`API Error (${endpoint}):`, data);
      return { success: false, error: data.error || 'Unknown error' };
    }

    return { success: true, data };
  } catch (error) {
    console.error(`API Call Failed (${endpoint}):`, error);
    return { success: false, error: error instanceof Error ? error.message : 'Network error' };
  }
}

// ==================== BOOKINGS ====================

export interface CreateBookingData {
  sport: string;
  venueId: string;
  venueName: string;
  date: string;
  timeSlot: string;
  price: number;
  promoCode?: string;
  userId?: string;
}

export interface Booking extends CreateBookingData {
  id: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export async function createBooking(bookingData: CreateBookingData): Promise<ApiResponse<{ booking: Booking }>> {
  return apiCall('/bookings', {
    method: 'POST',
    body: JSON.stringify(bookingData),
  });
}

export async function getBooking(bookingId: string): Promise<ApiResponse<{ booking: Booking }>> {
  return apiCall(`/bookings/${bookingId}`);
}

export async function getUserBookings(userId: string): Promise<ApiResponse<{ bookings: Booking[] }>> {
  return apiCall(`/users/${userId}/bookings`);
}

export async function cancelBooking(bookingId: string): Promise<ApiResponse<{ message: string }>> {
  return apiCall(`/bookings/${bookingId}`, {
    method: 'DELETE',
  });
}

// ==================== REVIEWS ====================

export interface CreateReviewData {
  venueId: string;
  userId?: string;
  userName?: string;
  rating: number;
  comment: string;
}

export interface Review extends CreateReviewData {
  id: string;
  date: string;
  createdAt: string;
}

export async function createReview(reviewData: CreateReviewData): Promise<ApiResponse<{ review: Review }>> {
  return apiCall('/reviews', {
    method: 'POST',
    body: JSON.stringify(reviewData),
  });
}

export async function getVenueReviews(venueId: string): Promise<ApiResponse<{ reviews: Review[] }>> {
  return apiCall(`/venues/${venueId}/reviews`);
}

// ==================== AVAILABILITY ====================

export async function getVenueAvailability(
  venueId: string,
  date: string
): Promise<ApiResponse<{ bookedSlots: string[] }>> {
  return apiCall(`/venues/${venueId}/availability?date=${encodeURIComponent(date)}`);
}

// ==================== STATISTICS ====================

export interface Stats {
  totalBookings: number;
  confirmedBookings: number;
  cancelledBookings: number;
  totalRevenue: number;
}

export async function getStats(): Promise<ApiResponse<{ stats: Stats }>> {
  return apiCall('/stats');
}

// ==================== HEALTH CHECK ====================

export async function checkHealth(): Promise<ApiResponse<{ status: string; timestamp: string }>> {
  return apiCall('/health');
}
