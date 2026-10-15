import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import Loading from './Loading';

const ProductGrid = ({
  products = [],
  loading = false,
  emptyMessage = 'No products found matching your criteria.',
  onResetFilters,
  lg = 3,
  md = 4,
  sm = 6,
  xs = 12,
}) => {
  if (loading) {
    return <Loading message="Loading items..." />;
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-5 my-4 bg-body-tertiary rounded-4 p-5 shadow-sm">
        <div className="display-4 text-muted mb-3">
          <i className="bi bi-search"></i>
        </div>
        <h4 className="fw-bold mb-2">No Products Found</h4>
        <p className="text-muted mb-4">{emptyMessage}</p>
        {onResetFilters ? (
          <Button variant="primary" onClick={onResetFilters} className="rounded-pill px-4 fw-semibold">
            <i className="bi bi-arrow-counterclockwise me-1"></i> Reset Filters
          </Button>
        ) : (
          <Button as={Link} to="/products" variant="primary" className="rounded-pill px-4 fw-semibold">
            Explore All Products
          </Button>
        )}
      </div>
    );
  }

  return (
    <Row className="g-4">
      {products.map((product) => (
        <Col key={product.id} xs={xs} sm={sm} md={md} lg={lg}>
          <ProductCard product={product} />
        </Col>
      ))}
    </Row>
  );
};

export default ProductGrid;
