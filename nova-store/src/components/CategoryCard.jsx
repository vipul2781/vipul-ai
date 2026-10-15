
import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const categoryImages = {
  beauty:
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&auto=format&fit=crop&q=80",

  fragrances:
    "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&auto=format&fit=crop&q=80",

  furniture:
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&auto=format&fit=crop&q=80",

  groceries:
    "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=80",

  "home-decoration":
    "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&auto=format&fit=crop&q=80",

  "kitchen-accessories":
    "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=500&auto=format&fit=crop&q=80",

  laptops:
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=80",

  "mens-shirts":
    "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&auto=format&fit=crop&q=80",

  "mens-shoes":
    "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&auto=format&fit=crop&q=80",

  "mens-watches":
    "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&auto=format&fit=crop&q=80",

  smartphones:
    "https://images.unsplash.com/photo-1511707171634-5f897ff02560?w=500&auto=format&fit=crop&q=80",

  "skin-care":
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&auto=format&fit=crop&q=80",

  sunglasses:
    "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&auto=format&fit=crop&q=80",

  tablets:
    "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500&auto=format&fit=crop&q=80",

  vehicle:
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&auto=format&fit=crop&q=80",

  "womens-bags":
    "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format&fit=crop&q=80",

  "womens-dresses":
    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&auto=format&fit=crop&q=80",

  "womens-jewellery":
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&auto=format&fit=crop&q=80",

  "womens-shoes":
    "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&auto=format&fit=crop&q=80",
};

const defaultImage =
  "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=500&auto=format&fit=crop&q=80";

const CategoryCard = ({ category }) => {
  const slug =
    typeof category === "string"
      ? category
      : category?.slug ||
      category?.name?.toLowerCase().replace(/\s+/g, "-") ||
      "";

  const name =
    typeof category === "string"
      ? category.replace(/-/g, " ")
      : category?.name || slug.replace(/-/g, " ") || "Category";

  const imageUrl = categoryImages[slug] || defaultImage;

  return (
    <Card
      className="category-card h-100 border-0 rounded-4 overflow-hidden shadow"
      style={{
        minHeight: "280px",
        position: "relative",
        backgroundColor: "#202633",
      }}
    >
      {/* Background image */}
      <img
        src={imageUrl}
        alt={`${name} category`}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = defaultImage;
        }}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
          transition: "transform 0.4s ease",
        }}
      />

      {/* Dark overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.12) 100%)",
        }}
      />

      {/* Visible category content */}
      <Card.Body
        className="d-flex flex-column justify-content-end p-4 text-white"
        style={{
          position: "relative",
          zIndex: 2,
          minHeight: "280px",
        }}
      >
        <span
          className="badge bg-primary rounded-pill align-self-start mb-3"
          style={{ fontSize: "11px" }}
        >
          CATEGORY
        </span>

        <h5
          className="fw-bold text-white text-capitalize mb-2"
          style={{
            fontSize: "1.2rem",
            overflowWrap: "anywhere",
          }}
        >
          {name}
        </h5>

        <p className="text-white mb-3" style={{ fontSize: "14px" }}>
          Explore products in this collection.
        </p>

        <Button
          as={Link}
          to={`/products?category=${encodeURIComponent(slug)}`}
          variant="light"
          size="sm"
          className="rounded-pill fw-semibold align-self-start px-3 py-2"
        >
          View Products
          <i className="bi bi-arrow-right ms-2" />
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CategoryCard;