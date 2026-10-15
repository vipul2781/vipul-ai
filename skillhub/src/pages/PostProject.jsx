import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const PostProject = ({ onAddProject }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    category: 'Web Development',
    description: '',
    skills: '',
    experience: 'Intermediate',
    minBudget: '',
    maxBudget: '',
    budgetType: 'Fixed Price',
    startDate: '',
    deadline: '',
    additionalReqs: '',
    files: []
  });

  const [showPreview, setShowPreview] = useState(false);
  const [validated, setValidated] = useState(false);

  const categories = [
    'Web Development',
    'Mobile Development',
    'Design',
    'Writing',
    'Marketing',
    'Video Editing',
    'Data Entry'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const fileList = Array.from(e.target.files).map((f) => f.name);
    setFormData((prev) => ({ ...prev, files: [...prev.files, ...fileList] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.minBudget || !formData.maxBudget) {
      setValidated(true);
      return;
    }

    const newProject = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      clientName: "You (Client)",
      clientLocation: "Mumbai",
      clientRating: 5.0,
      clientImage: "https://randomuser.me/api/portraits/men/32.jpg",
      clientProjects: 1,
      clientSpent: 0,
      budget: {
        min: parseInt(formData.minBudget) || 10000,
        max: parseInt(formData.maxBudget) || 25000
      },
      type: formData.budgetType,
      category: formData.category,
      skills: formData.skills.split(',').map((s) => s.trim()).filter(Boolean),
      experience: formData.experience,
      proposals: 0,
      postedTime: "Just now",
      deadline: formData.deadline || "2026-11-30",
      postedDate: new Date().toISOString().split('T')[0]
    };

    if (onAddProject) {
      onAddProject(newProject);
    }

    navigate('/projects');
  };

  return (
    <div className="post-project-page pb-5">
      {/* Header */}
      <div className="page-header text-white mb-4">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-2">
              <li className="breadcrumb-item"><Link to="/" className="text-white opacity-75">Home</Link></li>
              <li className="breadcrumb-item"><Link to="/projects" className="text-white opacity-75">Projects</Link></li>
              <li className="breadcrumb-item active text-white" aria-current="page">Post a Project</li>
            </ol>
          </nav>
          <h1 className="fw-bold mb-2">Post a New Project</h1>
          <p className="opacity-75 mb-0" style={{ maxWidth: '600px' }}>
            Reach thousands of top-rated freelancers across India and globally. Get competitive proposals in hours.
          </p>
        </div>
      </div>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-9 col-12">
            <form onSubmit={handleSubmit} className={validated ? 'was-validated' : ''} noValidate>
              {/* Step 1: Project Info */}
              <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
                <h4 className="fw-bold mb-3">
                  <i className="bi bi-file-earmark-text text-primary-custom me-2"></i>1. Project Information
                </h4>

                <div className="mb-3">
                  <label className="form-label-custom">Project Title *</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control form-control-custom"
                    placeholder="e.g. Build a Responsive E-commerce Website in React"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">Please enter a project title.</div>
                </div>

                <div className="row g-3 mb-3">
                  <div className="col-md-6 col-12">
                    <label className="form-label-custom">Category *</label>
                    <select
                      name="category"
                      className="form-select form-select-custom"
                      value={formData.category}
                      onChange={handleChange}
                      required
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6 col-12">
                    <label className="form-label-custom">Experience Level Required</label>
                    <select
                      name="experience"
                      className="form-select form-select-custom"
                      value={formData.experience}
                      onChange={handleChange}
                    >
                      <option value="Beginner">Beginner (Cost-effective)</option>
                      <option value="Intermediate">Intermediate (Balanced experience)</option>
                      <option value="Expert">Expert (Senior-level talent)</option>
                    </select>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label-custom">Detailed Project Description *</label>
                  <textarea
                    rows="5"
                    name="description"
                    className="form-control form-control-custom"
                    placeholder="Describe your project goals, scope of work, key deliverables, and any technical constraints..."
                    value={formData.description}
                    onChange={handleChange}
                    required
                  ></textarea>
                  <div className="invalid-feedback">Please provide detailed requirements.</div>
                </div>

                <div className="mb-2">
                  <label className="form-label-custom">Required Skills (Comma separated)</label>
                  <input
                    type="text"
                    name="skills"
                    className="form-control form-control-custom"
                    placeholder="e.g. React, Node.js, MongoDB, Tailwind CSS"
                    value={formData.skills}
                    onChange={handleChange}
                  />
                  <small className="text-muted">Separate skills with commas.</small>
                </div>
              </div>

              {/* Step 2: Budget */}
              <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
                <h4 className="fw-bold mb-3">
                  <i className="bi bi-cash-stack text-primary-custom me-2"></i>2. Budget Specifications
                </h4>

                <div className="mb-3">
                  <label className="form-label-custom">Budget Type</label>
                  <div className="d-flex gap-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="budgetType"
                        id="fixedPrice"
                        value="Fixed Price"
                        checked={formData.budgetType === 'Fixed Price'}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="fixedPrice">
                        Fixed Price (Project milestone based)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="budgetType"
                        id="hourly"
                        value="Hourly"
                        checked={formData.budgetType === 'Hourly'}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="hourly">
                        Hourly (Pay for tracked hours)
                      </label>
                    </div>
                  </div>
                </div>

                <div className="row g-3">
                  <div className="col-md-6 col-12">
                    <label className="form-label-custom">Minimum Budget (₹ INR) *</label>
                    <input
                      type="number"
                      name="minBudget"
                      className="form-control form-control-custom"
                      placeholder="e.g. 15000"
                      value={formData.minBudget}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 col-12">
                    <label className="form-label-custom">Maximum Budget (₹ INR) *</label>
                    <input
                      type="number"
                      name="maxBudget"
                      className="form-control form-control-custom"
                      placeholder="e.g. 35000"
                      value={formData.maxBudget}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Timeline & Requirements */}
              <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
                <h4 className="fw-bold mb-3">
                  <i className="bi bi-calendar-event text-primary-custom me-2"></i>3. Timeline & Additional Details
                </h4>

                <div className="row g-3 mb-3">
                  <div className="col-md-6 col-12">
                    <label className="form-label-custom">Expected Start Date</label>
                    <input
                      type="date"
                      name="startDate"
                      className="form-control form-control-custom"
                      value={formData.startDate}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6 col-12">
                    <label className="form-label-custom">Project Deadline</label>
                    <input
                      type="date"
                      name="deadline"
                      className="form-control form-control-custom"
                      value={formData.deadline}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label-custom">Additional Requirements / Notes</label>
                  <textarea
                    rows="3"
                    name="additionalReqs"
                    className="form-control form-control-custom"
                    placeholder="Specify NDA requirements, time zones, communication preference (Slack, Zoom)..."
                    value={formData.additionalReqs}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="mb-2">
                  <label className="form-label-custom">Project Attachments / Specs</label>
                  <div className="file-upload-area position-relative">
                    <i className="bi bi-cloud-arrow-up"></i>
                    <h6 className="fw-bold mb-1">Drag and drop files here, or click to browse</h6>
                    <p className="text-muted small mb-0">Supports PDF, DOCX, PNG, JPG (up to 25MB)</p>
                    <input
                      type="file"
                      multiple
                      className="position-absolute top-0 start-0 w-100 h-100 opacity-0 cursor-pointer"
                      onChange={handleFileChange}
                    />
                  </div>
                  {formData.files.length > 0 && (
                    <div className="mt-2 d-flex flex-wrap gap-2">
                      {formData.files.map((f, i) => (
                        <span key={i} className="badge bg-light text-dark border p-2">
                          <i className="bi bi-paperclip me-1"></i>{f}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="d-flex justify-content-between align-items-center">
                <button
                  type="button"
                  className="btn btn-outline-custom"
                  onClick={() => setShowPreview(true)}
                >
                  <i className="bi bi-eye me-1"></i> Preview Project
                </button>

                <div className="d-flex gap-2">
                  <Link to="/projects" className="btn btn-outline-secondary">
                    Cancel
                  </Link>
                  <button type="submit" className="btn btn-primary-custom px-4">
                    <i className="bi bi-check-circle me-1"></i> Post Project
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content rounded-4 border-0 shadow">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold">Project Preview</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowPreview(false)}
                ></button>
              </div>
              <div className="modal-body">
                <span className="badge bg-primary-soft text-primary-custom mb-2">{formData.category}</span>
                <h4 className="fw-bold mb-2">{formData.title || 'Untitled Project'}</h4>
                <div className="text-primary-custom fw-bold fs-5 mb-3">
                  ₹{Number(formData.minBudget || 0).toLocaleString()} – ₹{Number(formData.maxBudget || 0).toLocaleString()} ({formData.budgetType})
                </div>
                <h6 className="fw-bold">Description</h6>
                <p className="text-secondary small mb-3">{formData.description || 'No description provided yet.'}</p>
                <h6 className="fw-bold">Required Skills</h6>
                <div className="d-flex flex-wrap gap-1 mb-3">
                  {formData.skills ? (
                    formData.skills.split(',').map((s, i) => (
                      <span key={i} className="badge bg-light text-dark border">{s.trim()}</span>
                    ))
                  ) : (
                    <span className="text-muted small">None specified</span>
                  )}
                </div>
                <div className="row g-2 small text-muted">
                  <div className="col-6">Experience: <strong>{formData.experience}</strong></div>
                  <div className="col-6">Deadline: <strong>{formData.deadline || 'Flexible'}</strong></div>
                </div>
              </div>
              <div className="modal-footer border-0 pt-0">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPreview(false)}
                >
                  Close Preview
                </button>
                <button
                  type="button"
                  className="btn btn-primary-custom"
                  onClick={(e) => {
                    setShowPreview(false);
                    handleSubmit(e);
                  }}
                >
                  Looks Good, Post It!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostProject;
