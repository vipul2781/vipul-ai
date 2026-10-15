import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import PostCard from '../components/PostCard';
import CommunityCard from '../components/CommunityCard';
import UserCard from '../components/UserCard';
import SearchBar from '../components/SearchBar';
import { useForum } from '../context/ForumContext';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialTab = searchParams.get('tab') || 'All';

  const { posts, communities, users } = useForum();
  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState(
    ['All', 'Posts', 'Communities', 'Users'].includes(initialTab) ? initialTab : 'All'
  );

  useEffect(() => {
    const q = searchParams.get('q');
    if (q !== null) setQuery(q);
  }, [searchParams]);

  const handleSearchSubmit = (searchTerm) => {
    setSearchParams({ q: searchTerm, tab: activeTab });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams({ q: query, tab });
  };

  // Filtered results
  const filteredPosts = useMemo(() => {
    if (!query.trim()) return posts;
    const lower = query.toLowerCase();
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(lower) ||
        p.content.toLowerCase().includes(lower) ||
        p.communityName.toLowerCase().includes(lower) ||
        p.author?.name?.toLowerCase().includes(lower) ||
        (p.tags && p.tags.some((t) => t.toLowerCase().includes(lower)))
    );
  }, [posts, query]);

  const filteredCommunities = useMemo(() => {
    if (!query.trim()) return communities;
    const lower = query.toLowerCase();
    return communities.filter(
      (c) =>
        c.name.toLowerCase().includes(lower) ||
        c.description.toLowerCase().includes(lower) ||
        (c.category && c.category.toLowerCase().includes(lower))
    );
  }, [communities, query]);

  const filteredUsers = useMemo(() => {
    if (!query.trim()) return users;
    const lower = query.toLowerCase();
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(lower) ||
        u.username.toLowerCase().includes(lower) ||
        (u.bio && u.bio.toLowerCase().includes(lower))
    );
  }, [users, query]);

  const totalResultsCount =
    filteredPosts.length + filteredCommunities.length + filteredUsers.length;

  return (
    <div className="search-page py-5">
      <div className="container">
        {/* Search Header */}
        <div className="text-center max-w-xl mx-auto mb-4">
          <h1 className="h3 fw-bold text-dark mb-3">Global Search</h1>
          <div className="mx-auto" style={{ maxWidth: '640px' }}>
            <SearchBar
              value={query}
              onChange={setQuery}
              onSubmit={handleSearchSubmit}
              placeholder="Search DiscussHub discussions, communities, or users..."
            />
          </div>
          {query && (
            <p className="small text-muted mt-2 mb-0">
              Showing results for <span className="fw-bold text-dark">"{query}"</span> ({totalResultsCount} found)
            </p>
          )}
        </div>

        {/* Search Filter Tabs */}
        <div className="card border rounded-4 shadow-sm mb-4 p-2 bg-white">
          <ul className="nav nav-pills custom-nav-pills gap-1">
            {[
              { id: 'All', label: 'All Results', count: totalResultsCount },
              { id: 'Posts', label: 'Discussions', count: filteredPosts.length },
              { id: 'Communities', label: 'Communities', count: filteredCommunities.length },
              { id: 'Users', label: 'Members', count: filteredUsers.length }
            ].map((tab) => (
              <li className="nav-item" key={tab.id}>
                <button
                  type="button"
                  className={`nav-link rounded-pill px-3 py-1 fw-bold ${
                    activeTab === tab.id ? 'active bg-primary text-white' : 'text-secondary'
                  }`}
                  onClick={() => handleTabChange(tab.id)}
                >
                  {tab.label}
                  <span
                    className={`badge ms-2 rounded-pill ${
                      activeTab === tab.id ? 'bg-white text-primary' : 'bg-light text-muted border'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* RESULTS RENDERING */}

        {/* ALL TAB */}
        {activeTab === 'All' && (
          <div>
            {/* Communities Top Matches */}
            {filteredCommunities.length > 0 && (
              <div className="mb-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h2 className="h5 fw-bold text-dark mb-0 d-flex align-items-center gap-2">
                    <i className="bi bi-grid-fill text-primary"></i>
                    <span>Matching Communities</span>
                  </h2>
                  <button
                    type="button"
                    className="btn btn-sm btn-link text-primary text-decoration-none fw-semibold"
                    onClick={() => handleTabChange('Communities')}
                  >
                    View all ({filteredCommunities.length})
                  </button>
                </div>
                <div className="row g-3">
                  {filteredCommunities.slice(0, 3).map((c) => (
                    <div key={c.id} className="col-md-4">
                      <CommunityCard community={c} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Discussions Top Matches */}
            {filteredPosts.length > 0 && (
              <div className="mb-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h2 className="h5 fw-bold text-dark mb-0 d-flex align-items-center gap-2">
                    <i className="bi bi-chat-quote-fill text-primary"></i>
                    <span>Matching Discussions</span>
                  </h2>
                  <button
                    type="button"
                    className="btn btn-sm btn-link text-primary text-decoration-none fw-semibold"
                    onClick={() => handleTabChange('Posts')}
                  >
                    View all ({filteredPosts.length})
                  </button>
                </div>
                <div className="d-flex flex-column gap-3">
                  {filteredPosts.slice(0, 5).map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              </div>
            )}

            {/* Users Top Matches */}
            {filteredUsers.length > 0 && (
              <div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h2 className="h5 fw-bold text-dark mb-0 d-flex align-items-center gap-2">
                    <i className="bi bi-people-fill text-primary"></i>
                    <span>Community Members</span>
                  </h2>
                  <button
                    type="button"
                    className="btn btn-sm btn-link text-primary text-decoration-none fw-semibold"
                    onClick={() => handleTabChange('Users')}
                  >
                    View all ({filteredUsers.length})
                  </button>
                </div>
                <div className="row g-3">
                  {filteredUsers.slice(0, 4).map((u) => (
                    <div key={u.id} className="col-md-3 col-sm-6">
                      <UserCard user={u} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {totalResultsCount === 0 && (
              <div className="text-center py-5 bg-white rounded-4 border">
                <i className="bi bi-search text-muted fs-1 mb-2 d-block"></i>
                <h4 className="fw-bold">No results found for "{query}"</h4>
                <p className="text-secondary small">
                  Try searching for different keywords, topics, or explore popular communities.
                </p>
              </div>
            )}
          </div>
        )}

        {/* POSTS TAB */}
        {activeTab === 'Posts' && (
          <div>
            {filteredPosts.length > 0 ? (
              <div className="d-flex flex-column gap-3">
                {filteredPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-5 bg-white rounded-4 border">
                <h5 className="fw-bold">No discussions matched your query</h5>
              </div>
            )}
          </div>
        )}

        {/* COMMUNITIES TAB */}
        {activeTab === 'Communities' && (
          <div>
            {filteredCommunities.length > 0 ? (
              <div className="row g-4">
                {filteredCommunities.map((c) => (
                  <div key={c.id} className="col-md-4">
                    <CommunityCard community={c} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-5 bg-white rounded-4 border">
                <h5 className="fw-bold">No communities matched your query</h5>
              </div>
            )}
          </div>
        )}

        {/* USERS TAB */}
        {activeTab === 'Users' && (
          <div>
            {filteredUsers.length > 0 ? (
              <div className="row g-3">
                {filteredUsers.map((u) => (
                  <div key={u.id} className="col-md-3 col-sm-6">
                    <UserCard user={u} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-5 bg-white rounded-4 border">
                <h5 className="fw-bold">No members matched your query</h5>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
