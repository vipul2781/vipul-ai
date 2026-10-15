import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Rating from '../components/Rating';

const ProjectDetails = ({
  projects,
  favorites,
  toggleFavorite,
  onSubmitProposal
}) => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === parseInt(id));

  const [showApplyModal, setShowApplyModal] = useState(false);
  const [bidAmount, setBidAmount] = useState(project ? project.budget.min : '');
  const [deliveryTime, setDeliveryTime] = useState('7 days');
  const [proposalText, setProposalText] = useState('');

  if (!project) {
    return (
      <div className="container py-5 text-center">
        <h3 className="fw-bold">Project Not Found</h3>
        <p className="text-muted">The project listing could not be found or has ended.</p>
        <Link to="/projects" className="btn btn-primary-custom">
          Back to Projects
        </Link>
      </div>
    );
  }

  const isFav = favorites.projects?.includes(project.id);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmitProposal) {
      onSubmitProposal({
        projectId: project.id,
        projectTitle: project.title,
        clientName: project.clientName,
        bidAmount,
        deliveryTime,
        proposal: proposalText,
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
      });
    }
    setShowApplyModal(false);
    setProposalText('');
  };

  return (
    <div className="project-details-page pb-5">
      {/* Header */}
      <div className="page-header text-white mb-4">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-2">
              <li className="breadcrumb-item"><Link to="/" className="text-white opacity-75">Home</Link></li>
              <li className="breadcrumb-item"><Link to="/projects" className="text-white opacity-75">Projects</Link></li>
              <li className="breadcrumb-item active text-white" aria-current="page">#{project.id}</li>
            </ol>
          </nav>
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
            <div>
              <span className="badge bg-light text-dark px-3 py-1 mb-2 rounded-pill">
                {project.category}
              </span>
              <h1 className="fw-bold mb-1">{project.title}</h1>
              <p className="opacity-75 mb-0">
                Posted {project.postedTime} · {project.proposals} proposals received
              </p>
            </div>
            <div className="d-flex gap-2">
              <button
                className={`btn ${isFav ? 'btn-danger' : 'btn-outline-light'}`}
                onClick={() => toggleFavorite(project.id, 'project')}
              >
                <i className={`bi ${isFav ? 'bi-heart-fill' : 'bi-heart'} me-1`}></i>
                {isFav ? 'Saved' : 'Save Job'}
              </button>
              <button
                className="btn btn-warning text-dark fw-bold px-4"
                onClick={() => setShowApplyModal(true)}
              >
                <i className="bi bi-send-check me-1"></i> Apply for Project
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row g-4">
          {/* Main Job Details */}
          <div className="col-lg-8 col-12">
            {/* Description */}
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
              <h4 className="fw-bold mb-3">Project Description</h4>
              <p className="text-secondary" style={{ lineHeight: '1.8', whiteSpace: 'pre-line' }}>
                {project.description}
              </p>

              <div className="alert alert-light border mt-3">
                <h6 className="fw-bold mb-2">
                  <i className="bi bi-shield-check text-success me-2"></i>SkillHub Verified Opportunity
                </h6>
                <p className="small text-muted mb-0">
                  Payments are held securely in milestone escrow once awarded. Work with confidence.
                </p>
              </div>
            </div>

            {/* Required Skills */}
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
              <h4 className="fw-bold mb-3">Required Skills & Expertise</h4>
              <div className="d-flex flex-wrap gap-2">
                {project.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="badge bg-primary-soft text-primary-custom border border-primary-subtle py-2 px-3 fs-6 rounded-pill"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Specifications */}
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
              <h4 className="fw-bold mb-3">Project Overview</h4>
              <div className="row g-3">
                <div className="col-md-6 col-12">
                  <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-3">
                    <i className="bi bi-calendar3 fs-3 text-primary-custom"></i>
                    <div>
                      <small className="text-muted d-block">Posted Date</small>
                      <strong>{project.postedDate}</strong>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-3">
                    <i className="bi bi-clock-history fs-3 text-warning"></i>
                    <div>
                      <small className="text-muted d-block">Deadline</small>
                      <strong>{project.deadline}</strong>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-3">
                    <i className="bi bi-bar-chart-steps fs-3 text-info"></i>
                    <div>
                      <small className="text-muted d-block">Experience Level</small>
                      <strong>{project.experience}</strong>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-3">
                    <i className="bi bi-briefcase fs-3 text-success"></i>
                    <div>
                      <small className="text-muted d-block">Job Contract Type</small>
                      <strong>{project.type}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-lg-4 col-12">
            {/* Budget Card */}
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
              <h5 className="fw-bold mb-2">Project Budget</h5>
              <div className="p-3 bg-light rounded-3 mb-3">
                <span className="text-muted small d-block">Client's Proposed Range</span>
                <div className="fs-3 fw-bold text-primary-custom">
                  ₹{project.budget.min.toLocaleString()} – ₹{project.budget.max.toLocaleString()}
                </div>
                <span className="badge bg-secondary-subtle text-dark mt-1">
                  {project.type}
                </span>
              </div>

              <button
                className="btn btn-primary-custom w-100 py-2 fw-semibold"
                onClick={() => setShowApplyModal(true)}
              >
                <i className="bi bi-send me-1"></i> Submit a Proposal
              </button>
            </div>

            {/* Client Info Card */}
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
              <h5 className="fw-bold mb-3">About the Client</h5>
              <div className="d-flex align-items-center gap-3 mb-3">
                <img
                  src={project.clientImage}
                  alt={project.clientName}
                  className="rounded-circle"
                  style={{ width: 60, height: 60, objectFit: 'cover' }}
                />
                <div>
                  <h6 className="fw-bold mb-0">{project.clientName}</h6>
                  <span className="text-muted small">
                    <i className="bi bi-geo-alt me-1"></i>{project.clientLocation}, India
                  </span>
                  <div className="mt-1">
                    <Rating rating={project.clientRating} />
                  </div>
                </div>
              </div>

              <div className="border-top pt-3">
                <div className="d-flex justify-content-between py-1">
                  <span className="text-muted small">Projects Posted</span>
                  <strong className="small">{project.clientProjects} jobs</strong>
                </div>
                <div className="d-flex justify-content-between py-1">
                  <span className="text-muted small">Total Spent</span>
                  <strong className="small text-success">
                    ₹{project.clientSpent.toLocaleString()}
                  </strong>
                </div>
                <div className="d-flex justify-content-between py-1">
                  <span className="text-muted small">Payment Method</span>
                  <span className="badge bg-success-subtle text-success">
                    <i className="bi bi-check-circle me-1"></i>Verified
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content rounded-4 border-0 shadow">
              <div className="modal-header border-0 pb-0">
                <div>
                  <h5 className="modal-title fw-bold">Submit a Proposal</h5>
                  <p className="text-muted small mb-0">{project.title}</p>
                </div>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowApplyModal(false)}
                ></button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="row g-3 mb-3">
                    <div className="col-md-6 col-12">
                      <label className="form-label-custom">Your Bid Amount (₹ INR)</label>
                      <input
                        type="number"
                        className="form-control form-control-custom"
                        placeholder="Enter bid amount"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        required
                      />
                      <small className="text-muted">
                        Client budget: ₹{project.budget.min.toLocaleString()} – ₹{project.budget.max.toLocaleString()}
                      </small>
                    </div>

                    <div className="col-md-6 col-12">
                      <label className="form-label-custom">Estimated Delivery Time</label>
                      <select
                        className="form-select form-select-custom"
                        value={deliveryTime}
                        onChange={(e) => setDeliveryTime(e.target.value)}
                      >
                        <option value="3 days">3 Days</option>
                        <option value="7 days">7 Days</option>
                        <option value="14 days">14 Days</option>
                        <option value="30 days">30 Days</option>
                        <option value="Custom">Custom / Ongoing</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label-custom">Your Proposal / Cover Letter</label>
                    <textarea
                      rows="6"
                      className="form-control form-control-custom"
                      placeholder="Explain why you are the best fit for this project, relevant portfolio examples, and your approach..."
                      value={proposalText}
                      onChange={(e) => setProposalText(e.target.value)}
                      required
                    ></textarea>
                  </div>
                </div>

                <div className="modal-footer border-0 pt-0">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowApplyModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary-custom px-4">
                    <i className="bi bi-send-check me-1"></i> Submit Proposal
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
