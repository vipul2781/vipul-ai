import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Freelancers from './pages/Freelancers';
import FreelancerProfile from './pages/FreelancerProfile';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import Services from './pages/Services';
import ServiceDetails from './pages/ServiceDetails';
import PostProject from './pages/PostProject';
import PostService from './pages/PostService';
import Favorites from './pages/Favorites';
import Messages from './pages/Messages';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import initialFreelancers from './data/freelancers';
import initialProjects from './data/projects';
import initialServices from './data/services';
import categories from './data/categories';
import reviews from './data/reviews';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function SkillHubApp() {
  const [freelancers] = useState(initialFreelancers);

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('skillhub_projects');
    return saved ? JSON.parse(saved) : initialProjects;
  });

  const [services, setServices] = useState(() => {
    const saved = localStorage.getItem('skillhub_services');
    return saved ? JSON.parse(saved) : initialServices;
  });

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('skillhub_favorites');
    return saved ? JSON.parse(saved) : { freelancers: [1, 2], services: [1], projects: [1] };
  });

  const [proposals, setProposals] = useState(() => {
    const saved = localStorage.getItem('skillhub_proposals');
    return saved ? JSON.parse(saved) : [];
  });

  const [conversations, setConversations] = useState([
    { id: 1, name: 'Rahul Sharma', avatar: 'https://randomuser.me/api/portraits/men/1.jpg', online: true, role: 'Full Stack Developer', messages: [{ id: 1, sender: 'them', text: 'Hi! Thanks for checking out my profile.', time: '10:30 AM' }] },
    { id: 2, name: 'Priya Patel',  avatar: 'https://randomuser.me/api/portraits/women/2.jpg', online: false, role: 'UI/UX Designer', messages: [{ id: 1, sender: 'them', text: 'Hello! I saw your inquiry.', time: 'Yesterday' }] },
    { id: 3, name: 'Amit Shah',    avatar: 'https://randomuser.me/api/portraits/men/3.jpg', online: true, role: 'Digital Marketing Expert', messages: [{ id: 1, sender: 'me', text: 'Hi Amit, are you available for SEO audits?', time: 'Sep 24' }] },
  ]);

  useEffect(() => { localStorage.setItem('skillhub_favorites', JSON.stringify(favorites)); }, [favorites]);
  useEffect(() => { localStorage.setItem('skillhub_projects',  JSON.stringify(projects));  }, [projects]);
  useEffect(() => { localStorage.setItem('skillhub_services',  JSON.stringify(services));  }, [services]);
  useEffect(() => { localStorage.setItem('skillhub_proposals', JSON.stringify(proposals)); }, [proposals]);

  const toggleFavorite = (id, type) => {
    setFavorites(prev => {
      const key = type === 'freelancer' ? 'freelancers' : type === 'service' ? 'services' : 'projects';
      const list = prev[key] || [];
      const exists = list.includes(id);
      const updatedList = exists ? list.filter(item => item !== id) : [...list, id];
      if (exists) toast.info(`Removed from saved ${key}!`, { autoClose: 2000 });
      else        toast.success('Saved to favorites!',      { autoClose: 2000 });
      return { ...prev, [key]: updatedList };
    });
  };

  const handleAddProject  = (p) => { setProjects(prev => [p, ...prev]); toast.success('Project posted successfully!', { autoClose: 3500 }); };
  const handleAddService  = (s) => { setServices(prev => [s, ...prev]); toast.success('Service published successfully!', { autoClose: 3500 }); };
  const handleSubmitProposal = (d) => { setProposals(prev => [d, ...prev]); toast.success('Proposal submitted!', { autoClose: 3000 }); };
  const handleHireSubmit  = (d) => toast.success(`Hire request sent to ${d.freelancerName}!`, { autoClose: 3500 });
  const handleOrderService = (d) => toast.success(`Order placed for ${d.packageName}!`, { autoClose: 3500 });

  const handleSendMessage = (freelancerId, freelancerName, text) => {
    setConversations(prev => {
      const existing = prev.find(c => c.id === freelancerId);
      const newMsg = { id: Date.now(), sender: 'me', text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      if (existing) return prev.map(c => c.id === freelancerId ? { ...c, messages: [...c.messages, newMsg] } : c);
      return [{ id: freelancerId || Date.now(), name: freelancerName, avatar: `https://randomuser.me/api/portraits/lego/${(freelancerId % 8) + 1}.jpg`, online: true, role: 'Professional', messages: [newMsg] }, ...prev];
    });
    toast.success(`Message sent to ${freelancerName}!`, { autoClose: 2000 });
  };

  const totalFavoritesCount = (favorites.freelancers?.length || 0) + (favorites.services?.length || 0);

  return (
    <div className="App d-flex flex-column min-vh-100">
      <ScrollToTop />
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <Navbar favoritesCount={totalFavoritesCount} />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home freelancers={freelancers} services={services} categories={categories} favorites={favorites} toggleFavorite={toggleFavorite} />} />
          <Route path="/freelancers" element={<Freelancers freelancers={freelancers} favorites={favorites} toggleFavorite={toggleFavorite} />} />
          <Route path="/freelancers/:id" element={<FreelancerProfile freelancers={freelancers} reviews={reviews} favorites={favorites} toggleFavorite={toggleFavorite} onHireSubmit={handleHireSubmit} onSendMessage={handleSendMessage} />} />
          <Route path="/projects" element={<Projects projects={projects} favorites={favorites} toggleFavorite={toggleFavorite} />} />
          <Route path="/projects/:id" element={<ProjectDetails projects={projects} favorites={favorites} toggleFavorite={toggleFavorite} onSubmitProposal={handleSubmitProposal} />} />
          <Route path="/services" element={<Services services={services} favorites={favorites} toggleFavorite={toggleFavorite} />} />
          <Route path="/services/:id" element={<ServiceDetails services={services} favorites={favorites} toggleFavorite={toggleFavorite} onOrderService={handleOrderService} onSendMessage={handleSendMessage} />} />
          <Route path="/post-project" element={<PostProject onAddProject={handleAddProject} />} />
          <Route path="/post-service" element={<PostService onAddService={handleAddService} />} />
          <Route path="/favorites" element={<Favorites freelancers={freelancers} services={services} favorites={favorites} toggleFavorite={toggleFavorite} />} />
          <Route path="/messages" element={<Messages initialConversations={conversations} />} />
          <Route path="/dashboard" element={<Dashboard projects={projects} proposals={proposals} />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
