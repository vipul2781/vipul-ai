import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
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

// Dummy Data
import initialFreelancers from './data/freelancers';
import initialProjects from './data/projects';
import initialServices from './data/services';
import categories from './data/categories';
import reviews from './data/reviews';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  // State for Freelancers, Projects, Services
  const [freelancers] = useState(initialFreelancers);

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('skillhub_projects');
    return saved ? JSON.parse(saved) : initialProjects;
  });

  const [services, setServices] = useState(() => {
    const saved = localStorage.getItem('skillhub_services');
    return saved ? JSON.parse(saved) : initialServices;
  });

  // Favorites state persisted in localStorage
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('skillhub_favorites');
    return saved
      ? JSON.parse(saved)
      : { freelancers: [1, 2], services: [1], projects: [1] };
  });

  // Proposals submitted by user
  const [proposals, setProposals] = useState(() => {
    const saved = localStorage.getItem('skillhub_proposals');
    return saved ? JSON.parse(saved) : [];
  });

  // Messages initial conversations
  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      online: true,
      role: "Full Stack Developer",
      messages: [
        { id: 1, sender: "them", text: "Hi! Thanks for checking out my profile. I noticed your project requirement for a React e-commerce platform.", time: "10:30 AM" },
        { id: 2, sender: "me", text: "Hello Rahul! Yes, we need a high-performance web app with Razorpay integration and an admin panel.", time: "10:32 AM" },
        { id: 3, sender: "them", text: "Hi, I can help with your website! I have built several similar stores using React and Node.js. Would you like to review my live demos?", time: "10:35 AM" }
      ]
    },
    {
      id: 2,
      name: "Priya Patel",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      online: false,
      role: "UI/UX Designer",
      messages: [
        { id: 1, sender: "them", text: "Hello! I saw your inquiry regarding the mobile app UI/UX design.", time: "Yesterday" },
        { id: 2, sender: "them", text: "Thanks for contacting me. I've prepared a preliminary moodboard on Figma for your review.", time: "Yesterday" }
      ]
    },
    {
      id: 3,
      name: "Amit Shah",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      online: true,
      role: "Digital Marketing Expert",
      messages: [
        { id: 1, sender: "me", text: "Hi Amit, are you available for SEO audits this month?", time: "Sep 24" },
        { id: 2, sender: "them", text: "I have sent the proposal and keyword roadmap to your dashboard. Let me know if you want any adjustments!", time: "Sep 24" }
      ]
    }
  ]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('skillhub_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('skillhub_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('skillhub_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('skillhub_proposals', JSON.stringify(proposals));
  }, [proposals]);

  // Toggle favorite
  const toggleFavorite = (id, type) => {
    setFavorites((prev) => {
      const list = prev[type === 'freelancer' ? 'freelancers' : type === 'service' ? 'services' : 'projects'] || [];
      const key = type === 'freelancer' ? 'freelancers' : type === 'service' ? 'services' : 'projects';
      const exists = list.includes(id);

      let updatedList;
      if (exists) {
        updatedList = list.filter((item) => item !== id);
        toast.info(`Removed from your saved ${key}!`, { autoClose: 2000 });
      } else {
        updatedList = [...list, id];
        toast.success(`Saved to your favorites!`, { autoClose: 2000 });
      }

      return {
        ...prev,
        [key]: updatedList
      };
    });
  };

  // Add new project
  const handleAddProject = (newProject) => {
    setProjects((prev) => [newProject, ...prev]);
    toast.success("Your project has been posted successfully! Talent can now submit proposals.", {
      autoClose: 3500
    });
  };

  // Add new service
  const handleAddService = (newService) => {
    setServices((prev) => [newService, ...prev]);
    toast.success("Your service has been published successfully! It is now live in the catalog.", {
      autoClose: 3500
    });
  };

  // Submit proposal
  const handleSubmitProposal = (proposalData) => {
    setProposals((prev) => [proposalData, ...prev]);
    toast.success("Your proposal has been submitted successfully!", {
      autoClose: 3000
    });
  };

  // Hire freelancer
  const handleHireSubmit = (hireData) => {
    toast.success(`Hire request sent to ${hireData.freelancerName}! Total: ₹${hireData.total.toLocaleString()}`, {
      autoClose: 3500
    });
  };

  // Order service
  const handleOrderService = (orderData) => {
    toast.success(`Order placed for ${orderData.packageName} package (₹${orderData.price.toLocaleString()})!`, {
      autoClose: 3500
    });
  };

  // Send message hook
  const handleSendMessage = (freelancerId, freelancerName, text) => {
    setConversations((prev) => {
      const existing = prev.find((c) => c.id === freelancerId);
      const newMsg = {
        id: Date.now(),
        sender: "me",
        text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      if (existing) {
        return prev.map((c) => (c.id === freelancerId ? { ...c, messages: [...c.messages, newMsg] } : c));
      } else {
        const newConvo = {
          id: freelancerId || Date.now(),
          name: freelancerName,
          avatar: `https://randomuser.me/api/portraits/lego/${(freelancerId % 8) + 1}.jpg`,
          online: true,
          role: "Professional",
          messages: [newMsg]
        };
        return [newConvo, ...prev];
      }
    });

    toast.success(`Message sent to ${freelancerName}!`, { autoClose: 2000 });
  };

  const totalFavoritesCount = (favorites.freelancers?.length || 0) + (favorites.services?.length || 0);

  return (
    <Router>
      <div className="App d-flex flex-column min-vh-100">
        <ScrollToTop />
        <ToastContainer position="top-right" autoClose={3000} theme="colored" />

        <Navbar favoritesCount={totalFavoritesCount} />

        <main className="flex-grow-1">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  freelancers={freelancers}
                  services={services}
                  categories={categories}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                />
              }
            />
            <Route
              path="/freelancers"
              element={
                <Freelancers
                  freelancers={freelancers}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                />
              }
            />
            <Route
              path="/freelancers/:id"
              element={
                <FreelancerProfile
                  freelancers={freelancers}
                  reviews={reviews}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                  onHireSubmit={handleHireSubmit}
                  onSendMessage={handleSendMessage}
                />
              }
            />
            <Route
              path="/projects"
              element={
                <Projects
                  projects={projects}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                />
              }
            />
            <Route
              path="/projects/:id"
              element={
                <ProjectDetails
                  projects={projects}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                  onSubmitProposal={handleSubmitProposal}
                />
              }
            />
            <Route
              path="/services"
              element={
                <Services
                  services={services}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                />
              }
            />
            <Route
              path="/services/:id"
              element={
                <ServiceDetails
                  services={services}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                  onOrderService={handleOrderService}
                  onSendMessage={handleSendMessage}
                />
              }
            />
            <Route
              path="/post-project"
              element={<PostProject onAddProject={handleAddProject} />}
            />
            <Route
              path="/post-service"
              element={<PostService onAddService={handleAddService} />}
            />
            <Route
              path="/favorites"
              element={
                <Favorites
                  freelancers={freelancers}
                  services={services}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                />
              }
            />
            <Route
              path="/messages"
              element={<Messages initialConversations={conversations} />}
            />
            <Route
              path="/dashboard"
              element={<Dashboard projects={projects} proposals={proposals} />}
            />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
