import { useEffect, useState } from 'react';
import { getStats, getUserBookings, Booking, Stats } from '../utils/api';
import { TrendingUp, Calendar, DollarSign, XCircle, CheckCircle } from 'lucide-react';

interface AdminStatsProps {
  userId?: string;
}

export function AdminStats({ userId }: AdminStatsProps) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      
      // Fetch stats
      const statsResponse = await getStats();
      if (statsResponse.success && statsResponse.data) {
        setStats(statsResponse.data.stats);
      }

      // Fetch user bookings
      if (userId) {
        const bookingsResponse = await getUserBookings(userId);
        if (bookingsResponse.success && bookingsResponse.data) {
          setRecentBookings(bookingsResponse.data.bookings);
        }
      } else {
        // Fetch guest bookings if no user logged in
        const bookingsResponse = await getUserBookings('guest');
        if (bookingsResponse.success && bookingsResponse.data) {
          setRecentBookings(bookingsResponse.data.bookings);
        }
      }

      setLoading(false);
    }

    fetchData();
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading statistics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">Booking Statistics</h1>
          <p className="text-gray-600">Overview of all bookings and revenue</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Total Bookings</p>
            <p className="text-3xl text-gray-900">{stats?.totalBookings || 0}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Confirmed</p>
            <p className="text-3xl text-gray-900">{stats?.confirmedBookings || 0}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Cancelled</p>
            <p className="text-3xl text-gray-900">{stats?.cancelledBookings || 0}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
            <p className="text-3xl text-gray-900">${stats?.totalRevenue.toFixed(2) || '0.00'}</p>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-gray-900 mb-6">Recent Bookings</h2>
          
          {recentBookings.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-700">Booking ID</th>
                    <th className="text-left py-3 px-4 text-gray-700">Venue</th>
                    <th className="text-left py-3 px-4 text-gray-700">Date</th>
                    <th className="text-left py-3 px-4 text-gray-700">Time</th>
                    <th className="text-left py-3 px-4 text-gray-700">Price</th>
                    <th className="text-left py-3 px-4 text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking) => (
                    <tr key={booking.id} className="border-b border-gray-100 last:border-0">
                      <td className="py-4 px-4 text-gray-900 font-mono text-sm">
                        {booking.id.split('_')[1]}
                      </td>
                      <td className="py-4 px-4 text-gray-900">{booking.venueName}</td>
                      <td className="py-4 px-4 text-gray-700">{booking.date}</td>
                      <td className="py-4 px-4 text-gray-700">{booking.timeSlot}</td>
                      <td className="py-4 px-4 text-gray-900">${booking.price.toFixed(2)}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          booking.status === 'confirmed'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p>No bookings found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}