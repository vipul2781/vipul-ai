import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Badge,
  Pagination,
  Offcanvas,
  InputGroup,
  Alert,
} from 'react-bootstrap';
import apiService from '../services/api';
import ProductGrid from '../components/ProductGrid';
import Loading from '../components/Loading';

const ITEMS_PER_PAGE = 12;

const CATEGORY_ICONS = {
  beauty: 'bi-stars',
  fragrances: 'bi-droplet-half',
  furniture: 'bi-lamp',
  groceries: 'bi-cart3',
  'home-decoration': 'bi-house-heart',
  'kitchen-accessories': 'bi-cup-hot',
  laptops: 'bi-laptop',
  'mens-shirts': 'bi-person',
  'mens-shoes': 'bi-person-walking',
  'mens-watches': 'bi-watch',
  'mobile-accessories': 'bi-headphones',
  motorcycle: 'bi-bicycle',
  'skin-care': 'bi-heart-pulse',
  smartphones: 'bi-phone',
  'sports-accessories': 'bi-trophy',
  sunglasses: 'bi-eyeglasses',
  tablets: 'bi-tablet',
  tops: 'bi-handbag',
  vehicle: 'bi-car-front',
  'womens-bags': 'bi-bag-heart',
  'womens-dresses': 'bi-flower2',
  'womens-jewellery': 'bi-gem',
  'womens-shoes': 'bi-balloon-heart',
  'womens-watches': 'bi-clock',
};

const PRICE_PRESETS = [50, 100, 250, 500, 1000, 2000];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // All loaded products from API
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters state initialized from URL or defaults
  const categoryFromUrl = searchParams.get('category') || 'all';
  const searchFromUrl = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
  const [categorySearchQuery, setCategorySearchQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState(searchFromUrl);
  const [priceRange, setPriceRange] = useState(2000); // Max $2000
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);

  // Mobile offcanvas filter drawer
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // Keep state in sync if URL params change (e.g. searching from navbar or category page)
  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || 'all');
    setSearchQuery(searchParams.get('search') || '');
    setCurrentPage(1);
  }, [searchParams]);

  // Load initial data
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    Promise.all([apiService.getAllProducts(194), apiService.getCategories()])
      .then(([productsData, categoriesData]) => {
        if (!isMounted) return;
        setAllProducts(productsData.products || []);
        setCategories(categoriesData || []);
        setLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError('Unable to load products. Please try again later.');
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Calculate product counts per category
  const categoryCounts = useMemo(() => {
    const counts = {};
    allProducts.forEach((p) => {
      if (p.category) {
        counts[p.category] = (counts[p.category] || 0) + 1;
      }
    });
    return counts;
  }, [allProducts]);

  // Normalized list of all categories with names and slugs (with fallback to allProducts)
  const allCategoriesList = useMemo(() => {
    if (categories && categories.length > 0) {
      return categories.map((cat) => {
        if (typeof cat === 'object') {
          return {
            slug: cat.slug,
            name: cat.name || cat.slug.replace(/-/g, ' '),
          };
        }
        return {
          slug: cat,
          name: cat.replace(/-/g, ' '),
        };
      });
    }

    // Fallback if categories endpoint returned empty
    const uniqueSlugs = [...new Set(allProducts.map((p) => p.category).filter(Boolean))].sort();
    return uniqueSlugs.map((slug) => ({
      slug,
      name: slug.replace(/-/g, ' '),
    }));
  }, [categories, allProducts]);

  // Real-time search inside categories in sidebar
  const filteredCategoryList = useMemo(() => {
    if (!categorySearchQuery.trim()) return allCategoriesList;
    const q = categorySearchQuery.toLowerCase().trim();
    return allCategoriesList.filter(
      (cat) => cat.name.toLowerCase().includes(q) || cat.slug.toLowerCase().includes(q)
    );
  }, [allCategoriesList, categorySearchQuery]);

  // Update URL params when category or search changes
  const updateUrlParams = (newCategory, newSearch) => {
    const params = {};
    if (newCategory && newCategory !== 'all') params.category = newCategory;
    if (newSearch && newSearch.trim() !== '') params.search = newSearch.trim();
    setSearchParams(params);
  };

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
    updateUrlParams(cat, searchQuery);
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateUrlParams(selectedCategory, searchQuery);
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setCategorySearchQuery('');
    setSearchQuery('');
    setPriceRange(2000);
    setMinRating(0);
    setInStockOnly(false);
    setSortBy('default');
    setCurrentPage(1);
    setSearchParams({});
  };

  // Filter and Sort items memoized
  const filteredAndSortedProducts = useMemo(() => {
    return allProducts
      .filter((product) => {
        // Category filter
        if (selectedCategory !== 'all' && product.category !== selectedCategory) {
          return false;
        }

        // Search query filter (title or description or brand)
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchTitle = product.title?.toLowerCase().includes(q);
          const matchDesc = product.description?.toLowerCase().includes(q);
          const matchBrand = product.brand?.toLowerCase().includes(q);
          const matchTag = product.tags?.some((t) => t.toLowerCase().includes(q));
          if (!matchTitle && !matchDesc && !matchBrand && !matchTag) {
            return false;
          }
        }

        // Price range
        if (Number(product.price) > priceRange) {
          return false;
        }

        // Minimum rating
        if (minRating > 0 && Number(product.rating) < minRating) {
          return false;
        }

        // In stock only
        if (inStockOnly && Number(product.stock) <= 0) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'rating-desc':
            return b.rating - a.rating;
          case 'name-asc':
            return a.title.localeCompare(b.title);
          case 'name-desc':
            return b.title.localeCompare(a.title);
          default:
            return 0;
        }
      });
  }, [allProducts, selectedCategory, searchQuery, priceRange, minRating, inStockOnly, sortBy]);

  // Pagination slice
  const totalItems = filteredAndSortedProducts.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const displayedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAndSortedProducts, currentPage]);

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  // Filter Sidebar UI renderer
  const renderFilterContent = () => (
    <div className="filter-sidebar d-flex flex-column gap-4">
      {/* Category selection */}
      <div>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6 className="fw-bold mb-0 d-flex align-items-center">
            <i className="bi bi-grid-fill text-primary me-2"></i> Categories
          </h6>
          <div className="d-flex align-items-center gap-1">
            {selectedCategory !== 'all' && (
              <Button
                variant="link"
                size="sm"
                className="p-0 text-danger text-decoration-none small fw-semibold me-1"
                onClick={() => handleCategoryChange('all')}
              >
                Reset
              </Button>
            )}
            <Badge bg="primary-subtle" className="text-primary rounded-pill px-2 py-1 small">
              {allCategoriesList.length} total
            </Badge>
          </div>
        </div>

        {/* Real-time Category Search inside filter */}
        <InputGroup size="sm" className="mb-2">
          <InputGroup.Text className="bg-body border-end-0 text-muted">
            <i className="bi bi-search"></i>
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search categories..."
            value={categorySearchQuery}
            onChange={(e) => setCategorySearchQuery(e.target.value)}
            className="border-start-0 category-search-input"
          />
          {categorySearchQuery && (
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => setCategorySearchQuery('')}
              className="border-start-0"
              title="Clear category search"
            >
              <i className="bi bi-x"></i>
            </Button>
          )}
        </InputGroup>

        {/* Categories list */}
        <div className="category-filter-list">
          {/* All Categories Option */}
          <button
            type="button"
            className={`category-filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('all')}
          >
            <span className="d-flex align-items-center text-truncate pe-2">
              <span className="category-icon-box">
                <i className="bi bi-grid"></i>
              </span>
              <span className="text-truncate">All Categories</span>
            </span>
            <span className="category-filter-badge">
              {allProducts.length}
            </span>
          </button>

          {/* Filtered categories list */}
          {filteredCategoryList.length === 0 ? (
            <div className="text-center py-4 text-muted small">
              <i className="bi bi-search me-1 d-block fs-5 mb-1 text-secondary"></i>
              No category matching "{categorySearchQuery}"
              <br />
              <Button
                variant="link"
                size="sm"
                className="mt-1 text-primary p-0 small"
                onClick={() => setCategorySearchQuery('')}
              >
                Clear Search
              </Button>
            </div>
          ) : (
            filteredCategoryList.map((cat) => {
              const isSelected = selectedCategory === cat.slug;
              const iconClass = CATEGORY_ICONS[cat.slug] || 'bi-tag';
              const count = categoryCounts[cat.slug] || 0;

              return (
                <button
                  key={cat.slug}
                  type="button"
                  className={`category-filter-btn text-capitalize ${isSelected ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(cat.slug)}
                >
                  <span className="d-flex align-items-center text-truncate pe-2">
                    <span className="category-icon-box">
                      <i className={`bi ${iconClass}`}></i>
                    </span>
                    <span className="text-truncate">{cat.name}</span>
                  </span>
                  <span className="category-filter-badge">{count}</span>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="border-top pt-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6 className="fw-bold mb-0">Max Price</h6>
          <span className="badge bg-primary fs-6">${priceRange}</span>
        </div>
        <Form.Range
          min={5}
          max={2000}
          step={10}
          value={priceRange}
          onChange={(e) => {
            setPriceRange(Number(e.target.value));
            setCurrentPage(1);
          }}
        />
        <div className="d-flex justify-content-between small text-muted mb-2">
          <span>$5</span>
          <span>$1000</span>
          <span>$2000</span>
        </div>
        <div className="d-flex flex-wrap gap-1">
          {PRICE_PRESETS.map((preset) => (
            <button
              key={preset}
              type="button"
              className={`price-preset-pill ${priceRange === preset ? 'active' : ''}`}
              onClick={() => {
                setPriceRange(preset);
                setCurrentPage(1);
              }}
            >
              {preset === 2000 ? 'Any Price' : `≤ $${preset}`}
            </button>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div className="border-top pt-3">
        <h6 className="fw-bold mb-2">Customer Rating</h6>
        <div className="d-flex flex-column gap-1">
          {[
            { label: 'All Ratings', value: 0 },
            { label: '4.5 & Above ★', value: 4.5 },
            { label: '4.0 & Above ★', value: 4.0 },
            { label: '3.0 & Above ★', value: 3.0 },
          ].map((r) => (
            <Form.Check
              type="radio"
              id={`rating-${r.value}`}
              name="ratingFilter"
              label={r.label}
              key={r.value}
              checked={minRating === r.value}
              onChange={() => {
                setMinRating(r.value);
                setCurrentPage(1);
              }}
              className="small fw-medium"
            />
          ))}
        </div>
      </div>

      {/* Availability Filter */}
      <div className="border-top pt-3">
        <h6 className="fw-bold mb-2">Availability</h6>
        <Form.Check
          type="checkbox"
          id="inStockCheck"
          label="In Stock Only"
          checked={inStockOnly}
          onChange={(e) => {
            setInStockOnly(e.target.checked);
            setCurrentPage(1);
          }}
          className="small fw-medium"
        />
      </div>

      {/* Reset Filters Button */}
      <div className="border-top pt-3">
        <Button
          variant="outline-danger"
          size="sm"
          className="w-100 rounded-pill fw-semibold py-2"
          onClick={handleResetFilters}
        >
          <i className="bi bi-trash me-1"></i> Reset All Filters
        </Button>
      </div>
    </div>
  );

  return (
    <Container className="py-4">
      {/* Top Breadcrumb & Title */}
      <div className="mb-4">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-2">
          <div>
            <h1 className="fw-bold mb-0">Browse Products</h1>
            <p className="text-muted small mb-0">
              Showing {totalItems} {totalItems === 1 ? 'item' : 'items'}
              {selectedCategory !== 'all' && ` in "${selectedCategory}"`}
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
          </div>

          {/* Mobile Filter Button */}
          <Button
            variant="outline-primary"
            className="d-lg-none rounded-pill fw-semibold"
            onClick={() => setShowMobileFilter(true)}
          >
            <i className="bi bi-funnel-fill me-1"></i> Filters
          </Button>
        </div>

        {/* Search & Sort Controls Bar */}
        <Card className="border-0 shadow-sm rounded-4 p-3 bg-body">
          <Row className="g-3 align-items-center">
            {/* Search input */}
            <Col md={7}>
              <Form onSubmit={handleSearchSubmit}>
                <InputGroup>
                  <InputGroup.Text className="bg-body border-end-0">
                    <i className="bi bi-search text-primary"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="search"
                    placeholder="Search by title, brand, or keywords..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="border-start-0 border-end-0"
                  />
                  {searchQuery && (
                    <Button
                      variant="outline-secondary"
                      onClick={() => {
                        setSearchQuery('');
                        updateUrlParams(selectedCategory, '');
                      }}
                      type="button"
                    >
                      <i className="bi bi-x"></i>
                    </Button>
                  )}
                  <Button variant="primary" type="submit" className="rounded-end fw-semibold px-3">
                    Search
                  </Button>
                </InputGroup>
              </Form>
            </Col>

            {/* Sorting Dropdown */}
            <Col md={5} className="d-flex align-items-center justify-content-md-end gap-2">
              <span className="small text-muted fw-semibold text-nowrap">Sort by:</span>
              <Form.Select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="rounded-pill shadow-none"
                style={{ maxWidth: '240px' }}
              >
                <option value="default">Featured / Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Rating: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </Form.Select>
            </Col>
          </Row>

          {/* Active Filter Chips */}
          {(selectedCategory !== 'all' || searchQuery || priceRange < 2000 || minRating > 0 || inStockOnly) && (
            <div className="d-flex flex-wrap align-items-center gap-2 mt-3 pt-3 border-top">
              <span className="small text-muted fw-bold">Active Filters:</span>
              {selectedCategory !== 'all' && (
                <Badge bg="primary" className="rounded-pill p-2 px-3 fw-normal text-capitalize d-inline-flex align-items-center">
                  <i className={`bi ${CATEGORY_ICONS[selectedCategory] || 'bi-tag'} me-1`}></i>
                  Category: {selectedCategory.replace(/-/g, ' ')}{' '}
                  <i
                    className="bi bi-x-circle ms-2 cursor-pointer"
                    onClick={() => handleCategoryChange('all')}
                    title="Remove filter"
                  ></i>
                </Badge>
              )}
              {searchQuery && (
                <Badge bg="info" text="dark" className="rounded-pill p-2 px-3 fw-normal">
                  Keyword: "{searchQuery}"{' '}
                  <i
                    className="bi bi-x-circle ms-1 cursor-pointer"
                    onClick={() => {
                      setSearchQuery('');
                      updateUrlParams(selectedCategory, '');
                    }}
                  ></i>
                </Badge>
              )}
              {priceRange < 2000 && (
                <Badge bg="secondary" className="rounded-pill p-2 px-3 fw-normal">
                  Max ${priceRange}{' '}
                  <i className="bi bi-x-circle ms-1 cursor-pointer" onClick={() => setPriceRange(2000)}></i>
                </Badge>
              )}
              {minRating > 0 && (
                <Badge bg="warning" text="dark" className="rounded-pill p-2 px-3 fw-normal">
                  Min {minRating}★{' '}
                  <i className="bi bi-x-circle ms-1 cursor-pointer" onClick={() => setMinRating(0)}></i>
                </Badge>
              )}
              {inStockOnly && (
                <Badge bg="success" className="rounded-pill p-2 px-3 fw-normal">
                  In Stock Only{' '}
                  <i className="bi bi-x-circle ms-1 cursor-pointer" onClick={() => setInStockOnly(false)}></i>
                </Badge>
              )}
              <Button
                variant="link"
                size="sm"
                onClick={handleResetFilters}
                className="text-danger p-0 ms-2 text-decoration-none small"
              >
                Clear All
              </Button>
            </div>
          )}
        </Card>
      </div>

      {/* Main Grid & Sidebar Layout */}
      <Row className="g-4">
        {/* Desktop Sidebar (Left) */}
        <Col lg={3} className="d-none d-lg-block">
          <Card className="category-filter-card shadow-sm rounded-4 p-4 sticky-top bg-body" style={{ top: '90px' }}>
            {renderFilterContent()}
          </Card>
        </Col>

        {/* Products Grid (Right) */}
        <Col lg={9}>
          {error && <Alert variant="danger" className="mb-4">{error}</Alert>}
          {loading ? (
            <Loading message="Loading catalog from DummyJSON..." />
          ) : (
            <>
              <ProductGrid
                products={displayedProducts}
                loading={false}
                emptyMessage="No products match your selected filters. Try broadening your criteria."
                onResetFilters={handleResetFilters}
                lg={4}
                md={6}
                sm={6}
                xs={12}
              />

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-5">
                  <Pagination className="shadow-sm rounded-pill overflow-hidden">
                    <Pagination.Prev
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                    />
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter((page) => {
                        return (
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 2 && page <= currentPage + 2)
                        );
                      })
                      .map((page, index, array) => {
                        const showEllipsis = index > 0 && page - array[index - 1] > 1;
                        return (
                          <React.Fragment key={page}>
                            {showEllipsis && <Pagination.Ellipsis disabled />}
                            <Pagination.Item
                              active={page === currentPage}
                              onClick={() => handlePageChange(page)}
                            >
                              {page}
                            </Pagination.Item>
                          </React.Fragment>
                        );
                      })}
                    <Pagination.Next
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                    />
                  </Pagination>
                </div>
              )}
            </>
          )}
        </Col>
      </Row>

      {/* Mobile Offcanvas Drawer for Filters */}
      <Offcanvas
        show={showMobileFilter}
        onHide={() => setShowMobileFilter(false)}
        placement="start"
        className="rounded-end-4"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="fw-bold">
            <i className="bi bi-funnel-fill text-primary me-2"></i> Filter Products
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-4">
          {renderFilterContent()}
          <Button
            variant="primary"
            className="w-100 rounded-pill py-2 fw-semibold mt-4"
            onClick={() => setShowMobileFilter(false)}
          >
            Apply & View {totalItems} Results
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
};

export default Products;
