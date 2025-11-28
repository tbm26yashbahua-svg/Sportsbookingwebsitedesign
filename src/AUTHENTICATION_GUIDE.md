# Authentication & Booking Guide

## 🔐 Authentication System

Your SportHub platform now has a complete authentication system powered by Supabase Auth.

### Features:
- **Email/Password Authentication**
- **User Session Management**
- **Password Reset**
- **User Profile**
- **Persistent Sessions** (survives page refreshes)

---

## 🚀 Quick Start Testing Guide

### 1. **Sign Up (Create New Account)**

**Steps:**
1. Click **"Sign Up"** button in the header
2. Fill in the form:
   - Full Name: `John Doe`
   - Email: `john@example.com` (use a real email to test verification)
   - Password: `password123` (minimum 6 characters)
   - Confirm Password: `password123`
3. Click **"Create Account"**
4. Wait for success message
5. Check your email for verification link (Supabase sends this automatically)

**What Happens:**
- User account is created in Supabase with auto-confirmed email
- Profile is stored with name and email
- You're automatically logged in
- No email verification needed!

---

### 2. **Login (Existing Users)**

**Steps:**
1. Click **"Login"** button in the header
2. Enter your credentials:
   - Email: `john@example.com`
   - Password: `password123`
3. Optional: Check "Remember me"
4. Click **"Sign In"**

**What Happens:**
- Session is created and stored
- User profile loads
- Header shows your avatar and name
- You can access "My Bookings"

---

### 3. **Reset Password**

**Steps:**
1. Click **"Login"** button
2. Click **"Forgot password?"**
3. Enter your email address
4. Click **"Send Reset Link"**
5. Check your email for the reset link

**What Happens:**
- Password reset email is sent
- Click the link to reset your password
- You'll be redirected to reset form

---

### 4. **Logout**

**Steps:**
1. Click your **avatar/name** in the header
2. Click **"Logout"**

**What Happens:**
- Session is cleared
- You're redirected to home page
- Header shows Login/Signup buttons again

---

## 📅 Complete Booking Flow (Authenticated User)

### Test the Full Journey:

1. **Browse Sports**
   - Go to "Sports" in navigation
   - Click on "Badminton" (or any sport)

2. **Select Venue**
   - Choose "Elite Sports Arena"
   - View venue details, photos, amenities
   - Click "Book Slot"

3. **Choose Date & Time**
   - Select a date from calendar (future dates only)
   - Pick an available time slot
   - Notice peak hour pricing
   - See booked slots marked as unavailable
   - Click "Continue to Summary"

4. **Review Booking**
   - Verify all details
   - Apply promo code: `SAVE10` (10% discount)
   - Review pricing breakdown
   - Click "Proceed to Payment"

5. **Payment**
   - Enter card details:
     - Card: `1234 5678 9012 3456`
     - Name: `John Doe`
     - Expiry: `12/25`
     - CVV: `123`
   - Click "Pay $XX.XX"
   - Wait for processing

6. **Confirmation**
   - View booking confirmation
   - Note your booking ID
   - Download receipt
   - Click "View My Bookings"

7. **My Bookings**
   - Visit `/admin/stats`
   - See your booking in the list
   - View total revenue
   - Check booking statistics

---

## 🎯 Testing Availability System

### Test Real-Time Availability:

1. **Make First Booking:**
   - Go to "Elite Sports Arena"
   - Select tomorrow's date
   - Book "6:00 PM" slot
   - Complete payment

2. **Try Second Booking:**
   - Go back to same venue
   - Select same date (tomorrow)
   - Notice "6:00 PM" now shows as "Booked"
   - You cannot select that slot anymore
   - Choose different time slot

3. **Different Date:**
   - Select a different date
   - All slots available again (not booked)

**This proves:**
- Bookings are stored in Supabase
- Availability updates in real-time
- No double-booking possible

---

## 👤 User Account Features

### When Logged In, You Can:

1. **View Profile**
   - Click your avatar in header
   - See your name and email

2. **Access My Bookings**
   - Click "My Bookings" from user menu
   - View all your bookings only
   - See booking status (confirmed/cancelled)

3. **Manage Bookings**
   - View booking history
   - See total spend
   - Check upcoming bookings

---

## 🔧 Testing Different User Scenarios

### Scenario 1: Guest User (Not Logged In)
- Can browse sports and venues ✓
- Can view venue details ✓
- Can make bookings ✓
- Bookings saved as "guest" ✓
- Cannot see personalized "My Bookings" ✗

### Scenario 2: Registered User
- All guest features ✓
- Bookings linked to account ✓
- Can view booking history ✓
- Can manage profile ✓
- Bookings persist across sessions ✓

---

## 📊 Admin Dashboard

Visit `/admin/stats` to see:

- **Total Bookings**: Count of all bookings
- **Confirmed Bookings**: Active bookings
- **Cancelled Bookings**: Cancelled count
- **Total Revenue**: Sum of all confirmed bookings
- **Recent Bookings Table**: List with details

**Note:** Shows your bookings when logged in, or all guest bookings when not logged in.

---

## 🎉 Promo Codes

Test these working promo codes:

- `SAVE10` - 10% off
- `FIRST10` - 10% off
- `WELCOME10` - 10% off

**Apply at:** Booking Summary page

---

## 🔐 Security Features

✅ **Password Hashing**: Supabase handles secure password storage
✅ **JWT Tokens**: Session management via JWT
✅ **Auto-Confirmed Emails**: No verification needed for instant access
✅ **Secure Sessions**: Encrypted session storage
✅ **Auth Guards**: Protected routes for authenticated users

---

## 🐛 Common Issues & Solutions

### "Account created but auto-login failed"
- Your account was successfully created
- Simply click "Login" and sign in manually
- This is a rare edge case

### "Invalid credentials"
- Check email spelling
- Verify password (case-sensitive)
- Try password reset

### "Booking not saving"
- Check browser console for errors
- Verify backend server is running
- Check network tab for API calls

### "Availability not updating"
- Refresh the booking page
- Clear browser cache
- Check console for API errors

---

## 🎓 Technical Details

### Data Flow:

1. **Sign Up**: 
   ```
   Frontend → Supabase Auth → User Created → Profile Stored
   ```

2. **Login**: 
   ```
   Frontend → Supabase Auth → Session Created → JWT Token
   ```

3. **Booking**: 
   ```
   Frontend → API → KV Store → Booking Saved → User Association
   ```

4. **Availability Check**: 
   ```
   Frontend → API → Query Bookings → Filter by Date/Venue → Return Slots
   ```

### Database Structure:

```typescript
// Bookings
"booking:{id}" → {
  id, sport, venueId, venueName, 
  date, timeSlot, price, 
  userId, status, createdAt, updatedAt
}

// User Bookings Index
"user_bookings:{userId}" → [booking_ids]

// Reviews
"review:{id}" → {
  id, venueId, userId, userName, 
  rating, comment, date
}
```

---

## ✨ Next Steps

Want to extend the platform? Consider:

1. **Email Notifications**: Send booking confirmations
2. **Social Login**: Google, GitHub, Facebook auth
3. **Recurring Bookings**: Weekly/monthly slots
4. **Venue Owner Dashboard**: Manage your venues
5. **Payment Integration**: Real payment processing
6. **Booking Modifications**: Edit existing bookings
7. **Review System**: Rate venues after booking
8. **Loyalty Program**: Points and rewards

---

**Everything is set up and working!** 🎉

Try creating an account, making a booking, and viewing your dashboard. All data persists in Supabase and survives page refreshes!
