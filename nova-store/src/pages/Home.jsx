import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Carousel, Button, Card, Badge, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import apiService from '../services/api';
import ProductGrid from '../components/ProductGrid';
import CategoryCard from '../components/CategoryCard';
import Loading from '../components/Loading';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [loadingPopular, setLoadingPopular] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [error, setError] = useState(null);

  // Countdown timer for flash sale
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 35, seconds: 48 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let isMounted = true;

    // Load Featured products
    apiService
      .getFeaturedProducts(8)
      .then((data) => {
        if (isMounted) setFeaturedProducts(data.products || []);
      })
      .catch((err) => {
        if (isMounted) setError('Unable to load featured products. Please try again later.');
      })
      .finally(() => {
        if (isMounted) setLoadingFeatured(false);
      });

    // Load Popular products
    apiService
      .getPopularProducts(8)
      .then((data) => {
        if (isMounted) setPopularProducts(data.products || []);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        if (isMounted) setLoadingPopular(false);
      });

    // Load categories
    apiService
      .getCategories()
      .then((data) => {
        if (isMounted) {
          // Slice top 6 popular categories for home display
          const displayCats = Array.isArray(data) ? data.slice(0, 6) : [];
          setCategories(displayCats);
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        if (isMounted) setLoadingCategories(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="home-page pb-5">
      {/* 1. Hero Promotional Carousel */}
      <Carousel className="hero-carousel shadow-sm mb-5" interval={4500} indicators={true}>
        <Carousel.Item>
          <div
            className="hero-slide d-flex align-items-center text-white"
            style={{
              background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
              minHeight: '440px',
              padding: '60px 0',
            }}
          >
            <Container>
              <Row className="align-items-center gy-4">
                <Col lg={7} md={12}>
                  <Badge bg="warning" text="dark" className="px-3 py-2 rounded-pill fw-bold text-uppercase mb-3">
                    🚀 New Generation Tech
                  </Badge>
                  <h1 className="display-4 fw-extrabold mb-3 lh-sm">
                    Upgrade Your World With Premium Gadgets
                  </h1>
                  <p className="lead opacity-90 mb-4">
                    Explore top-rated smartphones, ultra-fast laptops, and smart accessories with up to 40% OFF.
                  </p>
                  <div className="d-flex flex-wrap gap-3">
                    <Button
                      as={Link}
                      to="/products?category=smartphones"
                      variant="warning"
                      size="lg"
                      className="rounded-pill fw-bold px-4 shadow"
                    >
                      Shop Smartphones
                    </Button>
                    <Button
                      as={Link}
                      to="/products"
                      variant="outline-light"
                      size="lg"
                      className="rounded-pill fw-semibold px-4"
                    >
                      Browse All
                    </Button>
                  </div>
                </Col>
                <Col lg={5} className="d-none d-lg-block text-center">
                  <img
                    src="https://avatars.mds.yandex.net/i?id=867c660bcdbf4ab13c26b01d58b448345bc1bc31-5220205-images-thumbs&n=13"
                    alt="Gadgets"
                    className="img-fluid rounded-4 shadow-lg hero-floating-img"
                    style={{ maxHeight: '320px', objectFit: 'cover' }}
                  />
                </Col>
              </Row>
            </Container>
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div
            className="hero-slide d-flex align-items-center text-white"
            style={{
              background: 'linear-gradient(135deg, #c31432 0%, #240b36 100%)',
              minHeight: '440px',
              padding: '60px 0',
            }}
          >
            <Container>
              <Row className="align-items-center gy-4">
                <Col lg={7} md={12}>
                  <Badge bg="light" text="danger" className="px-3 py-2 rounded-pill fw-bold text-uppercase mb-3">
                    ✨ Luxury & Beauty
                  </Badge>
                  <h1 className="display-4 fw-extrabold mb-3 lh-sm">
                    Indulge in Scents & Glow with Elegance
                  </h1>
                  <p className="lead opacity-90 mb-4">
                    Top-tier fragrances, makeup essentials, and skincare formulations crafted to perfection.
                  </p>
                  <div className="d-flex flex-wrap gap-3">
                    <Button
                      as={Link}
                      to="/products?category=beauty"
                      variant="light"
                      size="lg"
                      className="rounded-pill fw-bold px-4 shadow text-danger"
                    >
                      Shop Beauty
                    </Button>
                    <Button
                      as={Link}
                      to="/products?category=fragrances"
                      variant="outline-light"
                      size="lg"
                      className="rounded-pill fw-semibold px-4"
                    >
                      Explore Fragrances
                    </Button>
                  </div>
                </Col>
                <Col lg={5} className="d-none d-lg-block text-center">
                  <img
                    src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop&q=80"
                    alt="Beauty Collection"
                    className="img-fluid rounded-4 shadow-lg hero-floating-img"
                    style={{ maxHeight: '320px', objectFit: 'cover' }}
                  />
                </Col>
              </Row>
            </Container>
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div
            className="hero-slide d-flex align-items-center text-white"
            style={{
              background: 'linear-gradient(135deg, #0ba360 0%, #3cba92 100%)',
              minHeight: '440px',
              padding: '60px 0',
            }}
          >
            <Container>
              <Row className="align-items-center gy-4">
                <Col lg={7} md={12}>
                  <Badge bg="dark" text="light" className="px-3 py-2 rounded-pill fw-bold text-uppercase mb-3">
                    🌿 Fresh & Everyday Essentials
                  </Badge>
                  <h1 className="display-4 fw-extrabold mb-3 lh-sm">
                    Stock Up On Fresh Groceries & Home Decor
                  </h1>
                  <p className="lead opacity-90 mb-4">
                    Fast delivery straight to your doorstep. Free delivery on orders over $50!
                  </p>
                  <div className="d-flex flex-wrap gap-3">
                    <Button
                      as={Link}
                      to="/products?category=groceries"
                      variant="light"
                      size="lg"
                      className="rounded-pill fw-bold px-4 shadow text-success"
                    >
                      Shop Groceries
                    </Button>
                    <Button
                      as={Link}
                      to="/products?category=furniture"
                      variant="outline-light"
                      size="lg"
                      className="rounded-pill fw-semibold px-4"
                    >
                      Shop Furniture
                    </Button>
                  </div>
                </Col>
                <Col lg={5} className="d-none d-lg-block text-center">
                  <img
                    src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80"
                    alt="Groceries"
                    className="img-fluid rounded-4 shadow-lg hero-floating-img"
                    style={{ maxHeight: '320px', objectFit: 'cover' }}
                  />
                </Col>
              </Row>
            </Container>
          </div>
        </Carousel.Item>
      </Carousel>

      {/* 2. Value Proposition Strip */}
      <Container className="mb-5">
        <Row className="g-3">
          <Col md={3} sm={6}>
            <Card className="border-0 shadow-sm rounded-4 p-3 h-100 bg-body">
              <div className="d-flex align-items-center">
                <div className="fs-2 text-primary me-3">
                  <i className="bi bi-truck"></i>
                </div>
                <div>
                  <h6 className="fw-bold mb-0">Free Shipping</h6>
                  <small className="text-muted">On orders over $50</small>
                </div>
              </div>
            </Card>
          </Col>
          <Col md={3} sm={6}>
            <Card className="border-0 shadow-sm rounded-4 p-3 h-100 bg-body">
              <div className="d-flex align-items-center">
                <div className="fs-2 text-success me-3">
                  <i className="bi bi-shield-check"></i>
                </div>
                <div>
                  <h6 className="fw-bold mb-0">Secure Payments</h6>
                  <small className="text-muted">100% Protected Checkouts</small>
                </div>
              </div>
            </Card>
          </Col>
          <Col md={3} sm={6}>
            <Card className="border-0 shadow-sm rounded-4 p-3 h-100 bg-body">
              <div className="d-flex align-items-center">
                <div className="fs-2 text-warning me-3">
                  <i className="bi bi-arrow-repeat"></i>
                </div>
                <div>
                  <h6 className="fw-bold mb-0">30-Day Returns</h6>
                  <small className="text-muted">Hassle-free money back</small>
                </div>
              </div>
            </Card>
          </Col>
          <Col md={3} sm={6}>
            <Card className="border-0 shadow-sm rounded-4 p-3 h-100 bg-body">
              <div className="d-flex align-items-center">
                <div className="fs-2 text-info me-3">
                  <i className="bi bi-headset"></i>
                </div>
                <div>
                  <h6 className="fw-bold mb-0">24/7 Support</h6>
                  <small className="text-muted">Dedicated expert team</small>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* 3. Featured Categories Section */}
      <Container className="mb-5">
        <div className="d-flex justify-content-between align-items-end mb-4">
          <div>
            <span className="badge bg-primary-subtle text-primary px-3 py-1 rounded-pill fw-semibold mb-2">
              Collections
            </span>
            <h2 className="fw-bold mb-0">Shop by Categories</h2>
          </div>
          <Button as={Link} to="/categories" variant="outline-primary" className="rounded-pill px-4 fw-semibold">
            All Categories <i className="bi bi-arrow-right ms-1"></i>
          </Button>
        </div>

        {loadingCategories ? (
          <Loading message="Loading categories..." />
        ) : (
          <Row className="g-4">
            {categories.map((cat, idx) => (
              <Col key={typeof cat === 'object' ? cat.slug : idx} xs={12} sm={6} md={4}>
                <div style={{ height: '220px' }}>
                  <CategoryCard category={cat} />
                </div>
              </Col>
            ))}
          </Row>
        )}
      </Container>

      {/* 4. Featured Products Section */}
      <Container className="mb-5">
        <div className="d-flex justify-content-between align-items-end mb-4">
          <div>
            <span className="badge bg-warning-subtle text-warning-emphasis px-3 py-1 rounded-pill fw-semibold mb-2">
              Handpicked Deals
            </span>
            <h2 className="fw-bold mb-0">Featured Products</h2>
          </div>
          <Button as={Link} to="/products" variant="outline-primary" className="rounded-pill px-4 fw-semibold">
            View All <i className="bi bi-arrow-right ms-1"></i>
          </Button>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}
        <ProductGrid products={featuredProducts} loading={loadingFeatured} />
      </Container>

      {/* 5. Promotional Flash Sale Banner with Countdown */}
      <Container className="mb-5">
        <Card
          className="border-0 rounded-4 overflow-hidden shadow text-white"
          style={{
            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #db2777 100%)',
          }}
        >
          <Card.Body className="p-4 p-md-5">
            <Row className="align-items-center gy-4">
              <Col lg={7}>
                <span className="badge bg-warning text-dark px-3 py-2 rounded-pill fw-bold text-uppercase mb-3">
                  🔥 Limited Time Flash Sale
                </span>
                <h2 className="display-5 fw-bold mb-3">Save Big on Premium Picks Today</h2>
                <p className="lead opacity-90 mb-4">
                  Enjoy an extra 15% discount on selected beauty & tech categories. Use promo coupon{' '}
                  <strong className="badge bg-light text-dark px-2 py-1 fs-6">SAVE10</strong> at checkout!
                </p>

                {/* Live Countdown Timer Badges */}
                <div className="d-flex gap-3 mb-4">
                  <div className="bg-black bg-opacity-40 rounded-3 p-3 text-center min-w-60">
                    <span className="fs-3 fw-bold d-block">{String(timeLeft.hours).padStart(2, '0')}</span>
                    <small className="text-white-50 text-uppercase" style={{ fontSize: '0.7rem' }}>
                      Hours
                    </small>
                  </div>
                  <div className="bg-black bg-opacity-40 rounded-3 p-3 text-center min-w-60">
                    <span className="fs-3 fw-bold d-block">{String(timeLeft.minutes).padStart(2, '0')}</span>
                    <small className="text-white-50 text-uppercase" style={{ fontSize: '0.7rem' }}>
                      Mins
                    </small>
                  </div>
                  <div className="bg-black bg-opacity-40 rounded-3 p-3 text-center min-w-60">
                    <span className="fs-3 fw-bold d-block">{String(timeLeft.seconds).padStart(2, '0')}</span>
                    <small className="text-white-50 text-uppercase" style={{ fontSize: '0.7rem' }}>
                      Secs
                    </small>
                  </div>
                </div>

                <Button
                  as={Link}
                  to="/products"
                  variant="light"
                  size="lg"
                  className="rounded-pill fw-bold px-4 text-primary shadow"
                >
                  Grab Deals Now <i className="bi bi-bag-check-fill ms-2"></i>
                </Button>
              </Col>

              <Col lg={5} className="text-center d-none d-lg-block">
                <img
                  src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format&fit=crop&q=80"
                  alt="Special Offer"
                  className="img-fluid rounded-4 shadow-lg"
                  style={{ maxHeight: '280px', objectFit: 'cover' }}
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>

      {/* 6. Popular / Top Rated Products Section */}
      <Container className="mb-5">
        <div className="d-flex justify-content-between align-items-end mb-4">
          <div>
            <span className="badge bg-success-subtle text-success px-3 py-1 rounded-pill fw-semibold mb-2">
              Customer Favorites
            </span>
            <h2 className="fw-bold mb-0">Popular & Top Rated</h2>
          </div>
          <Button as={Link} to="/products" variant="outline-primary" className="rounded-pill px-4 fw-semibold">
            See More <i className="bi bi-arrow-right ms-1"></i>
          </Button>
        </div>

        <ProductGrid products={popularProducts} loading={loadingPopular} />
      </Container>

      {/* 7. Testimonials / Trust Section */}
      <Container>
        <div className="text-center mb-5">
          <span className="badge bg-info-subtle text-info px-3 py-1 rounded-pill fw-semibold mb-2">
            Social Proof
          </span>
          <h2 className="fw-bold">What Our Customers Say</h2>
          <p className="text-muted">Over 50,000 satisfied shoppers worldwide</p>
        </div>

        <Row className="g-4">
          <Col md={4}>
            <Card className="border-0 shadow-sm rounded-4 p-4 h-100 bg-body">
              <div className="text-warning mb-2">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill ms-1"></i>
                <i className="bi bi-star-fill ms-1"></i>
                <i className="bi bi-star-fill ms-1"></i>
                <i className="bi bi-star-fill ms-1"></i>
              </div>
              <p className="text-muted mb-3 fst-italic">
                "The delivery was incredibly prompt and the smartphone arrived in pristine condition. Best e-commerce
                shopping experience I've had!"
              </p>
              <div className="d-flex align-items-center mt-auto">
                <div
                  className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold me-3"
                  style={{ width: '42px', height: '42px' }}
                >
                  SJ
                </div>
                <div>
                  <h6 className="fw-bold mb-0">Sarah Jenkins</h6>
                  <small className="text-muted">Verified Buyer</small>
                </div>
              </div>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="border-0 shadow-sm rounded-4 p-4 h-100 bg-body">
              <div className="text-warning mb-2">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill ms-1"></i>
                <i className="bi bi-star-fill ms-1"></i>
                <i className="bi bi-star-fill ms-1"></i>
                <i className="bi bi-star-fill ms-1"></i>
              </div>
              <p className="text-muted mb-3 fst-italic">
                "Exceptional quality on perfumes and skincare. The discount codes worked flawlessly and saved me 20%
                on my bulk purchase!"
              </p>
              <div className="d-flex align-items-center mt-auto">
                <div
                  className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center fw-bold me-3"
                  style={{ width: '42px', height: '42px' }}
                >
                  MR
                </div>
                <div>
                  <h6 className="fw-bold mb-0">Marcus Rivera</h6>
                  <small className="text-muted">Verified Buyer</small>
                </div>
              </div>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="border-0 shadow-sm rounded-4 p-4 h-100 bg-body">
              <div className="text-warning mb-2">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill ms-1"></i>
                <i className="bi bi-star-fill ms-1"></i>
                <i className="bi bi-star-fill ms-1"></i>
                <i className="bi bi-star-half ms-1"></i>
              </div>
              <p className="text-muted mb-3 fst-italic">
                "Super responsive design, clean UI and seamless checkout with instant order confirmation. Truly
                delightful experience!"
              </p>
              <div className="d-flex align-items-center mt-auto">
                <div
                  className="rounded-circle bg-warning text-dark d-flex align-items-center justify-content-center fw-bold me-3"
                  style={{ width: '42px', height: '42px' }}
                >
                  EL
                </div>
                <div>
                  <h6 className="fw-bold mb-0">Emily Lawson</h6>
                  <small className="text-muted">Verified Buyer</small>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
