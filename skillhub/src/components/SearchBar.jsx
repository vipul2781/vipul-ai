import React from 'react';

const SearchBar = ({ placeholder, value, onChange, onSearch }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch && onSearch();
    }
  };

  return (
    <div className="input-group">
      <span className="input-group-text bg-white border-end-0" style={{ borderColor: '#E2E8F0' }}>
        <i className="bi bi-search text-muted"></i>
      </span>
      <input
        type="text"
        className="form-control border-start-0 form-control-custom"
        placeholder={placeholder || "Search..."}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        style={{ borderColor: '#E2E8F0' }}
      />
      {onSearch && (
        <button className="btn btn-primary-custom" onClick={onSearch}>
          Search
        </button>
      )}
    </div>
  );
};

export default SearchBar;
