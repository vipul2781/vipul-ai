import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Navbar,
  Nav,
  Container,
  Form,
  InputGroup,
  Button,
  Badge,
  Dropdown,
  Modal,
} from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useTheme } from '../context/ThemeContext';

const AppNavbar = () => {
  const navigate = useNavigate();
  const { totalItemsCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { isDark, toggleTheme } = useTheme();

  const [searchTerm, setSearchTerm] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  const handleMockLogin = (e) => {
    e.preventDefault();
    if (userEmail.trim()) {
      setIsLoggedIn(true);
      setShowLoginModal(false);
    }
  };

  return (
    <>
      {/* Top micro announcement bar */}
      <div className="bg-primary bg-gradient text-white py-1 px-3 text-center small fw-medium">
        <span>
          <i className="bi bi-tag-fill me-1"></i> Mega Spring Sale: Get up to 50% OFF! Use code{' '}
          <strong className="badge bg-warning text-dark px-2 py-1">SAVE10</strong> or{' '}
          <strong className="badge bg-warning text-dark px-2 py-1">WELCOME20</strong>
        </span>
      </div>

      <Navbar
        expand="lg"
        sticky="top"
        className={`shadow-sm py-2 ${
          isDark ? 'navbar-dark bg-dark border-bottom border-secondary' : 'navbar-light bg-white'
        }`}
      >
        <Container>
          {/* Brand Logo */}
          <Navbar.Brand as={Link} to="/" className="fw-bold fs-4 d-flex align-items-center text-decoration-none">
            <span className="brand-icon-box bg-primary text-white rounded-3 p-1 px-2 me-2 shadow-sm">
              <i className="bi bi-cart3"></i>
            </span>
            <span className="text-primary">NOVA</span>
            <span className={isDark ? 'text-light' : 'text-dark'}>STORE</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            {/* Center Navigation Links */}
            <Nav className="me-auto mb-2 mb-lg-0 fw-semibold">
              <Nav.Link as={NavLink} to="/" end>
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/products">
                Products
              </Nav.Link>
              <Nav.Link as={NavLink} to="/categories">
                Categories
              </Nav.Link>
              <Nav.Link as={NavLink} to="/wishlist">
                Wishlist
                {wishlistCount > 0 && (
                  <Badge bg="danger" pill className="ms-1 px-2 py-1 small">
                    {wishlistCount}
                  </Badge>
                )}
              </Nav.Link>
            </Nav>

            {/* Quick Search Bar */}
            <Form onSubmit={handleSearchSubmit} className="d-flex my-2 my-lg-0 me-lg-3 flex-grow-1" style={{ maxWidth: '360px' }}>
              <InputGroup>
                <Form.Control
                  type="search"
                  placeholder="Search 100+ products..."
                  aria-label="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="rounded-start-pill border-end-0 ps-3"
                />
                <Button variant="outline-primary" type="submit" className="rounded-end-pill px-3">
                  <i className="bi bi-search"></i>
                </Button>
              </InputGroup>
            </Form>

            {/* Right Action Icons & Buttons */}
            <div className="d-flex align-items-center gap-2 mt-2 mt-lg-0">
              {/* Theme Toggle Button */}
              <Button
                variant={isDark ? 'outline-light' : 'outline-secondary'}
                size="sm"
                className="rounded-circle p-2 d-flex align-items-center justify-content-center"
                style={{ width: '38px', height: '38px' }}
                onClick={toggleTheme}
                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                <i className={`bi ${isDark ? 'bi-sun-fill text-warning' : 'bi-moon-stars-fill'}`}></i>
              </Button>

              {/* Wishlist Icon with count */}
              <Button
                as={Link}
                to="/wishlist"
                variant={isDark ? 'outline-light' : 'outline-secondary'}
                size="sm"
                className="position-relative rounded-pill px-3 py-2 d-flex align-items-center text-decoration-none"
              >
                <i className="bi bi-heart-fill text-danger me-1"></i>
                <span className="d-none d-md-inline small fw-semibold">Wishlist</span>
                {wishlistCount > 0 && (
                  <Badge bg="danger" pill className="ms-1">
                    {wishlistCount}
                  </Badge>
                )}
              </Button>

              {/* Cart Button with Counter */}
              <Button
                as={Link}
                to="/cart"
                variant="primary"
                size="sm"
                className="position-relative rounded-pill px-3 py-2 d-flex align-items-center shadow-sm text-decoration-none"
              >
                <i className="bi bi-cart-fill me-1"></i>
                <span className="fw-semibold">Cart</span>
                <Badge bg="light" text="dark" pill className="ms-2 fw-bold">
                  {totalItemsCount}
                </Badge>
              </Button>

              {/* User Account / Profile */}
              {isLoggedIn ? (
                <Dropdown align="end">
                  <Dropdown.Toggle
                    variant="outline-primary"
                    size="sm"
                    className="rounded-pill px-3 py-2 d-flex align-items-center"
                    id="user-dropdown"
                  >
                    <i className="bi bi-person-circle me-1"></i>
                    <span className="small fw-semibold">{userEmail.split('@')[0] || 'User'}</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="shadow border-0 mt-2">
                    <Dropdown.Item as={Link} to="/cart">
                      <i className="bi bi-box-seam me-2"></i> My Orders
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/wishlist">
                      <i className="bi bi-heart me-2"></i> Saved Items
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={() => setIsLoggedIn(false)} className="text-danger">
                      <i className="bi bi-box-arrow-right me-2"></i> Sign Out
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="rounded-pill px-3 py-2"
                  onClick={() => setShowLoginModal(true)}
                >
                  <i className="bi bi-person me-1"></i>
                  <span className="fw-semibold">Sign In</span>
                </Button>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Quick Login Modal */}
      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">
            <i className="bi bi-person-badge text-primary me-2"></i>
            Welcome to NOVASTORE
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <p className="text-muted small mb-4">
            Sign in to track orders, save your favorites, and enjoy instant checkout.
          </p>
          <Form onSubmit={handleMockLogin}>
            <Form.Group className="mb-3">
              <Form.Label className="small fw-semibold">Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                required
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="small fw-semibold">Password</Form.Label>
              <Form.Control type="password" placeholder="••••••••" required defaultValue="password123" />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 py-2 fw-semibold rounded-pill mt-2">
              Sign In
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AppNavbar;
