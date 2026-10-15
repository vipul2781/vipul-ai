import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container className="py-5 text-center">
      <div className="py-5 my-5 max-w-500 mx-auto">
        <h1 className="display-1 fw-bold text-primary mb-2">404</h1>
        <h3 className="fw-bold mb-3">Oops! Page Not Found</h3>
        <p className="text-muted mb-4">
          The page you are looking for might have been moved, removed, or is temporarily unavailable.
        </p>
        <div className="d-flex justify-content-center gap-3">
          <Button as={Link} to="/" variant="primary" size="lg" className="rounded-pill px-4 fw-semibold shadow">
            Back to Home
          </Button>
          <Button as={Link} to="/products" variant="outline-secondary" size="lg" className="rounded-pill px-4 fw-semibold">
            Browse Products
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default NotFound;
