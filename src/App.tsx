import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { SportSelectionPage } from './components/SportSelectionPage';
import { VenueListingPage } from './components/VenueListingPage';
import { VenueDetailPage } from './components/VenueDetailPage';
import { BookingPage } from './components/BookingPage';
import { BookingSummaryPage } from './components/BookingSummaryPage';
import { PaymentPage } from './components/PaymentPage';
import { ConfirmationPage } from './components/ConfirmationPage';
import { AdminStats } from './components/AdminStats';
import { AuthModal } from './components/AuthModal';
import { useState, useEffect } from 'react';
import { User, getCurrentUser, onAuthStateChange } from './utils/auth';

export interface BookingData {
  sport: string;
  venueId: string;
  venueName: string;
  date: string;
  timeSlot: string;
  price: number;
  promoCode?: string;
}

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  // Initialize auth state
  useEffect(() => {
    async function initAuth() {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setLoadingAuth(false);
    }

    initAuth();

    // Listen to auth changes
    const { data: { subscription } } = onAuthStateChange((user) => {
      setUser(user);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleAuthSuccess = () => {
    // Refresh user data
    getCurrentUser().then(setUser);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header 
          user={user}
          onAuthClick={() => setShowAuthModal(true)} 
        />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sports" element={<SportSelectionPage />} />
            <Route path="/venues/:sport" element={<VenueListingPage />} />
            <Route path="/venue/:id" element={<VenueDetailPage setBookingData={setBookingData} />} />
            <Route path="/booking/:id" element={<BookingPage bookingData={bookingData} setBookingData={setBookingData} userId={user?.id} />} />
            <Route path="/summary" element={<BookingSummaryPage bookingData={bookingData} setBookingData={setBookingData} />} />
            <Route path="/payment" element={<PaymentPage bookingData={bookingData} userId={user?.id} />} />
            <Route path="/confirmation" element={<ConfirmationPage bookingData={bookingData} />} />
            <Route path="/admin/stats" element={<AdminStats userId={user?.id} />} />
          </Routes>
        </main>
        <Footer />
        
        <AuthModal 
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onSuccess={handleAuthSuccess}
        />
      </div>
    </Router>
  );
}

export default App;