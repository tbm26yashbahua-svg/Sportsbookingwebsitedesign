import { useNavigate } from 'react-router-dom';
import { CreditCard, Lock, ChevronLeft, Calendar as CalendarIcon, User } from 'lucide-react';
import { useState } from 'react';
import { BookingData } from '../App';
import { venues } from '../data/sportsData';
import { createBooking } from '../utils/api';

interface PaymentPageProps {
  bookingData: BookingData | null;
  userId?: string;
}

export function PaymentPage({ bookingData, userId }: PaymentPageProps) {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [saveCard, setSaveCard] = useState(false);
  const [processing, setProcessing] = useState(false);

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
  const discount = bookingData.promoCode ? subtotal * 0.1 : 0;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + tax;

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const matches = cleaned.match(/.{1,4}/g);
    return matches ? matches.join(' ') : cleaned;
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\//g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, '');
    if (value.length <= 16 && /^\d*$/.test(value)) {
      setCardNumber(formatCardNumber(value));
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\//g, '');
    if (value.length <= 4 && /^\d*$/.test(value)) {
      setExpiryDate(formatExpiryDate(value));
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 3 && /^\d*$/.test(value)) {
      setCvv(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    try {
      // Create booking in database
      const response = await createBooking({
        sport: bookingData.sport,
        venueId: bookingData.venueId,
        venueName: bookingData.venueName,
        date: bookingData.date,
        timeSlot: bookingData.timeSlot,
        price: total,
        promoCode: bookingData.promoCode,
        userId: userId || 'guest'
      });

      if (response.success) {
        console.log('Booking created successfully:', response.data);
        // Simulate payment processing delay
        setTimeout(() => {
          setProcessing(false);
          navigate('/confirmation');
        }, 1500);
      } else {
        console.error('Failed to create booking:', response.error);
        alert('Failed to create booking. Please try again.');
        setProcessing(false);
      }
    } catch (error) {
      console.error('Error during payment:', error);
      alert('An error occurred. Please try again.');
      setProcessing(false);
    }
  };

  const isFormValid = 
    cardNumber.replace(/\s/g, '').length === 16 &&
    cardName.trim().length > 0 &&
    expiryDate.length === 5 &&
    cvv.length === 3;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/summary')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to summary
          </button>
          <h1 className="text-gray-900 mb-2">Payment</h1>
          <p className="text-gray-600">Complete your booking with secure payment</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <Lock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-gray-900">Secure Payment</h2>
                  <p className="text-sm text-gray-600">Your information is encrypted and secure</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Card Number */}
                <div>
                  <label className="block text-gray-700 mb-2">Card Number</label>
                  <div className="relative">
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                {/* Cardholder Name */}
                <div>
                  <label className="block text-gray-700 mb-2">Cardholder Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                {/* Expiry and CVV */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Expiry Date</label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={expiryDate}
                        onChange={handleExpiryChange}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      value={cvv}
                      onChange={handleCvvChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                {/* Save Card */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="saveCard"
                    checked={saveCard}
                    onChange={(e) => setSaveCard(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="saveCard" className="ml-2 text-gray-700">
                    Save this card for future bookings
                  </label>
                </div>

                {/* Alternative Payment Methods */}
                <div className="pt-6 border-t border-gray-200">
                  <p className="text-gray-700 mb-4">Or pay with</p>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      className="px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-blue-300 transition-colors flex items-center justify-center"
                    >
                      <span className="text-2xl">💳</span>
                    </button>
                    <button
                      type="button"
                      className="px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-blue-300 transition-colors flex items-center justify-center"
                    >
                      <span className="text-2xl">📱</span>
                    </button>
                    <button
                      type="button"
                      className="px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-blue-300 transition-colors flex items-center justify-center"
                    >
                      <span className="text-2xl">💰</span>
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!isFormValid || processing}
                  className={`w-full py-4 rounded-lg transition-colors flex items-center justify-center ${
                    isFormValid && !processing
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {processing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5 mr-2" />
                      Pay ${total.toFixed(2)}
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                  <span>🔒 Secured by SSL</span>
                  <span>•</span>
                  <span>256-bit Encryption</span>
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <h3 className="text-gray-900 mb-4">Order Summary</h3>

              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div>
                  <p className="text-sm text-gray-500">Venue</p>
                  <p className="text-gray-900">{bookingData.venueName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date & Time</p>
                  <p className="text-gray-900">{bookingData.date}</p>
                  <p className="text-gray-700">{bookingData.timeSlot}</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
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
                    <span className="text-gray-900">Total</span>
                    <span className="text-2xl text-blue-600">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  ✓ Free cancellation up to 24 hours before your booking
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}