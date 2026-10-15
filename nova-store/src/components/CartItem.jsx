import React from 'react';
import { Button, InputGroup, Form, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  if (!item) return null;

  const { id, title, price, thumbnail, quantity, stock, category } = item;
  const itemSubtotal = (price * quantity).toFixed(2);

  const handleDecrease = () => {
    if (quantity > 1) {
      updateQuantity(id, quantity - 1);
    } else {
      removeFromCart(id);
    }
  };

  const handleIncrease = () => {
    if (stock && quantity >= stock) return;
    updateQuantity(id, quantity + 1);
  };

  const handleQtyChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) {
      updateQuantity(id, val);
    }
  };

  return (
    <div className="cart-item-card p-3 p-md-4 mb-3 rounded-4 border bg-body shadow-sm transition-all">
      <div className="row align-items-center gy-3">
        {/* Product Image */}
        <div className="col-4 col-sm-3 col-md-2 text-center">
          <Link to={`/products/${id}`} className="text-decoration-none">
            <div
              className="bg-light rounded-3 p-2 d-flex align-items-center justify-content-center overflow-hidden"
              style={{ width: '80px', height: '80px', margin: '0 auto' }}
            >
              <img
                src={thumbnail || 'https://via.placeholder.com/80'}
                alt={title}
                className="img-fluid object-fit-contain h-100"
              />
            </div>
          </Link>
        </div>

        {/* Product Details */}
        <div className="col-8 col-sm-9 col-md-4">
          {category && (
            <Badge bg="secondary-subtle" text="secondary" className="text-uppercase small mb-1">
              {category}
            </Badge>
          )}
          <h6 className="fw-bold mb-1">
            <Link to={`/products/${id}`} className="text-decoration-none text-reset text-truncate-2">
              {title}
            </Link>
          </h6>
          <div className="text-primary fw-bold">${Number(price).toFixed(2)} each</div>
        </div>

        {/* Quantity Controls */}
        <div className="col-6 col-md-3">
          <div className="d-flex align-items-center justify-content-md-center">
            <InputGroup size="sm" style={{ maxWidth: '120px' }}>
              <Button
                variant="outline-secondary"
                onClick={handleDecrease}
                className="rounded-start-pill px-2"
                title={quantity === 1 ? 'Remove item' : 'Decrease quantity'}
              >
                {quantity === 1 ? <i className="bi bi-trash text-danger"></i> : <i className="bi bi-dash"></i>}
              </Button>
              <Form.Control
                type="number"
                min="1"
                max={stock || 99}
                value={quantity}
                onChange={handleQtyChange}
                className="text-center border-secondary-subtle fw-semibold"
              />
              <Button
                variant="outline-secondary"
                onClick={handleIncrease}
                disabled={stock && quantity >= stock}
                className="rounded-end-pill px-2"
                title="Increase quantity"
              >
                <i className="bi bi-plus"></i>
              </Button>
            </InputGroup>
          </div>
          {stock && quantity >= stock && (
            <small className="text-danger d-block text-center mt-1" style={{ fontSize: '0.75rem' }}>
              Max stock reached ({stock})
            </small>
          )}
        </div>

        {/* Total & Remove */}
        <div className="col-6 col-md-3 text-end d-flex align-items-center justify-content-between justify-content-md-end gap-3">
          <div>
            <small className="text-muted d-block d-md-none">Subtotal</small>
            <span className="fs-5 fw-bold text-dark">${itemSubtotal}</span>
          </div>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => removeFromCart(id)}
            className="rounded-circle p-2 d-flex align-items-center justify-content-center"
            style={{ width: '36px', height: '36px' }}
            title="Remove from Cart"
          >
            <i className="bi bi-x-lg"></i>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
