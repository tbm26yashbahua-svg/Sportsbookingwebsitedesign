import { Link } from 'react-router-dom';
import { Search, Filter, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { sports } from '../data/sportsData';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function SportSelectionPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'popularity'>('popularity');

  const filteredSports = sports
    .filter(sport => 
      sport.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'popularity') {
        return b.popularityScore - a.popularityScore;
      }
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-white mb-4">Choose Your Sport</h1>
          <p className="text-xl text-white/90">
            Select from our wide range of sports and find the perfect venue
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            {/* Search */}
            <div className="flex-1 w-full relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search sports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'popularity')}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="popularity">Most Popular</option>
                <option value="name">Alphabetical</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Sports Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredSports.length} {filteredSports.length === 1 ? 'sport' : 'sports'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSports.map((sport) => (
            <Link
              key={sport.id}
              to={`/venues/${sport.id}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative">
                <ImageWithFallback
                  src={sport.image}
                  alt={sport.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Popularity Badge */}
                {sport.popularityScore > 90 && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full flex items-center text-sm">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    Trending
                  </div>
                )}

                {/* Sport Icon */}
                <div className="absolute bottom-4 left-4">
                  <div className="text-5xl mb-2">{sport.icon}</div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {sport.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {sport.description}
                </p>

                {/* Popularity Score */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2 mr-3" style={{ width: '100px' }}>
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${sport.popularityScore}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">{sport.popularityScore}%</span>
                  </div>
                </div>

                <button className="mt-4 w-full py-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  View Venues
                </button>
              </div>
            </Link>
          ))}
        </div>

        {filteredSports.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-gray-900 mb-2">No sports found</h3>
            <p className="text-gray-600">
              Try adjusting your search to find what you're looking for
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
