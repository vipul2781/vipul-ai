import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ActionModal from './components/ActionModal';
import ToastContainer from './components/ToastContainer';

// Pages
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import RoomDetails from './pages/RoomDetails';
import Housemates from './pages/Housemates';
import HousemateProfile from './pages/HousemateProfile';
import PostRoom from './pages/PostRoom';
import Favorites from './pages/Favorites';
import About from './pages/About';

import './index.css';
import './App.css';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function RoommateFinderApp() {
  return (
    <AppProvider>
      <div className="d-flex flex-column min-vh-100">
        <ScrollToTop />
        <Navbar />

        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/rooms/:id" element={<RoomDetails />} />
            <Route path="/housemates" element={<Housemates />} />
            <Route path="/housemates/:id" element={<HousemateProfile />} />
            <Route path="/post-room" element={<PostRoom />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
        <ActionModal />
        <ToastContainer />
      </div>
    </AppProvider>
  );
}
