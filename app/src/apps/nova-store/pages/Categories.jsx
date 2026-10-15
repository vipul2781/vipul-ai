
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";

import apiService from "../services/api";
import CategoryCard from "../components/CategoryCard";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadCategories = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await apiService.getCategories();

        if (!isMounted) return;

        // Support an array or an API response containing categories.
        const categoryList = Array.isArray(data)
          ? data
          : Array.isArray(data?.categories)
            ? data.categories
            : [];

        setCategories(categoryList);
      } catch (err) {
        if (isMounted) {
          setError(
            "Failed to load categories. Please check your API and try again."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  // Safely extract a category name from either a string or an object.
  const getCategoryName = (category) => {
    if (typeof category === "string") {
      return category.replace(/-/g, " ");
    }

    return category?.name || category?.slug || "";
  };

  const filteredCategories = categories.filter((category) =>
    getCategoryName(category)
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase())
  );

  return (
    <Container className="py-5">
      {/* Page heading */}
      <div className="text-center mb-5">
        <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill mb-3">
          Collections Directory
        </span>

        <h1 className="fw-bold mb-3">Explore All Categories</h1>

        <p className="text-muted mx-auto" style={{ maxWidth: "600px" }}>
          Discover products across beauty, fashion, electronics, home
          essentials, and more.
        </p>

        {/* Search */}
        <div className="mx-auto mt-4" style={{ maxWidth: "500px" }}>
          <InputGroup size="lg">
            <InputGroup.Text>
              <i className="bi bi-search" />
            </InputGroup.Text>

            <Form.Control
              type="search"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search categories"
            />

            {searchTerm && (
              <Button
                variant="outline-secondary"
                onClick={() => setSearchTerm("")}
              >
                Clear
              </Button>
            )}
          </InputGroup>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3 text-muted">Loading categories...</p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}

      {/* Empty results */}
      {!loading && !error && filteredCategories.length === 0 && (
        <div className="text-center py-5">
          <i className="bi bi-folder-x display-4 text-secondary" />

          <h4 className="mt-3">
            {categories.length === 0
              ? "No categories available"
              : `No categories found for "${searchTerm}"`}
          </h4>

          <p className="text-muted">
            Try another search or clear your search term.
          </p>

          <Button
            variant="primary"
            onClick={() => setSearchTerm("")}
          >
            View All Categories
          </Button>
        </div>
      )}

      {/* Category cards */}
      {!loading && !error && filteredCategories.length > 0 && (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold mb-0">All Categories</h4>

            <span className="text-muted">
              {filteredCategories.length} categories
            </span>
          </div>

          <Row className="g-4">
            {filteredCategories.map((category, index) => {
              const name = getCategoryName(category);
              const slug =
                typeof category === "string"
                  ? category
                  : category?.slug || name.toLowerCase().replace(/\s+/g, "-");

              return (
                <Col key={slug || index} xs={12} sm={6} md={4} lg={3}>
                  <CategoryCard category={category} />
                </Col>
              );
            })}
          </Row>
        </>
      )}
    </Container>
  );
};

export default Categories;