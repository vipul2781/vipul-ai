import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';

const categories = [
  'Web Development',
  'Mobile Development',
  'Design',
  'Writing',
  'Marketing',
  'Video Editing',
  'Data Entry'
];

const budgetRanges = [
  { label: 'Under ₹5,000', min: 0, max: 5000 },
  { label: '₹5,000 – ₹15,000', min: 5000, max: 15000 },
  { label: '₹15,000 – ₹50,000', min: 15000, max: 50000 },
  { label: '₹50,000+', min: 50000, max: 9999999 }
];

const Projects = ({
  projects,
  favorites,
  toggleFavorite
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialQuery = searchParams.get('q') || '';

  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBudget, setSelectedBudget] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [sortOption, setSortOption] = useState('Newest');

  useEffect(() => {
    const q = searchParams.get('q');
    const cat = searchParams.get('category');
    if (q) setSearchTerm(q);
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  const handleReset = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedBudget('');
    setSelectedType('');
    setSelectedExperience('');
    setSearchParams({});
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      // Keyword
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        const matchesSkill = p.skills.some((s) => s.toLowerCase().includes(q));
        const matchesClient = p.clientName.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesSkill && !matchesClient) {
          return false;
        }
      }

      // Category
      if (selectedCategory && p.category !== selectedCategory) {
        return false;
      }

      // Type
      if (selectedType && p.type !== selectedType) {
        return false;
      }

      // Experience
      if (selectedExperience && p.experience !== selectedExperience) {
        return false;
      }

      // Budget
      if (selectedBudget) {
        const range = budgetRanges.find((r) => r.label === selectedBudget);
        if (range) {
          if (p.budget.max < range.min || p.budget.min > range.max) {
            return false;
          }
        }
      }

      return true;
    });
  }, [projects, searchTerm, selectedCategory, selectedBudget, selectedType, selectedExperience]);

  // Sorting
  const sortedProjects = useMemo(() => {
    const list = [...filteredProjects];
    switch (sortOption) {
      case 'Lowest Budget':
        return list.sort((a, b) => a.budget.min - b.budget.min);
      case 'Highest Budget':
        return list.sort((a, b) => b.budget.max - a.budget.max);
      case 'Most Proposals':
        return list.sort((a, b) => b.proposals - a.proposals);
      case 'Newest':
      default:
        return list.sort((a, b) => b.id - a.id);
    }
  }, [filteredProjects, sortOption]);

  return (
    <div className="projects-page pb-5">
      {/* Header */}
      <div className="page-header text-white mb-4">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-2">
              <li className="breadcrumb-item"><Link to="/" className="text-white opacity-75">Home</Link></li>
              <li className="breadcrumb-item active text-white" aria-current="page">Projects</li>
            </ol>
          </nav>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <div>
              <h1 className="fw-bold mb-2">Browse Client Projects</h1>
              <p className="opacity-75 mb-0" style={{ maxWidth: '600px' }}>
                Discover high-value freelance jobs, submit custom proposals, and get hired directly.
              </p>
            </div>
            <Link to="/post-project" className="btn btn-warning text-dark fw-bold px-4 py-2">
              <i className="bi bi-plus-circle me-1"></i> Post a Project
            </Link>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Filter & Search Bar */}
        <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
          <div className="row g-3">
            <div className="col-lg-4 col-12">
              <label className="form-label-custom">Search Keywords</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <i className="bi bi-search text-muted"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0 form-control-custom"
                  placeholder="e.g. React, E-commerce, Flutter..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="col-lg-2 col-md-3 col-6">
              <label className="form-label-custom">Category</label>
              <select
                className="form-select form-select-custom"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="col-lg-2 col-md-3 col-6">
              <label className="form-label-custom">Budget</label>
              <select
                className="form-select form-select-custom"
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
              >
                <option value="">Any Budget</option>
                {budgetRanges.map((b) => (
                  <option key={b.label} value={b.label}>{b.label}</option>
                ))}
              </select>
            </div>

            <div className="col-lg-2 col-md-3 col-6">
              <label className="form-label-custom">Project Type</label>
              <select
                className="form-select form-select-custom"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="">All Types</option>
                <option value="Fixed Price">Fixed Price</option>
                <option value="Hourly">Hourly</option>
              </select>
            </div>

            <div className="col-lg-2 col-md-3 col-6">
              <label className="form-label-custom">Experience</label>
              <select
                className="form-select form-select-custom"
                value={selectedExperience}
                onChange={(e) => setSelectedExperience(e.target.value)}
              >
                <option value="">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
            <span className="text-muted small">
              Found <strong>{sortedProjects.length}</strong> matching projects
            </span>
            <div className="d-flex align-items-center gap-3">
              {(searchTerm || selectedCategory || selectedBudget || selectedType || selectedExperience) && (
                <button
                  type="button"
                  className="btn btn-link text-danger btn-sm p-0 text-decoration-none"
                  onClick={handleReset}
                >
                  <i className="bi bi-x-circle me-1"></i> Reset Filters
                </button>
              )}
              <div className="d-flex align-items-center gap-2">
                <span className="text-muted small fw-semibold">Sort:</span>
                <select
                  className="form-select form-select-sm form-select-custom w-auto"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="Newest">Newest First</option>
                  <option value="Highest Budget">Highest Budget</option>
                  <option value="Lowest Budget">Lowest Budget</option>
                  <option value="Most Proposals">Most Proposals</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Project Cards Grid */}
        {sortedProjects.length === 0 ? (
          <div className="empty-state card border-0 bg-white rounded-4 shadow-sm p-5 text-center">
            <i className="bi bi-clipboard-x fs-1 text-muted"></i>
            <h5 className="fw-bold mt-2">No Projects Match Your Search</h5>
            <p className="text-muted">
              Try adjusting your search criteria, budget filters, or categories.
            </p>
            <button className="btn btn-primary-custom mx-auto" onClick={handleReset}>
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="row g-4">
            {sortedProjects.map((project) => (
              <div className="col-lg-6 col-12" key={project.id}>
                <ProjectCard
                  project={project}
                  onToggleFavorite={toggleFavorite}
                  isFavorite={favorites.projects?.includes(project.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
