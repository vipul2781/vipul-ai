import React from 'react';
import { Spinner, Container } from 'react-bootstrap';

const Loading = ({ message = 'Loading amazing products...', fullPage = false }) => {
  return (
    <Container
      className={`d-flex flex-column align-items-center justify-content-center text-center ${
        fullPage ? 'py-5 my-5 min-vh-50' : 'py-5 my-4'
      }`}
    >
      <div className="position-relative mb-3">
        <Spinner
          animation="border"
          variant="primary"
          style={{ width: '3.5rem', height: '3.5rem', borderWidth: '0.25rem' }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <div
          className="position-absolute top-50 start-50 translate-middle"
          style={{ width: '1.5rem', height: '1.5rem' }}
        >
          <i className="bi bi-bag-check-fill text-primary" style={{ fontSize: '1.2rem' }}></i>
        </div>
      </div>
      <h6 className="fw-semibold text-secondary mb-1">{message}</h6>
      <small className="text-muted">Fetching live data from DummyJSON...</small>
    </Container>
  );
};

export default Loading;
