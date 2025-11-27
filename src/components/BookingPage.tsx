import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { venues } from '../data/sportsData';
import { BookingData } from '../App';
import { getVenueAvailability } from '../utils/api';

interface BookingPageProps {
  bookingData: BookingData | null;
  setBookingData: (data: BookingData | null) => void;
  userId?: string;
}

export function BookingPage({ bookingData, setBookingData, userId }: BookingPageProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const venue = venues.find(v => v.id === id);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loadingAvailability, setLoadingAvailability] = useState(false);

  // Fetch availability when date changes
  useEffect(() => {
    async function fetchAvailability() {
      if (!selectedDate || !id) return;
      
      setLoadingAvailability(true);
      const dateString = selectedDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      
      const response = await getVenueAvailability(id, dateString);
      
      if (response.success && response.data) {
        setBookedSlots(response.data.bookedSlots);
      } else {
        console.error('Failed to fetch availability:', response.error);
        setBookedSlots([]);
      }
      setLoadingAvailability(false);
    }
    
    fetchAvailability();
  }, [selectedDate, id]);

  if (!venue) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-gray-900 mb-4">Venue not found</h2>
          <button onClick={() => navigate('/sports')} className="text-blue-600 hover:underline">
            Browse all sports
          </button>
        </div>
      </div>
    );
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleDateClick = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (date >= today) {
      setSelectedDate(date);
      setSelectedTimeSlot(null);
    }
  };

  const handleContinue = () => {
    if (selectedDate && selectedTimeSlot) {
      const isPeakHour = venue.peakHours.includes(selectedTimeSlot);
      const price = isPeakHour ? venue.pricePerHour : venue.offPeakPrice;
      
      setBookingData({
        sport: venue.sport,
        venueId: venue.id,
        venueName: venue.name,
        date: formatDate(selectedDate),
        timeSlot: selectedTimeSlot,
        price: price
      });
      navigate('/summary');
    }
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(`/venue/${venue.id}`)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to venue
          </button>
          <h1 className="text-gray-900 mb-2">Book Your Slot</h1>
          <p className="text-gray-600">{venue.name}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-gray-900">Select Date</h2>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={prevMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="text-gray-900 min-w-[200px] text-center">
                    {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </span>
                  <button
                    onClick={nextMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2">
                {/* Day headers */}
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-gray-500 text-sm py-2">
                    {day}
                  </div>
                ))}

                {/* Empty cells for days before month starts */}
                {[...Array(startingDayOfWeek)].map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}

                {/* Days of the month */}
                {[...Array(daysInMonth)].map((_, i) => {
                  const day = i + 1;
                  const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                  const isPast = date < today;
                  const isSelected = selectedDate?.getDate() === day && 
                                   selectedDate?.getMonth() === currentMonth.getMonth() &&
                                   selectedDate?.getFullYear() === currentMonth.getFullYear();

                  return (
                    <button
                      key={day}
                      onClick={() => handleDateClick(day)}
                      disabled={isPast}
                      className={`aspect-square rounded-lg flex items-center justify-center transition-colors ${
                        isPast
                          ? 'text-gray-300 cursor-not-allowed'
                          : isSelected
                          ? 'bg-blue-600 text-white'
                          : 'hover:bg-blue-50 text-gray-900'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Slots */}
            {selectedDate && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h2 className="text-gray-900 mb-4">Select Time Slot</h2>
                <p className="text-gray-600 mb-4">
                  {formatDate(selectedDate)}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {venue.availability.map((timeSlot) => {
                    const isPeak = venue.peakHours.includes(timeSlot);
                    const isSelected = selectedTimeSlot === timeSlot;
                    const isBooked = bookedSlots.includes(timeSlot);

                    return (
                      <button
                        key={timeSlot}
                        onClick={() => !isBooked && setSelectedTimeSlot(timeSlot)}
                        disabled={isBooked}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          isBooked
                            ? 'border-gray-200 bg-gray-100 cursor-not-allowed opacity-50'
                            : isSelected
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <Clock className="w-4 h-4 text-gray-500" />
                          {isPeak && !isBooked && (
                            <span className="text-xs text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                              Peak
                            </span>
                          )}
                          {isBooked && (
                            <span className="text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded">
                              Booked
                            </span>
                          )}
                        </div>
                        <p className={`${isBooked ? 'text-gray-400' : 'text-gray-900'}`}>{timeSlot}</p>
                        {!isBooked && (
                          <p className="text-sm text-gray-600">
                            ${isPeak ? venue.pricePerHour : venue.offPeakPrice}/hr
                          </p>
                        )}
                      </button>
                    );
                  })}
                </div>
                
                {loadingAvailability && (
                  <div className="text-center py-4">
                    <div className="inline-block w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm text-gray-600 mt-2">Checking availability...</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <h3 className="text-gray-900 mb-4">Booking Summary</h3>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Venue</p>
                  <p className="text-gray-900">{venue.name}</p>
                </div>

                {selectedDate && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Date</p>
                    <p className="text-gray-900">
                      {selectedDate.toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                )}

                {selectedTimeSlot && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Time</p>
                    <p className="text-gray-900">{selectedTimeSlot}</p>
                  </div>
                )}

                {selectedTimeSlot && (
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">Duration</span>
                      <span className="text-gray-900">1 hour</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Price</span>
                      <span className="text-2xl text-blue-600">
                        ${venue.peakHours.includes(selectedTimeSlot) 
                          ? venue.pricePerHour 
                          : venue.offPeakPrice}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={handleContinue}
                disabled={!selectedDate || !selectedTimeSlot}
                className={`w-full py-3 rounded-lg transition-colors ${
                  selectedDate && selectedTimeSlot
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Continue to Summary
              </button>

              <p className="text-sm text-gray-500 text-center mt-4">
                Free cancellation up to 24 hours before
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}