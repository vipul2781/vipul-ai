import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlistItems.length === 0) {
    return (
      <Container className="py-5 text-center">
        <div className="py-5 my-4 bg-body rounded-4 p-5 shadow-sm max-w-600 mx-auto border">
          <div className="display-1 text-danger opacity-50 mb-3">
            <i className="bi bi-heart"></i>
          </div>
          <h2 className="fw-bold mb-2">Your Wishlist is Empty</h2>
          <p className="text-muted mb-4">
            You haven't saved any items yet. Heart your favorite products while browsing to keep track of them!
          </p>
          <Button as={Link} to="/products" variant="primary" size="lg" className="rounded-pill px-5 fw-bold shadow">
            Explore Products
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      {/* Title */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h1 className="fw-bold mb-0">My Wishlist</h1>
          <p className="text-muted small mb-0">
            You have saved {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}
          </p>
        </div>

        <div className="d-flex gap-2">
          <Button as={Link} to="/products" variant="outline-primary" size="sm" className="rounded-pill">
            <i className="bi bi-arrow-left me-1"></i> Continue Browsing
          </Button>
          <Button variant="outline-danger" size="sm" className="rounded-pill" onClick={clearWishlist}>
            <i className="bi bi-trash me-1"></i> Clear Wishlist
          </Button>
        </div>
      </div>

      <Row className="g-4">
        {wishlistItems.map((item) => (
          <Col key={item.id} xs={12} sm={6} md={4} lg={3}>
            <Card className="h-100 border-0 shadow-sm rounded-4 overflow-hidden position-relative">
              {/* Remove button */}
              <Button
                variant="light"
                size="sm"
                onClick={() => removeFromWishlist(item.id)}
                className="position-absolute top-0 end-0 m-2 rounded-circle shadow-sm border-0"
                style={{ width: '34px', height: '34px', zIndex: 2 }}
                title="Remove from wishlist"
              >
                <i className="bi bi-x-lg text-danger"></i>
              </Button>

              <div
                className="bg-light d-flex align-items-center justify-content-center p-3"
                style={{ height: '200px' }}
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-100 h-100 object-fit-contain"
                />
              </div>

              <Card.Body className="d-flex flex-column p-3">
                <span className="badge bg-primary-subtle text-primary text-uppercase align-self-start px-2 py-1 small rounded-pill mb-2">
                  {item.category}
                </span>

                <Card.Title
                  as={Link}
                  to={`/products/${item.id}`}
                  className="text-decoration-none text-reset fw-bold fs-6 mb-2 text-truncate-2"
                  style={{ minHeight: '2.5rem' }}
                >
                  {item.title}
                </Card.Title>

                <div className="d-flex align-items-baseline gap-2 mb-3 mt-auto">
                  <span className="fs-5 fw-bold text-primary">${Number(item.price).toFixed(2)}</span>
                  {item.discountPercentage > 0 && (
                    <Badge bg="danger" className="rounded-pill">
                      -{Math.round(item.discountPercentage)}%
                    </Badge>
                  )}
                </div>

                <div className="d-flex gap-2">
                  <Button
                    as={Link}
                    to={`/products/${item.id}`}
                    variant="outline-secondary"
                    size="sm"
                    className="flex-grow-1 rounded-pill"
                  >
                    View
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex-grow-1 rounded-pill d-flex align-items-center justify-content-center"
                    onClick={() => {
                      addToCart(item, 1);
                      removeFromWishlist(item.id);
                    }}
                  >
                    <i className="bi bi-cart-plus me-1"></i> Move to Cart
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Wishlist;
