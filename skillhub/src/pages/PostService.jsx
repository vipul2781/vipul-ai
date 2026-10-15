import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const PostService = ({ onAddService }) => {
  const navigate = useNavigate();

  const [serviceData, setServiceData] = useState({
    title: '',
    category: 'Development',
    description: '',
    skills: '',
    requirements: '',
    image: '',
    basicPrice: '2000',
    basicDelivery: '3 days',
    basicRevisions: '2',
    standardPrice: '6000',
    standardDelivery: '5 days',
    standardRevisions: '5',
    premiumPrice: '12000',
    premiumDelivery: '7 days',
    premiumRevisions: 'Unlimited'
  });

  const [showPreview, setShowPreview] = useState(false);
  const [imagePreview, setImagePreview] = useState('https://picsum.photos/seed/newsvc/800/500');

  const categories = ['Development', 'Design', 'Writing', 'Marketing', 'Video', 'Business'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServiceData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setServiceData((prev) => ({ ...prev, image: url }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!serviceData.title || !serviceData.description) {
      alert('Please fill out the service title and description.');
      return;
    }

    const newService = {
      id: Date.now(),
      title: serviceData.title,
      description: serviceData.description,
      freelancerId: 999,
      freelancerName: "You (Freelancer)",
      freelancerImage: "https://randomuser.me/api/portraits/men/33.jpg",
      freelancerLevel: "Rising Talent",
      responseTime: "1 hour",
      category: serviceData.category,
      rating: 5.0,
      reviews: 1,
      image: imagePreview,
      gallery: [imagePreview],
      packages: {
        basic: {
          name: "Basic",
          price: parseInt(serviceData.basicPrice) || 2000,
          delivery: serviceData.basicDelivery,
          revisions: serviceData.basicRevisions,
          pages: 1,
          features: ["Core Deliverable", `${serviceData.basicRevisions} Revisions`, "Standard Support"]
        },
        standard: {
          name: "Standard",
          price: parseInt(serviceData.standardPrice) || 6000,
          delivery: serviceData.standardDelivery,
          revisions: serviceData.standardRevisions,
          pages: 5,
          features: ["Full Deliverable", `${serviceData.standardRevisions} Revisions`, "Source Code", "Priority Support"]
        },
        premium: {
          name: "Premium",
          price: parseInt(serviceData.premiumPrice) || 12000,
          delivery: serviceData.premiumDelivery,
          revisions: serviceData.premiumRevisions,
          pages: 10,
          features: ["Everything in Standard", "Unlimited Revisions", "Commercial Rights", "24/7 Dedicated Support"]
        }
      }
    };

    if (onAddService) {
      onAddService(newService);
    }

    navigate('/services');
  };

  return (
    <div className="post-service-page pb-5">
      {/* Header */}
      <div className="page-header text-white mb-4">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-2">
              <li className="breadcrumb-item"><Link to="/" className="text-white opacity-75">Home</Link></li>
              <li className="breadcrumb-item"><Link to="/services" className="text-white opacity-75">Services</Link></li>
              <li className="breadcrumb-item active text-white" aria-current="page">Offer a Service</li>
            </ol>
          </nav>
          <h1 className="fw-bold mb-2">Create & Publish a Service</h1>
          <p className="opacity-75 mb-0" style={{ maxWidth: '600px' }}>
            Showcase your offering with 3 clear pricing tiers, set your timelines, and start receiving direct orders.
          </p>
        </div>
      </div>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-9 col-12">
            <form onSubmit={handleSubmit}>
              {/* Section 1: Overview */}
              <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
                <h4 className="fw-bold mb-3">
                  <i className="bi bi-info-circle text-primary-custom me-2"></i>1. Service Information
                </h4>

                <div className="mb-3">
                  <label className="form-label-custom">Service Title *</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control form-control-custom"
                    placeholder="e.g. Build a Modern Responsive React Website"
                    value={serviceData.title}
                    onChange={handleChange}
                    required
                  />
                  <small className="text-muted">A clear, engaging title that explains what you will deliver.</small>
                </div>

                <div className="row g-3 mb-3">
                  <div className="col-md-6 col-12">
                    <label className="form-label-custom">Category *</label>
                    <select
                      name="category"
                      className="form-select form-select-custom"
                      value={serviceData.category}
                      onChange={handleChange}
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6 col-12">
                    <label className="form-label-custom">Tags / Skills</label>
                    <input
                      type="text"
                      name="skills"
                      className="form-control form-control-custom"
                      placeholder="e.g. React, Bootstrap, Web Design"
                      value={serviceData.skills}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label-custom">Detailed Service Description *</label>
                  <textarea
                    rows="5"
                    name="description"
                    className="form-control form-control-custom"
                    placeholder="Describe what clients will receive, your unique approach, software tools used, and what sets you apart..."
                    value={serviceData.description}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div className="mb-2">
                  <label className="form-label-custom">Requirements from Buyer</label>
                  <textarea
                    rows="3"
                    name="requirements"
                    className="form-control form-control-custom"
                    placeholder="List all instructions, brand assets, credentials, or reference links you need to get started..."
                    value={serviceData.requirements}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>

              {/* Section 2: 3-Tier Pricing Packages */}
              <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
                <h4 className="fw-bold mb-3">
                  <i className="bi bi-tag text-primary-custom me-2"></i>2. 3-Tier Pricing Packages
                </h4>

                <div className="row g-3">
                  {/* Basic */}
                  <div className="col-md-4 col-12">
                    <div className="border rounded-3 p-3 bg-light h-100">
                      <h6 className="fw-bold text-primary-custom">Basic Tier</h6>
                      <div className="mb-2">
                        <label className="form-label small mb-1 fw-semibold">Price (₹ INR)</label>
                        <input
                          type="number"
                          name="basicPrice"
                          className="form-control form-control-sm"
                          value={serviceData.basicPrice}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-2">
                        <label className="form-label small mb-1 fw-semibold">Delivery Time</label>
                        <input
                          type="text"
                          name="basicDelivery"
                          className="form-control form-control-sm"
                          value={serviceData.basicDelivery}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-2">
                        <label className="form-label small mb-1 fw-semibold">Revisions</label>
                        <input
                          type="text"
                          name="basicRevisions"
                          className="form-control form-control-sm"
                          value={serviceData.basicRevisions}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Standard */}
                  <div className="col-md-4 col-12">
                    <div className="border border-primary rounded-3 p-3 bg-white h-100 shadow-sm">
                      <div className="d-flex justify-content-between align-items-center">
                        <h6 className="fw-bold text-primary-custom mb-0">Standard Tier</h6>
                        <span className="badge bg-primary-soft text-primary-custom small">Recommended</span>
                      </div>
                      <div className="mb-2 mt-2">
                        <label className="form-label small mb-1 fw-semibold">Price (₹ INR)</label>
                        <input
                          type="number"
                          name="standardPrice"
                          className="form-control form-control-sm"
                          value={serviceData.standardPrice}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-2">
                        <label className="form-label small mb-1 fw-semibold">Delivery Time</label>
                        <input
                          type="text"
                          name="standardDelivery"
                          className="form-control form-control-sm"
                          value={serviceData.standardDelivery}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-2">
                        <label className="form-label small mb-1 fw-semibold">Revisions</label>
                        <input
                          type="text"
                          name="standardRevisions"
                          className="form-control form-control-sm"
                          value={serviceData.standardRevisions}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Premium */}
                  <div className="col-md-4 col-12">
                    <div className="border rounded-3 p-3 bg-light h-100">
                      <h6 className="fw-bold text-primary-custom">Premium Tier</h6>
                      <div className="mb-2">
                        <label className="form-label small mb-1 fw-semibold">Price (₹ INR)</label>
                        <input
                          type="number"
                          name="premiumPrice"
                          className="form-control form-control-sm"
                          value={serviceData.premiumPrice}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-2">
                        <label className="form-label small mb-1 fw-semibold">Delivery Time</label>
                        <input
                          type="text"
                          name="premiumDelivery"
                          className="form-control form-control-sm"
                          value={serviceData.premiumDelivery}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-2">
                        <label className="form-label small mb-1 fw-semibold">Revisions</label>
                        <input
                          type="text"
                          name="premiumRevisions"
                          className="form-control form-control-sm"
                          value={serviceData.premiumRevisions}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Gallery / Media */}
              <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
                <h4 className="fw-bold mb-3">
                  <i className="bi bi-images text-primary-custom me-2"></i>3. Service Image & Showcase
                </h4>

                <div className="row align-items-center g-3">
                  <div className="col-md-7 col-12">
                    <div className="file-upload-area position-relative">
                      <i className="bi bi-image"></i>
                      <h6 className="fw-bold mb-1">Upload Service Cover Image</h6>
                      <p className="text-muted small mb-0">Recommended size: 800x500 px. PNG, JPG or WEBP.</p>
                      <input
                        type="file"
                        accept="image/*"
                        className="position-absolute top-0 start-0 w-100 h-100 opacity-0 cursor-pointer"
                        onChange={handleImageChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-5 col-12 text-center">
                    <label className="form-label-custom d-block">Image Preview</label>
                    <img
                      src={imagePreview}
                      alt="Service Preview"
                      className="img-fluid rounded-3 shadow-sm border"
                      style={{ maxHeight: '160px', objectFit: 'cover' }}
                    />
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="d-flex justify-content-between align-items-center">
                <button
                  type="button"
                  className="btn btn-outline-custom"
                  onClick={() => setShowPreview(true)}
                >
                  <i className="bi bi-eye me-1"></i> Preview Service
                </button>

                <div className="d-flex gap-2">
                  <Link to="/services" className="btn btn-outline-secondary">
                    Cancel
                  </Link>
                  <button type="submit" className="btn btn-primary-custom px-4">
                    <i className="bi bi-check-circle me-1"></i> Publish Service
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
                <h5 className="modal-title fw-bold">Service Preview</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowPreview(false)}
                ></button>
              </div>
              <div className="modal-body">
                <img
                  src={imagePreview}
                  alt="preview"
                  className="w-100 rounded-3 mb-3"
                  style={{ maxHeight: '250px', objectFit: 'cover' }}
                />
                <span className="badge bg-primary-soft text-primary-custom mb-2">{serviceData.category}</span>
                <h4 className="fw-bold mb-2">{serviceData.title || 'Untitled Service'}</h4>
                <p className="text-secondary small">{serviceData.description || 'No description provided.'}</p>
                <div className="row g-2 mt-2">
                  <div className="col-4 border rounded p-2 text-center">
                    <small className="text-muted d-block">Basic</small>
                    <strong className="text-primary-custom">₹{serviceData.basicPrice}</strong>
                    <div className="small text-muted">{serviceData.basicDelivery}</div>
                  </div>
                  <div className="col-4 border border-primary rounded p-2 text-center">
                    <small className="text-muted d-block">Standard</small>
                    <strong className="text-primary-custom">₹{serviceData.standardPrice}</strong>
                    <div className="small text-muted">{serviceData.standardDelivery}</div>
                  </div>
                  <div className="col-4 border rounded p-2 text-center">
                    <small className="text-muted d-block">Premium</small>
                    <strong className="text-primary-custom">₹{serviceData.premiumPrice}</strong>
                    <div className="small text-muted">{serviceData.premiumDelivery}</div>
                  </div>
                </div>
              </div>
              <div className="modal-footer border-0 pt-0">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPreview(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary-custom"
                  onClick={(e) => {
                    setShowPreview(false);
                    handleSubmit(e);
                  }}
                >
                  Confirm & Publish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostService;
