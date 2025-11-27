import { Search, MapPin, Star, TrendingUp, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { sports, venues } from '../data/sportsData';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/sports');
    }
  };

  const featuredVenues = venues.slice(0, 3);
  const trendingSports = sports.filter(s => s.popularityScore > 90).slice(0, 4);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white py-20 lg:py-32">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-white mb-6">
              Find Your Game.<br />Book Your Slot.
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Discover the best sports venues in your area. From badminton to football, tennis to cricket - book your next game in seconds.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-2xl p-2 flex flex-col sm:flex-row gap-2">
              <div className="flex-1 flex items-center px-4 py-3 bg-gray-50 rounded-xl">
                <Search className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  type="text"
                  placeholder="Search for a sport or venue..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
              >
                Find Your Game Now
              </button>
            </form>

            {/* Quick Categories */}
            <div className="flex flex-wrap gap-3 mt-6">
              {sports.slice(0, 6).map((sport) => (
                <Link
                  key={sport.id}
                  to={`/venues/${sport.id}`}
                  className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
                >
                  <span className="mr-2">{sport.icon}</span>
                  {sport.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trending Sports */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-gray-900 mb-2">Trending Sports</h2>
              <p className="text-gray-600">Most popular sports this week</p>
            </div>
            <Link to="/sports" className="flex items-center text-blue-600 hover:text-blue-700 transition-colors">
              View All
              <ChevronRight className="w-5 h-5 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingSports.map((sport) => (
              <Link
                key={sport.id}
                to={`/venues/${sport.id}`}
                className="group relative overflow-hidden rounded-2xl aspect-[4/5] bg-gray-100"
              >
                <ImageWithFallback
                  src={sport.image}
                  alt={sport.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-3xl">{sport.icon}</span>
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  </div>
                  <h3 className="text-white mb-1">{sport.name}</h3>
                  <p className="text-white/80 text-sm">{sport.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Venues */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-gray-900 mb-2">Featured Venues</h2>
              <p className="text-gray-600">Top-rated sports facilities</p>
            </div>
            <Link to="/sports" className="flex items-center text-blue-600 hover:text-blue-700 transition-colors">
              Explore All
              <ChevronRight className="w-5 h-5 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredVenues.map((venue) => (
              <Link
                key={venue.id}
                to={`/venue/${venue.id}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                  <ImageWithFallback
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                        {venue.name}
                      </h3>
                      <div className="flex items-center text-gray-600 text-sm">
                        <MapPin className="w-4 h-4 mr-1" />
                        {venue.location}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mr-1" />
                      <span className="text-gray-900">{venue.rating}</span>
                      <span className="text-gray-500 text-sm ml-1">({venue.reviews})</span>
                    </div>
                    <div>
                      <span className="text-blue-600">${venue.pricePerHour}</span>
                      <span className="text-gray-500 text-sm">/hour</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{venue.indoor ? 'Indoor' : 'Outdoor'}</span>
                      <span className="text-blue-600 group-hover:translate-x-1 transition-transform inline-flex items-center">
                        View Details
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Book your favorite sports venue in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-gray-900 mb-2">1. Search</h3>
              <p className="text-gray-600">
                Find your favorite sport or browse available venues in your area
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-gray-900 mb-2">2. Choose</h3>
              <p className="text-gray-600">
                Select your preferred venue, date, and time slot
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-gray-900 mb-2">3. Play</h3>
              <p className="text-gray-600">
                Complete your booking and enjoy your game!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white mb-4">Ready to Play?</h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of sports enthusiasts booking their games with SportHub
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/sports"
              className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              Browse Sports
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
