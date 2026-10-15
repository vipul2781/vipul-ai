import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Badge, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const LAST_ORDER_KEY = 'nova_last_order';

const Checkout = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const {
    cartItems,
    clearCart,
    subtotal,
    shippingCost,
    couponDiscountAmount,
    grandTotal,
    appliedCoupon,
    totalItemsCount,
  } = useCart();

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'card', // 'card' | 'cod' | 'upi'
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

  const [validated, setValidated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (cartItems.length === 0) {
      setErrorMessage('Your cart is empty. Please add items before checking out.');
      return;
    }

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);
    setIsSubmitting(true);
    setErrorMessage('');

    // Simulate payment processing & order creation
    setTimeout(() => {
      const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
      const orderDetails = {
        orderId,
        date: new Date().toISOString(),
        items: [...cartItems],
        totalItemsCount,
        subtotal,
        discount: couponDiscountAmount,
        couponCode: appliedCoupon?.code || null,
        shipping: shippingCost,
        totalAmount: grandTotal,
        customer: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          paymentMethod: formData.paymentMethod,
        },
      };

      try {
        localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(orderDetails));
      } catch (err) {
        console.error(err);
      }

      // Clear the shopping cart
      clearCart();
      setIsSubmitting(false);
      addToast('Order placed successfully! 🎉', 'success');

      // Navigate to order success page
      navigate('/order-success');
    }, 1200);
  };

  if (cartItems.length === 0) {
    return (
      <Container className="py-5 text-center">
        <div className="py-5 my-4 bg-body rounded-4 p-5 shadow-sm max-w-600 mx-auto border">
          <i className="bi bi-bag-x display-1 text-muted mb-3 d-block"></i>
          <h3 className="fw-bold">No Items to Checkout</h3>
          <p className="text-muted mb-4">Please add products to your cart before proceeding to checkout.</p>
          <Button as={Link} to="/products" variant="primary" className="rounded-pill px-4">
            Browse Products
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      {/* Title */}
      <div className="mb-4">
        <h1 className="fw-bold mb-1">Checkout & Payment</h1>
        <p className="text-muted small mb-0">Please fill in your shipping and payment information to complete the order.</p>
      </div>

      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      <Form noValidate validated={validated} onSubmit={handlePlaceOrder}>
        <Row className="g-4">
          {/* Left: Shipping & Payment Form */}
          <Col lg={7}>
            {/* 1. Contact & Shipping Information */}
            <Card className="border-0 shadow-sm rounded-4 p-4 bg-body mb-4">
              <h5 className="fw-bold mb-3 d-flex align-items-center">
                <i className="bi bi-geo-alt-fill text-primary me-2"></i> Shipping Address
              </h5>

              <Row className="g-3">
                <Col md={12}>
                  <Form.Group controlId="fullName">
                    <Form.Label className="small fw-semibold">Full Name *</Form.Label>
                    <Form.Control
                      type="text"
                      name="fullName"
                      placeholder="e.g. John Doe"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">Please enter your full name.</Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group controlId="email">
                    <Form.Label className="small fw-semibold">Email Address *</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">Please enter a valid email.</Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group controlId="phone">
                    <Form.Label className="small fw-semibold">Phone Number *</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      placeholder="+1 (555) 000-0000"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">Please enter your phone number.</Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={12}>
                  <Form.Group controlId="address">
                    <Form.Label className="small fw-semibold">Street Address *</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      placeholder="Apartment, suite, unit, building, floor, etc."
                      required
                      value={formData.address}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">Please enter your street address.</Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={5}>
                  <Form.Group controlId="city">
                    <Form.Label className="small fw-semibold">City *</Form.Label>
                    <Form.Control
                      type="text"
                      name="city"
                      placeholder="New York"
                      required
                      value={formData.city}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">Please provide a valid city.</Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group controlId="state">
                    <Form.Label className="small fw-semibold">State / Province *</Form.Label>
                    <Form.Control
                      type="text"
                      name="state"
                      placeholder="NY"
                      required
                      value={formData.state}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">Please provide a state.</Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={3}>
                  <Form.Group controlId="pincode">
                    <Form.Label className="small fw-semibold">Pincode / ZIP *</Form.Label>
                    <Form.Control
                      type="text"
                      name="pincode"
                      placeholder="10001"
                      required
                      value={formData.pincode}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">Please provide a pincode.</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
            </Card>

            {/* 2. Payment Method */}
            <Card className="border-0 shadow-sm rounded-4 p-4 bg-body">
              <h5 className="fw-bold mb-3 d-flex align-items-center">
                <i className="bi bi-credit-card-2-front-fill text-primary me-2"></i> Payment Method
              </h5>

              <div className="d-flex flex-column gap-2 mb-3">
                <Form.Check
                  type="radio"
                  id="payCard"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === 'card'}
                  onChange={handleChange}
                  label={
                    <span className="fw-semibold">
                      Credit / Debit Card{' '}
                      <small className="text-muted">(Visa, MasterCard, Amex)</small>
                    </span>
                  }
                  className="p-3 border rounded-3 bg-body-tertiary"
                />

                <Form.Check
                  type="radio"
                  id="payUpi"
                  name="paymentMethod"
                  value="upi"
                  checked={formData.paymentMethod === 'upi'}
                  onChange={handleChange}
                  label={
                    <span className="fw-semibold">
                      Instant UPI / Net Banking <small className="text-muted">(Google Pay, Apple Pay, PhonePe)</small>
                    </span>
                  }
                  className="p-3 border rounded-3 bg-body-tertiary"
                />

                <Form.Check
                  type="radio"
                  id="payCod"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={handleChange}
                  label={
                    <span className="fw-semibold">
                      Cash on Delivery (COD) <small className="text-muted">(Pay upon parcel delivery)</small>
                    </span>
                  }
                  className="p-3 border rounded-3 bg-body-tertiary"
                />
              </div>

              {/* Conditional Card inputs */}
              {formData.paymentMethod === 'card' && (
                <div className="p-3 border rounded-3 bg-body-secondary mt-2">
                  <Row className="g-3">
                    <Col md={12}>
                      <Form.Group controlId="cardNumber">
                        <Form.Label className="small fw-semibold">Card Number</Form.Label>
                        <Form.Control
                          type="text"
                          name="cardNumber"
                          placeholder="4532 •••• •••• 8892"
                          required={formData.paymentMethod === 'card'}
                          defaultValue="4532 8920 1823 9921"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="cardExpiry">
                        <Form.Label className="small fw-semibold">Expiry Date</Form.Label>
                        <Form.Control
                          type="text"
                          name="cardExpiry"
                          placeholder="MM/YY"
                          required={formData.paymentMethod === 'card'}
                          defaultValue="12/28"
                        />
                      </Form.Group>
                    </Col>
                  <Col md={6}>
                    <Form.Group controlId="cardCvc">
                      <Form.Label className="small fw-semibold">CVV / CVC</Form.Label>
                      <Form.Control
                        type="password"
                        name="cardCvc"
                        placeholder="•••"
                        maxLength={4}
                        required={formData.paymentMethod === 'card'}
                        defaultValue="789"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                </div>
              )}
          </Card>
        </Col>

        {/* Right: Order Summary */}
        <Col lg={5}>
          <div className="sticky-top" style={{ top: '90px' }}>
            <Card className="border-0 shadow-sm rounded-4 p-4 bg-body mb-3">
              <h5 className="fw-bold mb-3 border-bottom pb-2">Order Review ({totalItemsCount} items)</h5>

              {/* Items preview list */}
              <div className="d-flex flex-column gap-2 mb-3 max-vh-30 overflow-y-auto pe-1">
                {cartItems.map((item) => (
                  <div key={item.id} className="d-flex align-items-center justify-content-between small">
                    <div className="d-flex align-items-center gap-2 text-truncate" style={{ maxWidth: '70%' }}>
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="rounded-2 object-fit-contain bg-light"
                        style={{ width: '36px', height: '36px' }}
                      />
                      <span className="text-truncate">
                        {item.title} <strong className="text-muted">x{item.quantity}</strong>
                      </span>
                    </div>
                    <span className="fw-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-top pt-3">
                <div className="d-flex justify-content-between mb-2 small">
                  <span className="text-muted">Subtotal</span>
                  <span className="fw-semibold">${subtotal.toFixed(2)}</span>
                </div>

                {couponDiscountAmount > 0 && (
                  <div className="d-flex justify-content-between mb-2 small text-success">
                    <span>Promo Savings ({appliedCoupon?.code})</span>
                    <span className="fw-semibold">-${couponDiscountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="d-flex justify-content-between mb-3 small">
                  <span className="text-muted">Shipping</span>
                  <span className="fw-semibold">
                    {shippingCost === 0 ? <Badge bg="success">FREE</Badge> : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>

                <div className="border-top pt-3 d-flex justify-content-between align-items-center mb-4">
                  <span className="fs-5 fw-bold">Total Amount</span>
                  <span className="fs-3 fw-bold text-primary">${grandTotal.toFixed(2)}</span>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-100 rounded-pill fw-bold py-3 shadow-sm d-flex align-items-center justify-content-center"
                >
                  {isSubmitting ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Processing Order...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-lock-fill me-2"></i> Place Order (${grandTotal.toFixed(2)})
                    </>
                  )}
                </Button>
              </div>
            </Card>

            {/* Safety badge */}
            <div className="text-center text-muted small">
              <i className="bi bi-shield-check text-success me-1"></i> Your personal and payment data is 100% encrypted.
            </div>
          </div>
        </Col>
      </Row>
    </Form>
    </Container >
  );
};

export default Checkout;
