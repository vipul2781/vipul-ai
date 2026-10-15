import React, { useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';

const SearchBar = ({ onSearch, initialQuery = '', placeholder = 'Search products by name...' }) => {
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery('');
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="w-100">
      <InputGroup size="lg" className="shadow-sm rounded-pill overflow-hidden border">
        <InputGroup.Text className="bg-body border-0 ps-4 text-primary">
          <i className="bi bi-search fs-5"></i>
        </InputGroup.Text>
        <Form.Control
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border-0 shadow-none ps-2"
        />
        {query && (
          <Button
            variant="link"
            className="text-muted border-0 text-decoration-none px-2"
            onClick={handleClear}
            type="button"
          >
            <i className="bi bi-x-circle-fill"></i>
          </Button>
        )}
        <Button variant="primary" type="submit" className="px-4 fw-semibold rounded-pill m-1">
          Search
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SearchBar;
