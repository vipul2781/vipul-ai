import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Communities from './pages/Communities';
import CommunityDetails from './pages/CommunityDetails';
import PostDetails from './pages/PostDetails';
import CreatePost from './pages/CreatePost';
import CreateCommunity from './pages/CreateCommunity';
import Search from './pages/Search';
import Saved from './pages/Saved';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import Moderation from './pages/Moderation';
import About from './pages/About';
import { ForumProvider, useForum } from './context/ForumContext';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function ToastNotification() {
  const { toastMessage } = useForum();
  if (!toastMessage) return null;
  const bgClass =
    toastMessage.type === 'danger'  ? 'bg-danger text-white' :
    toastMessage.type === 'warning' ? 'bg-warning text-dark' :
    toastMessage.type === 'info'    ? 'bg-info text-white'   :
                                      'bg-dark text-white';
  return (
    <div className="custom-toast-container">
      <div className={`toast show align-items-center ${bgClass} border-0 shadow-lg rounded-4 p-2`} role="alert" aria-live="assertive" aria-atomic="true">
        <div className="d-flex align-items-center">
          <div className="toast-body d-flex align-items-center gap-2 py-2 px-3 fw-semibold small">
            {toastMessage.type === 'success' && <i className="bi bi-check-circle-fill fs-5 text-success"></i>}
            {toastMessage.type === 'info'    && <i className="bi bi-info-circle-fill fs-5 text-info"></i>}
            {toastMessage.type === 'warning' && <i className="bi bi-exclamation-triangle-fill fs-5 text-dark"></i>}
            {toastMessage.type === 'danger'  && <i className="bi bi-x-circle-fill fs-5 text-warning"></i>}
            <span>{toastMessage.message}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DiscussHubApp() {
  return (
    <ForumProvider>
      <ScrollToTop />
      <div className="d-flex flex-column min-vh-100 bg-light">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/"                   element={<Home />} />
            <Route path="/communities"        element={<Communities />} />
            <Route path="/communities/:id"    element={<CommunityDetails />} />
            <Route path="/posts/:id"          element={<PostDetails />} />
            <Route path="/create-post"        element={<CreatePost />} />
            <Route path="/create-community"   element={<CreateCommunity />} />
            <Route path="/search"             element={<Search />} />
            <Route path="/saved"              element={<Saved />} />
            <Route path="/notifications"      element={<Notifications />} />
            <Route path="/profile/:id"        element={<Profile />} />
            <Route path="/moderation"         element={<Moderation />} />
            <Route path="/about"              element={<About />} />
            <Route path="*"                   element={<Home />} />
          </Routes>
        </main>
        <Footer />
        <ToastNotification />
      </div>
    </ForumProvider>
  );
}
