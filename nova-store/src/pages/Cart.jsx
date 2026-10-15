import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup, Modal, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';

const Cart = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    clearCart,
    totalItemsCount,
    subtotal,
    shippingCost,
    couponDiscountAmount,
    grandTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [showClearModal, setShowClearModal] = useState(false);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput.trim());
      setCouponInput('');
    }
  };

  const handleConfirmClear = () => {
    clearCart();
    setShowClearModal(false);
  };

  if (cartItems.length === 0) {
    return (
      <Container className="py-5 text-center">
        <div className="py-5 my-4 bg-body rounded-4 p-5 shadow-sm max-w-600 mx-auto border">
          <div className="display-1 text-primary opacity-50 mb-3">
            <i className="bi bi-cart-x"></i>
          </div>
          <h2 className="fw-bold mb-2">Your Shopping Cart is Empty</h2>
          <p className="text-muted mb-4">
            Looks like you haven't added anything to your cart yet. Explore thousands of deals today!
          </p>
          <Button as={Link} to="/products" variant="primary" size="lg" className="rounded-pill px-5 fw-bold shadow">
            Start Shopping Now <i className="bi bi-arrow-right ms-2"></i>
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      {/* Page Title */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h1 className="fw-bold mb-0">Shopping Cart</h1>
          <p className="text-muted small mb-0">
            You have {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="d-flex gap-2">
          <Button as={Link} to="/products" variant="outline-primary" size="sm" className="rounded-pill">
            <i className="bi bi-arrow-left me-1"></i> Continue Shopping
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            className="rounded-pill"
            onClick={() => setShowClearModal(true)}
          >
            <i className="bi bi-trash me-1"></i> Clear Cart
          </Button>
        </div>
      </div>

      <Row className="g-4">
        {/* Left: Cart Items List */}
        <Col lg={8}>
          <div>
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Quick Info Box */}
          <div className="p-3 bg-body-secondary rounded-4 mt-3 d-flex align-items-center small text-muted">
            <i className="bi bi-info-circle-fill text-primary fs-5 me-2"></i>
            <span>
              Items in your cart are reserved for your checkout session. Prices and availability are verified at checkout.
            </span>
          </div>
        </Col>

        {/* Right: Order Summary */}
        <Col lg={4}>
          <div className="sticky-top" style={{ top: '90px' }}>
            <Card className="border-0 shadow-sm rounded-4 p-4 bg-body mb-3">
              <h5 className="fw-bold mb-3 border-bottom pb-2">Order Summary</h5>

              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Total Items</span>
                <span className="fw-semibold">{totalItemsCount}</span>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Subtotal</span>
                <span className="fw-semibold">${subtotal.toFixed(2)}</span>
              </div>

              {appliedCoupon && (
                <div className="d-flex justify-content-between mb-2 text-success">
                  <span>
                    Discount ({appliedCoupon.code})
                    <Button
                      variant="link"
                      size="sm"
                      onClick={removeCoupon}
                      className="text-danger p-0 ms-1 text-decoration-none"
                      title="Remove promo code"
                    >
                      <i className="bi bi-x-circle"></i>
                    </Button>
                  </span>
                  <span className="fw-semibold">-${couponDiscountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Estimated Shipping</span>
                <span className="fw-semibold">
                  {shippingCost === 0 ? (
                    <Badge bg="success" className="rounded-pill">
                      FREE
                    </Badge>
                  ) : (
                    `$${shippingCost.toFixed(2)}`
                  )}
                </span>
              </div>

              {subtotal < 50 && (
                <div className="alert alert-info py-2 px-3 small rounded-3 mb-3">
                  <i className="bi bi-truck me-1"></i> Add ${(50 - subtotal).toFixed(2)} more to qualify for{' '}
                  <strong>FREE shipping</strong>!
                </div>
              )}

              <div className="border-top pt-3 d-flex justify-content-between align-items-center mb-4">
                <span className="fs-5 fw-bold">Grand Total</span>
                <span className="display-6 fw-bold text-primary">${grandTotal.toFixed(2)}</span>
              </div>

              {/* Promo Code Input */}
              <Form onSubmit={handleApplyCoupon} className="mb-4">
                <Form.Label className="small fw-semibold text-muted">Promo Code</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="e.g. SAVE10"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="rounded-start-pill text-uppercase"
                  />
                  <Button variant="outline-primary" type="submit" className="rounded-end-pill px-3 fw-semibold">
                    Apply
                  </Button>
                </InputGroup>
                <small className="text-muted mt-1 d-block" style={{ fontSize: '0.75rem' }}>
                  Available codes: <strong>SAVE10</strong>, <strong>WELCOME20</strong>, <strong>FREESHIP</strong>
                </small>
              </Form>

              {/* Checkout Button */}
              <Button
                onClick={() => navigate('/checkout')}
                variant="primary"
                size="lg"
                className="w-100 rounded-pill fw-bold py-3 shadow-sm d-flex align-items-center justify-content-center"
              >
                Proceed to Checkout <i className="bi bi-arrow-right ms-2"></i>
              </Button>
            </Card>

            {/* Guarantees */}
            <div className="p-3 bg-body rounded-4 border text-center small text-muted">
              <div className="d-flex justify-content-around">
                <div>
                  <i className="bi bi-shield-lock-fill text-success fs-5 d-block mb-1"></i>
                  <span>256-Bit SSL</span>
                </div>
                <div>
                  <i className="bi bi-arrow-repeat text-primary fs-5 d-block mb-1"></i>
                  <span>30-Day Returns</span>
                </div>
                <div>
                  <i className="bi bi-truck text-warning fs-5 d-block mb-1"></i>
                  <span>Fast Express</span>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* Clear Cart Confirmation Modal */}
      <Modal show={showClearModal} onHide={() => setShowClearModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold text-danger">
            <i className="bi bi-exclamation-triangle-fill me-2"></i> Clear Shopping Cart
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove all {totalItemsCount} items from your shopping cart? This action cannot be
          undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="rounded-pill" onClick={() => setShowClearModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" className="rounded-pill px-4" onClick={handleConfirmClear}>
            Yes, Clear Cart
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Cart;
