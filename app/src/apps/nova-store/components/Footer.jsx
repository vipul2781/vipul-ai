import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const [email, setEmail] = useState('');
  const { addToast } = useToast();
  const { isDark } = useTheme();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      addToast('Thank you for subscribing to our newsletter! 🎉', 'success');
      setEmail('');
    }
  };

  return (
    <footer
      className={`border-top mt-5 ${
        isDark ? 'bg-black text-light border-secondary' : 'bg-light text-dark border-light-subtle'
      }`}
    >
      {/* Newsletter Strip */}
      <div className={`py-4 border-bottom ${isDark ? 'bg-dark bg-opacity-50 border-secondary' : 'bg-primary-subtle'}`}>
        <Container>
          <Row className="align-items-center gy-3">
            <Col lg={6} md={12}>
              <div className="d-flex align-items-center">
                <div className="fs-1 text-primary me-3">
                  <i className="bi bi-envelope-heart"></i>
                </div>
                <div>
                  <h5 className="fw-bold mb-1">Stay in the Loop</h5>
                  <p className="text-muted mb-0 small">
                    Subscribe for exclusive offers, new product drops, and weekly secret discounts!
                  </p>
                </div>
              </div>
            </Col>
            <Col lg={6} md={12}>
              <Form onSubmit={handleSubscribe}>
                <InputGroup>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="rounded-start-pill ps-3"
                  />
                  <Button variant="primary" type="submit" className="rounded-end-pill px-4 fw-semibold">
                    Subscribe
                  </Button>
                </InputGroup>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Main Footer Links */}
      <Container className="py-5">
        <Row className="gy-4">
          {/* Brand Info */}
          <Col lg={4} md={6}>
            <div className="d-flex align-items-center mb-3">
              <span className="bg-primary text-white rounded-3 p-1 px-2 me-2 shadow-sm">
                <i className="bi bi-cart3"></i>
              </span>
              <span className="fw-bold fs-4 text-primary">NOVA</span>
              <span className="fw-bold fs-4 ms-1">STORE</span>
            </div>
            <p className="text-muted small pe-lg-3">
              Your ultimate online shopping destination powered by DummyJSON. Discover top-quality electronics,
              beauty, groceries, fashion, and home lifestyle products at unbeatable prices.
            </p>
            <div className="d-flex gap-3 text-secondary fs-5 mt-3">
              <span className="hover-primary cursor-pointer"><i className="bi bi-facebook"></i></span>
              <span className="hover-primary cursor-pointer"><i className="bi bi-twitter-x"></i></span>
              <span className="hover-primary cursor-pointer"><i className="bi bi-instagram"></i></span>
              <span className="hover-primary cursor-pointer"><i className="bi bi-youtube"></i></span>
              <span className="hover-primary cursor-pointer"><i className="bi bi-github"></i></span>
            </div>
          </Col>

          {/* Quick Links */}
          <Col lg={2} sm={6} xs={6}>
            <h6 className="fw-bold mb-3 text-uppercase small tracking-wider">Quick Navigation</h6>
            <ul className="list-unstyled small d-flex flex-column gap-2 mb-0">
              <li>
                <Link to="/" className="text-decoration-none text-muted hover-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-decoration-none text-muted hover-link">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-decoration-none text-muted hover-link">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-decoration-none text-muted hover-link">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-decoration-none text-muted hover-link">
                  My Wishlist
                </Link>
              </li>
            </ul>
          </Col>

          {/* Top Categories */}
          <Col lg={3} sm={6} xs={6}>
            <h6 className="fw-bold mb-3 text-uppercase small tracking-wider">Popular Categories</h6>
            <ul className="list-unstyled small d-flex flex-column gap-2 mb-0">
              <li>
                <Link to="/products?category=smartphones" className="text-decoration-none text-muted hover-link">
                  Smartphones & Tech
                </Link>
              </li>
              <li>
                <Link to="/products?category=laptops" className="text-decoration-none text-muted hover-link">
                  Laptops & Computers
                </Link>
              </li>
              <li>
                <Link to="/products?category=fragrances" className="text-decoration-none text-muted hover-link">
                  Fragrances & Perfumes
                </Link>
              </li>
              <li>
                <Link to="/products?category=beauty" className="text-decoration-none text-muted hover-link">
                  Beauty & Skincare
                </Link>
              </li>
              <li>
                <Link to="/products?category=groceries" className="text-decoration-none text-muted hover-link">
                  Daily Groceries
                </Link>
              </li>
            </ul>
          </Col>

          {/* Customer Support */}
          <Col lg={3} md={6}>
            <h6 className="fw-bold mb-3 text-uppercase small tracking-wider">Customer Care</h6>
            <ul className="list-unstyled small d-flex flex-column gap-2 mb-3">
              <li className="text-muted d-flex align-items-center">
                <i className="bi bi-geo-alt-fill text-primary me-2"></i> 100 Tech Blvd, Silicon Valley, CA
              </li>
              <li className="text-muted d-flex align-items-center">
                <i className="bi bi-telephone-fill text-primary me-2"></i> +1 (800) 555-0199 (24/7)
              </li>
              <li className="text-muted d-flex align-items-center">
                <i className="bi bi-envelope-fill text-primary me-2"></i> support@novastore.example
              </li>
            </ul>
            <div className="mt-3">
              <span className="small text-muted d-block mb-1">Guaranteed Safe Checkout</span>
              <div className="d-flex gap-2 fs-4 text-muted">
                <i className="bi bi-credit-card-2-front"></i>
                <i className="bi bi-paypal"></i>
                <i className="bi bi-shield-lock-fill text-success"></i>
                <i className="bi bi-wallet2"></i>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Copyright Bottom Bar */}
      <div className={`py-3 text-center border-top ${isDark ? 'border-secondary bg-dark' : 'border-light-subtle bg-white'}`}>
        <Container>
          <p className="text-muted small mb-0">
            © {new Date().getFullYear()} <strong>NOVASTORE</strong>. Built with React JS, React Bootstrap, Axios & DummyJSON API.
          </p>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
