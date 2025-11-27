import { useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, MapPin, Clock, Download, Mail, Home } from 'lucide-react';
import { useEffect } from 'react';
import { BookingData } from '../App';
import { venues } from '../data/sportsData';

interface ConfirmationPageProps {
  bookingData: BookingData | null;
}

export function ConfirmationPage({ bookingData }: ConfirmationPageProps) {
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  if (!bookingData) {
    navigate('/sports');
    return null;
  }

  const venue = venues.find(v => v.id === bookingData.venueId);
  
  if (!venue) {
    navigate('/sports');
    return null;
  }

  const bookingId = `BK${Date.now().toString().slice(-8)}`;
  const subtotal = bookingData.price;
  const discount = bookingData.promoCode ? subtotal * 0.1 : 0;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + tax;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-gray-900 mb-2">Booking Confirmed!</h1>
          <p className="text-xl text-gray-600">
            Your booking has been successfully confirmed
          </p>
        </div>

        {/* Booking ID */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 mb-6 text-white text-center">
          <p className="text-white/80 mb-2">Booking Reference</p>
          <p className="text-3xl tracking-wider">{bookingId}</p>
        </div>

        {/* Booking Details */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <h2 className="text-gray-900 mb-6">Booking Details</h2>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Venue</p>
                <p className="text-gray-900 mb-1">{bookingData.venueName}</p>
                <p className="text-sm text-gray-600">{venue.address}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Date</p>
                <p className="text-gray-900">{bookingData.date}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Time Slot</p>
                <p className="text-gray-900">{bookingData.timeSlot}</p>
                <p className="text-sm text-gray-600">Duration: 1 hour</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <h2 className="text-gray-900 mb-4">Payment Summary</h2>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-900">${subtotal.toFixed(2)}</span>
            </div>

            {bookingData.promoCode && (
              <div className="flex items-center justify-between text-green-600">
                <span>Discount ({bookingData.promoCode})</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <span className="text-gray-600">Tax</span>
              <span className="text-gray-900">${tax.toFixed(2)}</span>
            </div>

            <div className="pt-3 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-gray-900">Total Paid</span>
                <span className="text-2xl text-green-600">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              ✓ Payment successful
              <br />
              💳 Charged to card ending in ****3456
            </p>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <h2 className="text-gray-900 mb-4">What's Next?</h2>

          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                <span className="text-blue-600">1</span>
              </div>
              <div>
                <p className="text-gray-900 mb-1">Check Your Email</p>
                <p className="text-sm text-gray-600">
                  We've sent a confirmation email with your booking details and QR code
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                <span className="text-blue-600">2</span>
              </div>
              <div>
                <p className="text-gray-900 mb-1">Arrive on Time</p>
                <p className="text-sm text-gray-600">
                  Please arrive 5-10 minutes before your scheduled time
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                <span className="text-blue-600">3</span>
              </div>
              <div>
                <p className="text-gray-900 mb-1">Show Your Booking</p>
                <p className="text-sm text-gray-600">
                  Present your booking ID or email confirmation at the venue
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <button className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-5 h-5 mr-2" />
            Download Receipt
          </button>
          <button className="flex items-center justify-center px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Mail className="w-5 h-5 mr-2" />
            Email Receipt
          </button>
        </div>

        {/* Navigation */}
        <div className="text-center space-y-4">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </button>
          
          <div className="flex items-center justify-center space-x-4 text-sm">
            <button
              onClick={() => navigate('/sports')}
              className="text-blue-600 hover:underline"
            >
              Book Another Venue
            </button>
            <span className="text-gray-400">•</span>
            <button className="text-blue-600 hover:underline">
              View My Bookings
            </button>
          </div>
        </div>

        {/* Support */}
        <div className="mt-8 p-6 bg-blue-50 rounded-2xl text-center">
          <p className="text-gray-700 mb-2">Need help with your booking?</p>
          <p className="text-sm text-gray-600 mb-4">
            Our support team is available 24/7
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm">
            <a href="tel:+15551234567" className="text-blue-600 hover:underline">
              📞 Call Us
            </a>
            <a href="mailto:support@sporthub.com" className="text-blue-600 hover:underline">
              ✉️ Email Us
            </a>
            <button className="text-blue-600 hover:underline">
              💬 Live Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
