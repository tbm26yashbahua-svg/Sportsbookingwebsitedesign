import { useNavigate } from 'react-router-dom';
import { ChevronLeft, MapPin, Calendar, Clock, DollarSign, Tag } from 'lucide-react';
import { useState } from 'react';
import { BookingData } from '../App';
import { venues } from '../data/sportsData';

interface BookingSummaryPageProps {
  bookingData: BookingData | null;
  setBookingData: (data: BookingData | null) => void;
}

export function BookingSummaryPage({ bookingData, setBookingData }: BookingSummaryPageProps) {
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState('');

  if (!bookingData) {
    navigate('/sports');
    return null;
  }

  const venue = venues.find(v => v.id === bookingData.venueId);
  
  if (!venue) {
    navigate('/sports');
    return null;
  }

  const subtotal = bookingData.price;
  const discount = appliedPromo ? subtotal * 0.1 : 0;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + tax;

  const handleApplyPromo = () => {
    const validCodes = ['SAVE10', 'FIRST10', 'WELCOME10'];
    
    if (validCodes.includes(promoCode.toUpperCase())) {
      setAppliedPromo(promoCode.toUpperCase());
      setPromoError('');
      setBookingData({ ...bookingData, promoCode: promoCode.toUpperCase() });
    } else {
      setPromoError('Invalid promo code');
      setAppliedPromo(null);
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoCode('');
    setPromoError('');
    if (bookingData.promoCode) {
      const { promoCode, ...rest } = bookingData;
      setBookingData(rest as BookingData);
    }
  };

  const handleProceedToPayment = () => {
    navigate('/payment');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(`/booking/${bookingData.venueId}`)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to booking
          </button>
          <h1 className="text-gray-900 mb-2">Review Your Booking</h1>
          <p className="text-gray-600">Please review the details before proceeding to payment</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Venue Information */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-gray-900 mb-4">Booking Details</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Venue</p>
                    <p className="text-gray-900">{bookingData.venueName}</p>
                    <p className="text-sm text-gray-600">{venue.address}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <Calendar className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="text-gray-900">{bookingData.date}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <Clock className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Time Slot</p>
                    <p className="text-gray-900">{bookingData.timeSlot}</p>
                    <p className="text-sm text-gray-600">Duration: 1 hour</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <DollarSign className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Rate</p>
                    <p className="text-gray-900">${bookingData.price} per hour</p>
                    {venue.peakHours.includes(bookingData.timeSlot) && (
                      <p className="text-sm text-orange-600">Peak hour rate</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Promo Code */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-gray-900 mb-4">Promo Code</h2>
              
              {!appliedPromo ? (
                <div className="flex gap-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => {
                        setPromoCode(e.target.value.toUpperCase());
                        setPromoError('');
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {promoError && (
                      <p className="text-sm text-red-600 mt-2">{promoError}</p>
                    )}
                  </div>
                  <button
                    onClick={handleApplyPromo}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Apply
                  </button>
                </div>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <Tag className="w-5 h-5 text-green-600 mr-3" />
                    <div>
                      <p className="text-green-900">{appliedPromo}</p>
                      <p className="text-sm text-green-700">10% discount applied</p>
                    </div>
                  </div>
                  <button
                    onClick={handleRemovePromo}
                    className="text-sm text-green-700 hover:text-green-900"
                  >
                    Remove
                  </button>
                </div>
              )}
              
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-900">
                  💡 Try codes: <span className="font-mono">SAVE10</span>, <span className="font-mono">FIRST10</span>, or <span className="font-mono">WELCOME10</span>
                </p>
              </div>
            </div>

            {/* Cancellation Policy */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-gray-900 mb-4">Cancellation Policy</h2>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Free cancellation up to 24 hours before your booking</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">⚠</span>
                  <span>50% refund for cancellations within 12-24 hours</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✕</span>
                  <span>No refund for cancellations less than 12 hours before</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Price Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <h3 className="text-gray-900 mb-4">Price Summary</h3>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">${subtotal.toFixed(2)}</span>
                </div>

                {appliedPromo && (
                  <div className="flex items-center justify-between text-green-600">
                    <span>Discount (10%)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Tax (8%)</span>
                  <span className="text-gray-900">${tax.toFixed(2)}</span>
                </div>

                <div className="pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900">Total</span>
                    <span className="text-2xl text-blue-600">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleProceedToPayment}
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mb-4"
              >
                Proceed to Payment
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-500">
                  By proceeding, you agree to our
                  <br />
                  <a href="#" className="text-blue-600 hover:underline">Terms & Conditions</a>
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-2">🔒 Secure Payment</p>
                <p className="text-xs text-gray-500">
                  Your payment information is encrypted and secure
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
