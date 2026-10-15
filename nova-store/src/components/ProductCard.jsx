import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  if (!product) return null;

  const {
    id,
    title,
    price,
    discountPercentage = 0,
    rating = 0,
    category,
    thumbnail,
    images,
    stock = 0,
    brand,
  } = product;

  const isFavorited = isInWishlist(id);
  const imageUrl = thumbnail || (images && images[0]) || 'https://via.placeholder.com/300x300?text=No+Image';

  // Calculate original price before discount
  const originalPrice = discountPercentage > 0 ? (price / (1 - discountPercentage / 100)).toFixed(2) : null;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const isLowStock = stock > 0 && stock <= 10;
  const isOutOfStock = stock <= 0;

  return (
    <Card className="product-card h-100 border-0 shadow-sm rounded-4 overflow-hidden position-relative transition-all">
      {/* Top Badges */}
      <div className="position-absolute top-0 start-0 p-2 d-flex flex-column gap-1" style={{ zIndex: 2 }}>
        {discountPercentage > 0 && (
          <Badge bg="danger" className="rounded-pill px-2 py-1 shadow-sm">
            -{Math.round(discountPercentage)}%
          </Badge>
        )}
        {isOutOfStock ? (
          <Badge bg="secondary" className="rounded-pill px-2 py-1 shadow-sm">
            Out of Stock
          </Badge>
        ) : isLowStock ? (
          <Badge bg="warning" text="dark" className="rounded-pill px-2 py-1 shadow-sm">
            Only {stock} left
          </Badge>
        ) : null}
      </div>

      {/* Wishlist Button */}
      <Button
        variant="light"
        size="sm"
        onClick={handleToggleWishlist}
        className="position-absolute top-0 end-0 m-2 rounded-circle p-2 shadow-sm border-0 d-flex align-items-center justify-content-center"
        style={{ width: '36px', height: '36px', zIndex: 3 }}
        title={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <i className={`bi ${isFavorited ? 'bi-heart-fill text-danger' : 'bi-heart text-secondary'}`}></i>
      </Button>

      {/* Image Container with Link */}
      <div
        className="product-img-wrapper overflow-hidden bg-light d-flex align-items-center justify-content-center cursor-pointer"
        style={{ height: '220px' }}
        onClick={() => navigate(`/products/${id}`)}
      >
        <img
          src={imageUrl}
          alt={title}
          className="product-card-img w-100 h-100 object-fit-contain p-3 transition-transform"
          loading="lazy"
        />
      </div>

      {/* Card Body */}
      <Card.Body className="d-flex flex-column p-3">
        {/* Category & Brand */}
        <div className="d-flex justify-content-between align-items-center mb-1">
          <span className="badge bg-primary-subtle text-primary text-uppercase px-2 py-1 small rounded-pill fw-medium">
            {category}
          </span>
          {brand && (
            <small className="text-muted text-truncate ms-2" style={{ maxWidth: '100px' }}>
              {brand}
            </small>
          )}
        </div>

        {/* Title */}
        <Card.Title
          as={Link}
          to={`/products/${id}`}
          className="text-decoration-none text-reset fw-bold fs-6 mt-1 mb-2 text-truncate-2 product-title-link"
          style={{ minHeight: '2.5rem' }}
          title={title}
        >
          {title}
        </Card.Title>

        {/* Rating Stars */}
        <div className="d-flex align-items-center mb-2">
          <div className="text-warning me-1 small">
            {[1, 2, 3, 4, 5].map((star) => (
              <i
                key={star}
                className={`bi ${
                  rating >= star
                    ? 'bi-star-fill'
                    : rating >= star - 0.5
                    ? 'bi-star-half'
                    : 'bi-star'
                }`}
              ></i>
            ))}
          </div>
          <span className="small fw-semibold text-muted">({Number(rating).toFixed(1)})</span>
        </div>

        {/* Price & Discount */}
        <div className="mt-auto pt-2 border-top">
          <div className="d-flex align-items-baseline gap-2 mb-2">
            <span className="fs-5 fw-bold text-primary">${Number(price).toFixed(2)}</span>
            {originalPrice && (
              <span className="text-muted text-decoration-line-through small">
                ${originalPrice}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="d-flex gap-2">
            <Button
              as={Link}
              to={`/products/${id}`}
              variant="outline-secondary"
              size="sm"
              className="flex-grow-1 rounded-pill fw-semibold py-1"
            >
              Details
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="flex-grow-1 rounded-pill fw-semibold py-1 d-flex align-items-center justify-content-center"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
            >
              <i className="bi bi-cart-plus me-1"></i>
              Add
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
