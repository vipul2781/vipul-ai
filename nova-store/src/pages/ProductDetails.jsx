import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button,
  Breadcrumb,
  Tab,
  Tabs,
  Form,
} from 'react-bootstrap';
import apiService from '../services/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import ProductGrid from '../components/ProductGrid';
import Loading from '../components/Loading';

const RECENTLY_VIEWED_KEY = 'nova_recently_viewed';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // New review state
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });
  const [reviewsList, setReviewsList] = useState([]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    setQuantity(1);

    apiService
      .getProductById(id)
      .then((data) => {
        if (!isMounted) return;
        setProduct(data);
        setSelectedImage(data.images?.[0] || data.thumbnail || '');
        setReviewsList(data.reviews || []);
        setLoading(false);

        // Track in Recently Viewed localStorage
        try {
          const stored = localStorage.getItem(RECENTLY_VIEWED_KEY);
          let viewed = stored ? JSON.parse(stored) : [];
          // Remove current if exists, then prepend
          viewed = viewed.filter((p) => p.id !== data.id);
          viewed.unshift({
            id: data.id,
            title: data.title,
            price: data.price,
            thumbnail: data.thumbnail || data.images?.[0],
            rating: data.rating,
            category: data.category,
            discountPercentage: data.discountPercentage,
          });
          // Keep max 6 items
          viewed = viewed.slice(0, 6);
          localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(viewed));
          setRecentlyViewed(viewed.filter((p) => p.id !== data.id));
        } catch (e) {
          console.error('Error saving recently viewed', e);
        }

        // Fetch related products in same category
        if (data.category) {
          apiService
            .getProductsByCategory(data.category, { limit: 5 })
            .then((catData) => {
              if (isMounted) {
                // Filter out current product
                const related = (catData.products || []).filter((p) => p.id !== data.id);
                setRelatedProducts(related.slice(0, 4));
              }
            })
            .catch(() => {});
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err.message || 'Unable to load product details.');
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return <Loading message="Loading product information..." fullPage />;
  }

  if (error || !product) {
    return (
      <Container className="py-5 text-center">
        <div className="py-5 my-5">
          <i className="bi bi-exclamation-octagon text-danger display-3 mb-3"></i>
          <h3 className="fw-bold">Product Not Found</h3>
          <p className="text-muted mb-4">{error || 'The product you are looking for does not exist or has been removed.'}</p>
          <Button as={Link} to="/products" variant="primary" className="rounded-pill px-4">
            <i className="bi bi-arrow-left me-2"></i> Back to Products
          </Button>
        </div>
      </Container>
    );
  }

  const {
    title,
    description,
    price,
    discountPercentage = 0,
    rating = 0,
    brand,
    category,
    stock = 0,
    dimensions,
    warrantyInformation,
    shippingInformation,
    returnPolicy,
    minimumOrderQuantity,
    tags = [],
    images = [],
  } = product;

  const originalPrice = discountPercentage > 0 ? (price / (1 - discountPercentage / 100)).toFixed(2) : null;
  const isFavorited = isInWishlist(product.id);
  const isOutOfStock = stock <= 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  const handleAddReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;

    const added = {
      reviewerName: newReview.name,
      rating: Number(newReview.rating),
      comment: newReview.comment,
      date: new Date().toISOString(),
    };

    setReviewsList((prev) => [added, ...prev]);
    setNewReview({ name: '', rating: 5, comment: '' });
    addToast('Your review has been submitted! Thank you.', 'success');
  };

  return (
    <Container className="py-4">
      {/* Breadcrumbs */}
      <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
        <Breadcrumb className="mb-0">
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/products' }}>
            Products
          </Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/products?category=${category}` }}>
            <span className="text-capitalize">{category}</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item active className="text-truncate" style={{ maxWidth: '240px' }}>
            {title}
          </Breadcrumb.Item>
        </Breadcrumb>

        <Button
          variant="outline-secondary"
          size="sm"
          className="rounded-pill"
          onClick={() => navigate(-1)}
        >
          <i className="bi bi-arrow-left me-1"></i> Back
        </Button>
      </div>

      {/* Main Product Showcase Card */}
      <Card className="border-0 shadow-sm rounded-4 p-3 p-md-4 mb-5 bg-body">
        <Row className="g-4">
          {/* Left: Gallery Images */}
          <Col lg={6}>
            <div className="d-flex flex-column gap-3">
              {/* Main Image Display */}
              <div
                className="bg-light rounded-4 overflow-hidden position-relative d-flex align-items-center justify-content-center border"
                style={{ height: '420px' }}
              >
                <img
                  src={selectedImage || 'https://via.placeholder.com/500'}
                  alt={title}
                  className="img-fluid object-fit-contain p-4 h-100 w-100 transition-all"
                />

                {/* Wishlist Button floating over image */}
                <Button
                  variant="light"
                  size="sm"
                  onClick={() => toggleWishlist(product)}
                  className="position-absolute top-0 end-0 m-3 rounded-circle shadow-sm border-0 d-flex align-items-center justify-content-center"
                  style={{ width: '44px', height: '44px', zIndex: 5 }}
                >
                  <i
                    className={`bi ${
                      isFavorited ? 'bi-heart-fill text-danger' : 'bi-heart text-secondary'
                    } fs-5`}
                  ></i>
                </Button>

                {discountPercentage > 0 && (
                  <Badge
                    bg="danger"
                    className="position-absolute top-0 start-0 m-3 rounded-pill px-3 py-2 fs-6 shadow-sm"
                  >
                    -{Math.round(discountPercentage)}% OFF
                  </Badge>
                )}
              </div>

              {/* Clickable Image Thumbnails */}
              {images.length > 1 && (
                <div className="d-flex gap-2 overflow-x-auto pb-2">
                  {images.map((imgUrl, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedImage(imgUrl)}
                      className={`thumbnail-box rounded-3 border overflow-hidden cursor-pointer ${
                        selectedImage === imgUrl ? 'border-primary border-2 shadow-sm' : 'border-secondary-subtle'
                      }`}
                      style={{ width: '75px', height: '75px', flexShrink: 0, padding: '4px' }}
                    >
                      <img
                        src={imgUrl}
                        alt={`${title} thumb ${idx}`}
                        className="w-100 h-100 object-fit-contain"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Col>

          {/* Right: Product Details & Controls */}
          <Col lg={6}>
            <div className="d-flex flex-column h-100">
              {/* Brand & Category badges */}
              <div className="d-flex align-items-center gap-2 mb-2">
                <Badge bg="primary-subtle" text="primary" className="text-uppercase px-2 py-1 rounded-pill">
                  {category}
                </Badge>
                {brand && (
                  <Badge bg="secondary-subtle" text="secondary" className="px-2 py-1 rounded-pill">
                    Brand: {brand}
                  </Badge>
                )}
                <Badge
                  bg={isOutOfStock ? 'danger' : stock < 10 ? 'warning' : 'success-subtle'}
                  text={stock < 10 && !isOutOfStock ? 'dark' : !isOutOfStock ? 'success' : 'light'}
                  className="rounded-pill px-2 py-1"
                >
                  {isOutOfStock ? 'Out of Stock' : `${stock} Units In Stock`}
                </Badge>
              </div>

              {/* Title */}
              <h2 className="fw-bold mb-2">{title}</h2>

              {/* Rating & Reviews Count */}
              <div className="d-flex align-items-center gap-2 mb-3">
                <div className="text-warning">
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
                <span className="fw-bold text-dark">{Number(rating).toFixed(1)}</span>
                <span className="text-muted small">({reviewsList.length} verified reviews)</span>
              </div>

              {/* Pricing section */}
              <div className="bg-body-secondary p-3 rounded-4 mb-4">
                <div className="d-flex align-items-baseline gap-3">
                  <span className="display-6 fw-bold text-primary">${Number(price).toFixed(2)}</span>
                  {originalPrice && (
                    <span className="text-muted text-decoration-line-through fs-5">
                      ${originalPrice}
                    </span>
                  )}
                  {discountPercentage > 0 && (
                    <Badge bg="danger" className="rounded-pill px-2 py-1">
                      Save ${(originalPrice - price).toFixed(2)}
                    </Badge>
                  )}
                </div>
                <small className="text-muted d-block mt-1">
                  Tax included. Eligible for Free Shipping on orders over $50.
                </small>
              </div>

              {/* Description */}
              <p className="text-muted mb-4">{description}</p>

              {/* Quick Spec Pills */}
              <div className="row g-2 mb-4 small">
                {warrantyInformation && (
                  <div className="col-sm-6">
                    <div className="p-2 border rounded-3 bg-body-tertiary d-flex align-items-center">
                      <i className="bi bi-shield-check text-primary me-2 fs-5"></i>
                      <span><strong>Warranty:</strong> {warrantyInformation}</span>
                    </div>
                  </div>
                )}
                {shippingInformation && (
                  <div className="col-sm-6">
                    <div className="p-2 border rounded-3 bg-body-tertiary d-flex align-items-center">
                      <i className="bi bi-box-seam text-success me-2 fs-5"></i>
                      <span><strong>Shipping:</strong> {shippingInformation}</span>
                    </div>
                  </div>
                )}
                {returnPolicy && (
                  <div className="col-sm-6">
                    <div className="p-2 border rounded-3 bg-body-tertiary d-flex align-items-center">
                      <i className="bi bi-arrow-repeat text-warning me-2 fs-5"></i>
                      <span><strong>Returns:</strong> {returnPolicy}</span>
                    </div>
                  </div>
                )}
                {dimensions && (
                  <div className="col-sm-6">
                    <div className="p-2 border rounded-3 bg-body-tertiary d-flex align-items-center">
                      <i className="bi bi-arrows-angle-expand text-info me-2 fs-5"></i>
                      <span>
                        <strong>Dimensions:</strong> {dimensions.width} x {dimensions.height} x {dimensions.depth} cm
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Tags */}
              {tags.length > 0 && (
                <div className="d-flex align-items-center gap-1 mb-4 flex-wrap">
                  <span className="small text-muted fw-bold me-1">Tags:</span>
                  {tags.map((t, idx) => (
                    <Badge key={idx} bg="light" text="dark" className="border rounded-pill px-2 py-1 small">
                      #{t}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Quantity & Action Buttons */}
              <div className="mt-auto pt-3 border-top">
                <div className="d-flex align-items-center gap-3 mb-3 flex-wrap">
                  <span className="fw-semibold">Quantity:</span>
                  <div className="d-flex align-items-center border rounded-pill p-1">
                    <Button
                      variant="light"
                      size="sm"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="rounded-circle"
                      style={{ width: '32px', height: '32px' }}
                      disabled={isOutOfStock}
                    >
                      <i className="bi bi-dash"></i>
                    </Button>
                    <span className="px-3 fw-bold">{quantity}</span>
                    <Button
                      variant="light"
                      size="sm"
                      onClick={() => setQuantity((q) => Math.min(stock || 99, q + 1))}
                      className="rounded-circle"
                      style={{ width: '32px', height: '32px' }}
                      disabled={isOutOfStock || quantity >= stock}
                    >
                      <i className="bi bi-plus"></i>
                    </Button>
                  </div>
                  {stock > 0 && (
                    <small className="text-muted">
                      ({stock} available)
                    </small>
                  )}
                </div>

                <div className="d-flex gap-3">
                  <Button
                    variant="primary"
                    size="lg"
                    className="flex-grow-1 rounded-pill fw-bold py-2 shadow-sm d-flex align-items-center justify-content-center"
                    onClick={handleAddToCart}
                    disabled={isOutOfStock}
                  >
                    <i className="bi bi-cart-plus me-2 fs-5"></i> Add to Cart
                  </Button>
                  <Button
                    variant="warning"
                    size="lg"
                    className="flex-grow-1 rounded-pill fw-bold py-2 shadow-sm text-dark d-flex align-items-center justify-content-center"
                    onClick={handleBuyNow}
                    disabled={isOutOfStock}
                  >
                    <i className="bi bi-lightning-charge-fill me-2 fs-5"></i> Buy Now
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Card>

      {/* Tabs: Specifications & Customer Reviews */}
      <Card className="border-0 shadow-sm rounded-4 p-4 mb-5 bg-body">
        <Tabs defaultActiveKey="reviews" id="product-info-tabs" className="mb-4">
          <Tab eventKey="reviews" title={`Customer Reviews (${reviewsList.length})`}>
            <Row className="g-4">
              {/* Reviews List */}
              <Col lg={7}>
                <h5 className="fw-bold mb-3">Customer Feedback</h5>
                {reviewsList.length === 0 ? (
                  <p className="text-muted">No reviews yet for this product. Be the first to review!</p>
                ) : (
                  <div className="d-flex flex-column gap-3">
                    {reviewsList.map((rev, idx) => (
                      <div key={idx} className="p-3 border rounded-3 bg-body-tertiary">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <strong className="text-dark">{rev.reviewerName || 'Verified Shopper'}</strong>
                          <small className="text-muted">
                            {rev.date ? new Date(rev.date).toLocaleDateString() : 'Recent'}
                          </small>
                        </div>
                        <div className="text-warning small mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <i
                              key={star}
                              className={`bi ${star <= rev.rating ? 'bi-star-fill' : 'bi-star'}`}
                            ></i>
                          ))}
                        </div>
                        <p className="mb-0 text-muted small">{rev.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </Col>

              {/* Add a Review Form */}
              <Col lg={5}>
                <div className="p-4 border rounded-4 bg-body-tertiary">
                  <h6 className="fw-bold mb-3">Write a Customer Review</h6>
                  <Form onSubmit={handleAddReviewSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label className="small fw-semibold">Your Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="e.g. Alex Taylor"
                        required
                        value={newReview.name}
                        onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className="small fw-semibold">Rating</Form.Label>
                      <Form.Select
                        value={newReview.rating}
                        onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                      >
                        <option value="5">★★★★★ (5 Stars - Exceptional)</option>
                        <option value="4">★★★★☆ (4 Stars - Great)</option>
                        <option value="3">★★★☆☆ (3 Stars - Average)</option>
                        <option value="2">★★☆☆☆ (2 Stars - Below expectations)</option>
                        <option value="1">★☆☆☆☆ (1 Star - Poor)</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className="small fw-semibold">Your Review / Comments</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="What did you like or dislike about this product?"
                        required
                        value={newReview.comment}
                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100 rounded-pill fw-semibold">
                      Submit Review
                    </Button>
                  </Form>
                </div>
              </Col>
            </Row>
          </Tab>

          <Tab eventKey="details" title="Specifications & Shipping">
            <Row className="g-3">
              <Col md={6}>
                <table className="table table-bordered mb-0">
                  <tbody>
                    <tr>
                      <th className="bg-light w-40">Brand</th>
                      <td>{brand || 'Universal'}</td>
                    </tr>
                    <tr>
                      <th className="bg-light">Category</th>
                      <td className="text-capitalize">{category}</td>
                    </tr>
                    <tr>
                      <th className="bg-light">Stock Units</th>
                      <td>{stock} items</td>
                    </tr>
                    <tr>
                      <th className="bg-light">Minimum Order</th>
                      <td>{minimumOrderQuantity || 1} unit(s)</td>
                    </tr>
                  </tbody>
                </table>
              </Col>
              <Col md={6}>
                <table className="table table-bordered mb-0">
                  <tbody>
                    <tr>
                      <th className="bg-light w-40">Warranty</th>
                      <td>{warrantyInformation || 'Standard manufacturer warranty'}</td>
                    </tr>
                    <tr>
                      <th className="bg-light">Shipping</th>
                      <td>{shippingInformation || 'Dispatches in 24 hours'}</td>
                    </tr>
                    <tr>
                      <th className="bg-light">Return Policy</th>
                      <td>{returnPolicy || '30-day money back guarantee'}</td>
                    </tr>
                  </tbody>
                </table>
              </Col>
            </Row>
          </Tab>
        </Tabs>
      </Card>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="fw-bold mb-0">Related Products</h3>
            <Button
              as={Link}
              to={`/products?category=${category}`}
              variant="outline-primary"
              className="rounded-pill px-3"
            >
              See All in {category}
            </Button>
          </div>
          <ProductGrid products={relatedProducts} loading={false} />
        </div>
      )}

      {/* Recently Viewed Products */}
      {recentlyViewed.length > 0 && (
        <div>
          <h4 className="fw-bold mb-3">Recently Viewed</h4>
          <ProductGrid products={recentlyViewed.slice(0, 4)} loading={false} />
        </div>
      )}
    </Container>
  );
};

export default ProductDetails;
