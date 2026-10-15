import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Handle scroll event for floating button
  useEffect(() => {
    const toggleVisible = () => {
      const scrolled = document.documentElement.scrollTop;
      if (scrolled > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!visible) return null;

  return (
    <Button
      variant="primary"
      onClick={scrollToTop}
      className="position-fixed rounded-circle shadow-lg d-flex align-items-center justify-content-center"
      style={{
        bottom: '24px',
        right: '24px',
        width: '46px',
        height: '46px',
        zIndex: 1040,
        transition: 'all 0.3s ease',
      }}
      title="Scroll to top"
      aria-label="Scroll to top"
    >
      <i className="bi bi-chevron-up fs-5"></i>
    </Button>
  );
};

export default ScrollToTop;
