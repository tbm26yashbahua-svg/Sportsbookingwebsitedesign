import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Filter, DollarSign, Clock, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { sports, venues } from '../data/sportsData';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function VenueListingPage() {
  const { sport } = useParams<{ sport: string }>();
  const [priceRange, setPriceRange] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [venueType, setVenueType] = useState<'all' | 'indoor' | 'outdoor'>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'price'>('rating');
  const [showFilters, setShowFilters] = useState(false);

  const currentSport = sports.find(s => s.id === sport);
  const filteredVenues = venues
    .filter(v => v.sport === sport)
    .filter(v => {
      if (venueType === 'all') return true;
      return venueType === 'indoor' ? v.indoor : !v.indoor;
    })
    .filter(v => {
      if (priceRange === 'all') return true;
      if (priceRange === 'low') return v.pricePerHour < 30;
      if (priceRange === 'medium') return v.pricePerHour >= 30 && v.pricePerHour < 60;
      return v.pricePerHour >= 60;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      return a.pricePerHour - b.pricePerHour;
    });

  if (!currentSport) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-gray-900 mb-4">Sport not found</h2>
          <Link to="/sports" className="text-blue-600 hover:underline">
            Browse all sports
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-4">
            <span className="text-6xl mr-4">{currentSport.icon}</span>
            <div>
              <h1 className="text-white mb-2">{currentSport.name} Venues</h1>
              <p className="text-xl text-white/90">{currentSport.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-gray-900">Filters</h3>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden text-blue-600"
                >
                  <Filter className="w-5 h-5" />
                </button>
              </div>

              <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Price Range */}
                <div>
                  <label className="block text-gray-700 mb-3">Price Range</label>
                  <div className="space-y-2">
                    {[
                      { value: 'all', label: 'All Prices' },
                      { value: 'low', label: 'Under $30/hr' },
                      { value: 'medium', label: '$30 - $60/hr' },
                      { value: 'high', label: 'Above $60/hr' }
                    ].map(option => (
                      <label key={option.value} className="flex items-center">
                        <input
                          type="radio"
                          name="price"
                          value={option.value}
                          checked={priceRange === option.value}
                          onChange={(e) => setPriceRange(e.target.value as any)}
                          className="mr-2 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Venue Type */}
                <div>
                  <label className="block text-gray-700 mb-3">Venue Type</label>
                  <div className="space-y-2">
                    {[
                      { value: 'all', label: 'All Types' },
                      { value: 'indoor', label: 'Indoor' },
                      { value: 'outdoor', label: 'Outdoor' }
                    ].map(option => (
                      <label key={option.value} className="flex items-center">
                        <input
                          type="radio"
                          name="type"
                          value={option.value}
                          checked={venueType === option.value}
                          onChange={(e) => setVenueType(e.target.value as any)}
                          className="mr-2 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-gray-700 mb-3">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="rating">Highest Rated</option>
                    <option value="price">Lowest Price</option>
                  </select>
                </div>

                <button
                  onClick={() => {
                    setPriceRange('all');
                    setVenueType('all');
                    setSortBy('rating');
                  }}
                  className="w-full py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>

          {/* Venue List */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600">
                {filteredVenues.length} {filteredVenues.length === 1 ? 'venue' : 'venues'} available
              </p>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center text-blue-600"
              >
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </button>
            </div>

            <div className="space-y-6">
              {filteredVenues.map((venue) => (
                <Link
                  key={venue.id}
                  to={`/venue/${venue.id}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row"
                >
                  <div className="sm:w-80 aspect-[16/10] sm:aspect-auto overflow-hidden bg-gray-100 flex-shrink-0">
                    <ImageWithFallback
                      src={venue.image}
                      alt={venue.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {venue.name}
                        </h3>
                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="text-sm">{venue.location}</span>
                        </div>
                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center">
                            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mr-1" />
                            <span className="text-gray-900">{venue.rating}</span>
                            <span className="text-gray-500 text-sm ml-1">({venue.reviews} reviews)</span>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            venue.indoor 
                              ? 'bg-blue-100 text-blue-700' 
                              : 'bg-green-100 text-green-700'
                          }`}>
                            {venue.indoor ? 'Indoor' : 'Outdoor'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {venue.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {venue.amenities.slice(0, 4).map((amenity, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">
                          {amenity}
                        </span>
                      ))}
                      {venue.amenities.length > 4 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">
                          +{venue.amenities.length - 4} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="flex items-center text-blue-600">
                            <DollarSign className="w-5 h-5" />
                            <span className="text-2xl">{venue.pricePerHour}</span>
                            <span className="text-gray-500 text-sm ml-1">/hour</span>
                          </div>
                          {venue.offPeakPrice < venue.pricePerHour && (
                            <p className="text-sm text-gray-500">
                              Off-peak: ${venue.offPeakPrice}/hr
                            </p>
                          )}
                        </div>
                        <div className="flex items-center text-green-600 text-sm">
                          <Clock className="w-4 h-4 mr-1" />
                          Available Today
                        </div>
                      </div>
                      <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                        View Details
                        <ChevronRight className="w-5 h-5 ml-1" />
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredVenues.length === 0 && (
              <div className="text-center py-12 bg-white rounded-2xl">
                <div className="text-gray-400 text-6xl mb-4">🏟️</div>
                <h3 className="text-gray-900 mb-2">No venues found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters to see more options
                </p>
                <button
                  onClick={() => {
                    setPriceRange('all');
                    setVenueType('all');
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
