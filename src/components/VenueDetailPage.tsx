import { useParams, useNavigate } from 'react-router-dom';
import { Star, MapPin, Clock, Phone, Mail, Wifi, Car, Droplet, Wind, Shield, Coffee, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { venues, reviews as reviewsData } from '../data/sportsData';
import { BookingData } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getVenueReviews, Review } from '../utils/api';

interface VenueDetailPageProps {
  setBookingData: (data: BookingData | null) => void;
}

export function VenueDetailPage({ setBookingData }: VenueDetailPageProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  const venue = venues.find(v => v.id === id);

  // Fetch reviews from API
  useEffect(() => {
    async function fetchReviews() {
      if (!id) return;
      
      setLoadingReviews(true);
      const response = await getVenueReviews(id);
      
      if (response.success && response.data) {
        setReviews(response.data.reviews);
      } else {
        // Fallback to mock data if API fails
        console.log('Using mock reviews data');
        setReviews(reviewsData[id] || []);
      }
      setLoadingReviews(false);
    }
    
    fetchReviews();
  }, [id]);

  const amenityIcons: { [key: string]: any } = {
    'Parking': Car,
    'WiFi': Wifi,
    'Showers': Droplet,
    'Air Conditioning': Wind,
    'First Aid': Shield,
    'Refreshments': Coffee,
    'Cafe': Coffee
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % venue.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + venue.images.length) % venue.images.length);
  };

  const handleBookSlot = () => {
    setBookingData({
      sport: venue.sport,
      venueId: venue.id,
      venueName: venue.name,
      date: '',
      timeSlot: '',
      price: venue.pricePerHour
    });
    navigate(`/booking/${venue.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Image Gallery */}
      <div className="relative bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="aspect-[21/9] relative overflow-hidden">
            <ImageWithFallback
              src={venue.images[currentImageIndex]}
              alt={`${venue.name} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
            
            {/* Navigation Arrows */}
            {venue.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Image Indicators */}
            {venue.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {venue.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex ? 'bg-white w-8' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-gray-900 mb-3">{venue.name}</h1>
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>{venue.address}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mr-1" />
                      <span className="text-gray-900">{venue.rating}</span>
                      <span className="text-gray-500 ml-1">({venue.reviews} reviews)</span>
                    </div>
                    <span className={`px-4 py-1 rounded-full ${
                      venue.indoor 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {venue.indoor ? '🏢 Indoor' : '🌳 Outdoor'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <div className="flex items-center text-blue-600 mb-1">
                    <span className="text-3xl">${venue.pricePerHour}</span>
                    <span className="text-gray-500 ml-2">/hour</span>
                  </div>
                  {venue.offPeakPrice < venue.pricePerHour && (
                    <p className="text-sm text-gray-500">
                      Off-peak hours: ${venue.offPeakPrice}/hr
                    </p>
                  )}
                </div>
                <button
                  onClick={handleBookSlot}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Book Slot
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-gray-900 mb-4">About This Venue</h2>
              <p className="text-gray-600 leading-relaxed">
                {venue.description}
              </p>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-gray-900 mb-4">Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {venue.amenities.map((amenity, index) => {
                  const Icon = amenityIcons[amenity] || Shield;
                  return (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-gray-900 mb-4">Location</h2>
              <div className="aspect-[16/9] bg-gray-200 rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 mx-auto mb-2 text-blue-600" />
                    <p className="text-gray-700">{venue.address}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {venue.coordinates.lat.toFixed(4)}, {venue.coordinates.lng.toFixed(4)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-gray-900 mb-6">Reviews</h2>
              
              {loadingReviews ? (
                <div className="text-center py-8 text-gray-500">
                  <p>Loading reviews...</p>
                </div>
              ) : venueReviews.length > 0 ? (
                <div className="space-y-6">
                  {venueReviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                            <span className="text-blue-600">
                              {review.userName.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="text-gray-900">{review.userName}</p>
                            <p className="text-sm text-gray-500">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No reviews yet. Be the first to review this venue!</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <h3 className="text-gray-900 mb-4">Quick Booking</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center text-gray-700">
                  <Clock className="w-5 h-5 mr-3 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500">Available Hours</p>
                    <p>6:00 AM - 10:00 PM</p>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-700">
                  <Phone className="w-5 h-5 mr-3 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500">Contact</p>
                    <p>+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-700">
                  <Mail className="w-5 h-5 mr-3 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-sm">{venue.name.toLowerCase().replace(/\s+/g, '')}@sporthub.com</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <h4 className="text-gray-900 mb-2">Peak Hours</h4>
                <p className="text-sm text-gray-600 mb-2">Higher rates apply during:</p>
                <div className="flex flex-wrap gap-2">
                  {venue.peakHours.map((hour, index) => (
                    <span key={index} className="px-3 py-1 bg-white text-gray-700 rounded-lg text-sm">
                      {hour}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={handleBookSlot}
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Book Now
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