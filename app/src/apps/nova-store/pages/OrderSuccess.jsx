import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col, Button, Badge, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LAST_ORDER_KEY = 'nova_last_order';

const OrderSuccess = () => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    try {
      const storedOrder = localStorage.getItem(LAST_ORDER_KEY);
      if (storedOrder) {
        setOrder(JSON.parse(storedOrder));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  if (!order) {
    return (
      <Container className="py-5 text-center">
        <div className="py-5 my-4 bg-body rounded-4 p-5 shadow-sm max-w-600 mx-auto">
          <i className="bi bi-info-circle display-1 text-primary mb-3 d-block"></i>
          <h3 className="fw-bold">No Recent Order Found</h3>
          <p className="text-muted mb-4">You have not placed an order in this browser session.</p>
          <Button as={Link} to="/products" variant="primary" className="rounded-pill px-4">
            Browse Products
          </Button>
        </div>
      </Container>
    );
  }

  // Calculate estimated delivery: 3-5 days from now
  const orderDate = new Date(order.date);
  const deliveryDate = new Date(orderDate);
  deliveryDate.setDate(orderDate.getDate() + 4);

  return (
    <Container className="py-5">
      <div className="max-w-800 mx-auto">
        {/* Celebration Banner */}
        <Card className="border-0 shadow-sm rounded-4 p-4 p-md-5 text-center bg-body mb-4">
          <div className="mb-3">
            <div
              className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center shadow"
              style={{ width: '80px', height: '80px' }}
            >
              <i className="bi bi-check-lg display-4"></i>
            </div>
          </div>

          <Badge bg="success-subtle" text="success" className="px-3 py-2 rounded-pill fw-bold text-uppercase mx-auto mb-2">
            Payment Confirmed
          </Badge>
          <h2 className="fw-bold mb-2">Thank You for Your Order!</h2>
          <p className="text-muted mb-4">
            We have received your order and are currently preparing it for shipment. A confirmation has been sent to{' '}
            <strong>{order.customer.email}</strong>.
          </p>

          <div className="p-3 bg-body-tertiary rounded-4 d-flex flex-wrap justify-content-around text-center mb-4 gap-2">
            <div>
              <small className="text-muted d-block">Order Number</small>
              <strong className="text-primary fs-5">{order.orderId}</strong>
            </div>
            <div>
              <small className="text-muted d-block">Order Date</small>
              <strong className="fs-6">{orderDate.toLocaleDateString()}</strong>
            </div>
            <div>
              <small className="text-muted d-block">Est. Delivery Date</small>
              <strong className="text-success fs-6">{deliveryDate.toLocaleDateString()}</strong>
            </div>
            <div>
              <small className="text-muted d-block">Payment Method</small>
              <strong className="fs-6 text-capitalize">{order.customer.paymentMethod.toUpperCase()}</strong>
            </div>
          </div>

          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Button as={Link} to="/products" variant="primary" size="lg" className="rounded-pill px-4 fw-semibold shadow-sm">
              <i className="bi bi-bag-check me-2"></i> Continue Shopping
            </Button>
            <Button
              variant="outline-secondary"
              size="lg"
              className="rounded-pill px-4 fw-semibold"
              onClick={() => window.print()}
            >
              <i className="bi bi-printer me-2"></i> Print Receipt
            </Button>
          </div>
        </Card>

        {/* Order Details & Summary Card */}
        <Card className="border-0 shadow-sm rounded-4 p-4 bg-body">
          <h5 className="fw-bold mb-4 border-bottom pb-2">Order Breakdown</h5>

          <Row className="g-4 mb-4">
            <Col sm={6}>
              <h6 className="fw-bold text-muted small text-uppercase">Delivery Address</h6>
              <p className="mb-0 fw-semibold">{order.customer.fullName}</p>
              <p className="text-muted mb-0">{order.customer.address}</p>
              <p className="text-muted mb-0">
                {order.customer.city}, {order.customer.state} {order.customer.pincode}
              </p>
              <p className="text-muted mb-0">Phone: {order.customer.phone}</p>
            </Col>
            <Col sm={6}>
              <h6 className="fw-bold text-muted small text-uppercase">Billing & Payment</h6>
              <p className="mb-0 fw-semibold">Payment Status: <Badge bg="success">Paid / Authorized</Badge></p>
              <p className="text-muted mb-0">Method: {order.customer.paymentMethod.toUpperCase()}</p>
              <p className="text-muted mb-0">Items: {order.totalItemsCount} item(s)</p>
            </Col>
          </Row>

          <h6 className="fw-bold text-muted small text-uppercase mb-3">Items Ordered</h6>
          <div className="table-responsive mb-4">
            <Table hover className="align-middle">
              <thead className="table-light">
                <tr>
                  <th>Product</th>
                  <th className="text-center">Qty</th>
                  <th className="text-end">Price</th>
                  <th className="text-end">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="rounded-2 object-fit-contain bg-light"
                          style={{ width: '40px', height: '40px' }}
                        />
                        <span className="fw-semibold small">{item.title}</span>
                      </div>
                    </td>
                    <td className="text-center">{item.quantity}</td>
                    <td className="text-end">${Number(item.price).toFixed(2)}</td>
                    <td className="text-end fw-bold">${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {/* Pricing Totals */}
          <div className="border-top pt-3 max-w-400 ms-auto">
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Subtotal:</span>
              <span className="fw-semibold">${order.subtotal.toFixed(2)}</span>
            </div>
            {order.discount > 0 && (
              <div className="d-flex justify-content-between mb-2 text-success">
                <span>Discount ({order.couponCode || 'Promo'}):</span>
                <span className="fw-semibold">-${order.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Shipping:</span>
              <span className="fw-semibold">
                {order.shipping === 0 ? <Badge bg="success">FREE</Badge> : `$${order.shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="d-flex justify-content-between border-top pt-2 fs-5 fw-bold">
              <span>Grand Total:</span>
              <span className="text-primary">${order.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </Card>
      </div>
    </Container>
  );
};

export default OrderSuccess;
