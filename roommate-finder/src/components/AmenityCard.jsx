import React from 'react';

const amenityIcons = {
  'Wi-Fi': 'bi-wifi',
  'AC': 'bi-snow',
  'Parking': 'bi-p-circle',
  'Washing Machine': 'bi-inbox',
  'Kitchen': 'bi-cup-hot',
  'Balcony': 'bi-sun',
  'Security': 'bi-shield-check',
  'TV': 'bi-tv'
};

const AmenityCard = ({ amenity }) => {
  const iconClass = amenityIcons[amenity] || 'bi-check-circle';

  return (
    <div className="col-lg-3 col-md-4 col-6">
      <div className="amenity-card-item">
        <i className={`bi ${iconClass}`}></i>
        <span className="fw-semibold small text-dark">{amenity}</span>
      </div>
    </div>
  );
};

export default AmenityCard;
