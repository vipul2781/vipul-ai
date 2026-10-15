import React from 'react';

const LoadingSpinner = ({ text = 'Loading listings...' }) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5 my-5">
      <div className="spinner-border text-primary-custom" role="status" style={{ width: '3rem', height: '3rem' }}>
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-3 text-secondary fw-medium">{text}</p>
    </div>
  );
};

export default LoadingSpinner;
