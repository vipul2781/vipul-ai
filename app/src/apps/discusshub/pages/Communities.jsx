import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import CommunityCard from '../components/CommunityCard';
import { useForum } from '../context/ForumContext';

const Communities = () => {
  const { communities } = useForum();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategoryParam = searchParams.get('category') || 'All';
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(selectedCategoryParam);
  const [sortBy, setSortBy] = useState('members');

  const categoryList = [
    'All',
    'Technology',
    'Programming',
    'Gaming',
    'Entertainment',
    'Education',
    'Sports',
    'Science',
    'Photography',
    'Music',
    'Lifestyle'
  ];

  const filteredCommunities = useMemo(() => {
    return communities.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.category && c.category.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCat =
        activeCategory === 'All' ||
        (c.category && c.category.toLowerCase() === activeCategory.toLowerCase());

      return matchesSearch && matchesCat;
    }).sort((a, b) => {
      if (sortBy === 'members') return b.membersCount - a.membersCount;
      if (sortBy === 'posts') return b.postsCount - a.postsCount;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [communities, searchQuery, activeCategory, sortBy]);

  const handleCategorySelect = (cat) => {
    setActiveCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: cat });
    }
  };

  return (
    <div className="communities-page py-5">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-5">
          <span className="badge bg-primary bg-opacity-10 text-primary border border-primary-subtle px-3 py-1 rounded-pill fw-semibold mb-2">
            Hub Discovery
          </span>
          <h1 className="display-5 fw-extrabold text-dark mb-2">Explore Communities</h1>
          <p className="lead text-secondary fs-6 mb-4">
            Find communities based on your interests, join engaging discussions, and grow your network.
          </p>

          {/* Search communities input */}
          <div className="mx-auto" style={{ maxWidth: '540px' }}>
            <div className="input-group input-group-lg shadow-sm rounded-pill overflow-hidden border">
              <span className="input-group-text bg-white border-0 ps-3 text-muted">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="search"
                className="form-control border-0 shadow-none ps-1"
                placeholder="Search communities by name or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ fontSize: '1rem' }}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="btn bg-white border-0 text-muted"
                  onClick={() => setSearchQuery('')}
                >
                  <i className="bi bi-x-circle-fill"></i>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Community Categories Filter Buttons */}
        <div className="mb-4">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <span className="fw-bold small text-secondary text-uppercase tracking-wider">
              Browse by Category:
            </span>
            <div className="d-flex align-items-center gap-2">
              <span className="small text-muted">Sort:</span>
              <select
                className="form-select form-select-sm"
                style={{ width: 'auto', fontSize: '0.85rem' }}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="members">Most Members</option>
                <option value="posts">Most Active</option>
                <option value="name">Alphabetical</option>
              </select>
            </div>
          </div>

          <div className="d-flex flex-wrap gap-2">
            {categoryList.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`btn btn-sm rounded-pill px-3 py-2 fw-semibold ${
                  activeCategory === cat
                    ? 'btn-primary-custom shadow-sm'
                    : 'btn-light border text-dark'
                }`}
                onClick={() => handleCategorySelect(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Community Creation Banner / Quick Action */}
        <div className="p-3 mb-4 rounded-4 bg-primary bg-opacity-10 border border-primary-subtle d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <div className="d-flex align-items-center gap-3">
            <div className="p-2 bg-primary text-white rounded-3">
              <i className="bi bi-plus-circle-fill fs-4"></i>
            </div>
            <div>
              <h6 className="fw-bold text-dark mb-0">Can't find what you are looking for?</h6>
              <p className="small text-secondary mb-0">
                Launch your own community space in seconds and gather like-minded members.
              </p>
            </div>
          </div>
          <Link to="/create-community" className="btn btn-primary-custom btn-sm flex-shrink-0">
            <i className="bi bi-plus-lg me-1"></i>Create Community
          </Link>
        </div>

        {/* Communities Grid */}
        {filteredCommunities.length > 0 ? (
          <div className="row g-4">
            {filteredCommunities.map((c) => (
              <div key={c.id} className="col-lg-4 col-md-6 col-sm-6">
                <CommunityCard community={c} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-5 bg-white rounded-4 border">
            <i className="bi bi-search text-muted fs-1 mb-2 d-block"></i>
            <h4 className="fw-bold text-dark">No matching communities found</h4>
            <p className="text-secondary small mb-3">
              We couldn't find any community matching "{searchQuery}" in {activeCategory}.
            </p>
            <button
              type="button"
              className="btn btn-outline-primary-custom btn-sm"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Communities;
