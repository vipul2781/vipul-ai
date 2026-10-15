import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForum } from '../context/ForumContext';

const CreateCommunity = () => {
  const { addCommunity } = useForum();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Technology');
  const [privacy, setPrivacy] = useState('Public');
  const [iconUrl, setIconUrl] = useState(
    'https://images.unsplash.com/photo-1547658719-da2b51169166?w=150&auto=format&fit=crop&q=80'
  );
  const [coverUrl, setCoverUrl] = useState(
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80'
  );

  const [rules, setRules] = useState([
    'Be respectful and courteous to all members.',
    'No spam, self-promotion, or unsolicited advertising.',
    'Stay on topic and format code snippets properly.'
  ]);
  const [newRuleInput, setNewRuleInput] = useState('');

  // Preview Modal
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const handleAddRule = (e) => {
    e.preventDefault();
    if (newRuleInput.trim()) {
      setRules([...rules, newRuleInput.trim()]);
      setNewRuleInput('');
    }
  };

  const handleRemoveRule = (index) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  const handleIconUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setIconUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleCoverUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCoverUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = () => {
    const communityData = {
      name,
      description,
      category,
      privacy,
      icon: iconUrl,
      coverImage: coverUrl,
      rules,
      tagline: `r/${name.replace(/\s+/g, '')}`
    };

    const newCommunity = addCommunity(communityData);
    setShowPreviewModal(false);
    navigate(`/communities/${newCommunity.id}`);
  };

  return (
    <div className="create-community-page py-5">
      <div className="container" style={{ maxWidth: '820px' }}>
        <div className="mb-4">
          <span className="badge bg-primary bg-opacity-10 text-primary border border-primary-subtle px-3 py-1 rounded-pill fw-semibold mb-2">
            Community Architect
          </span>
          <h1 className="h2 fw-bold text-dark mb-1">Create a Community</h1>
          <p className="text-secondary small mb-0">
            Build a dedicated home for your passion, topic, project, or group on DiscussHub.
          </p>
        </div>

        <div className="card border rounded-4 shadow-sm bg-white p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setShowPreviewModal(true);
            }}
          >
            {/* Community Name */}
            <div className="mb-4">
              <label className="form-label fw-bold small text-dark">
                Community Name <span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light text-muted fw-bold">r/</span>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="e.g. React Developers"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <span className="small text-muted mt-1 d-block">
                Names cannot be changed after creation.
              </span>
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="form-label fw-bold small text-dark">
                Community Description <span className="text-danger">*</span>
              </label>
              <textarea
                className="form-control"
                rows="4"
                placeholder="What is this community about? Explain what topics are discussed and who should join..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>

            {/* Category & Privacy */}
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <label className="form-label fw-bold small text-dark">Category</label>
                <select
                  className="form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Technology">Technology</option>
                  <option value="Programming">Programming</option>
                  <option value="Gaming">Gaming</option>
                  <option value="Education">Education</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Science">Science</option>
                  <option value="Photography">Photography</option>
                  <option value="Music">Music</option>
                  <option value="Sports">Sports</option>
                  <option value="Lifestyle">Lifestyle</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold small text-dark">Privacy</label>
                <div className="d-flex gap-3 pt-2">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="privacy"
                      id="privacyPublic"
                      value="Public"
                      checked={privacy === 'Public'}
                      onChange={() => setPrivacy('Public')}
                    />
                    <label className="form-check-label small fw-semibold" htmlFor="privacyPublic">
                      Public (Anyone can view &amp; post)
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="privacy"
                      id="privacyPrivate"
                      value="Private"
                      checked={privacy === 'Private'}
                      onChange={() => setPrivacy('Private')}
                    />
                    <label className="form-check-label small fw-semibold" htmlFor="privacyPrivate">
                      Private (Approved only)
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Uploads: Icon & Cover */}
            <div className="row g-4 mb-4">
              <div className="col-md-6">
                <label className="form-label fw-bold small text-dark">Community Icon</label>
                <div className="d-flex align-items-center gap-3 p-3 border rounded-3 bg-light">
                  <img
                    src={iconUrl}
                    alt="Icon Preview"
                    className="rounded-circle border"
                    style={{ width: '54px', height: '54px', objectFit: 'cover' }}
                  />
                  <div>
                    <input
                      type="file"
                      id="iconUpload"
                      className="d-none"
                      accept="image/*"
                      onChange={handleIconUpload}
                    />
                    <label htmlFor="iconUpload" className="btn btn-sm btn-outline-primary-custom mb-1">
                      Upload Icon
                    </label>
                    <div className="text-muted small" style={{ fontSize: '0.75rem' }}>
                      Recommended: 120x120px
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold small text-dark">Banner Cover Image</label>
                <div className="p-3 border rounded-3 bg-light">
                  <div
                    className="rounded-2 mb-2"
                    style={{
                      height: '54px',
                      backgroundImage: `url(${coverUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  ></div>
                  <input
                    type="file"
                    id="coverUpload"
                    className="d-none"
                    accept="image/*"
                    onChange={handleCoverUpload}
                  />
                  <label htmlFor="coverUpload" className="btn btn-sm btn-outline-primary-custom">
                    Upload Banner
                  </label>
                </div>
              </div>
            </div>

            {/* Community Rules Builder */}
            <div className="mb-4">
              <label className="form-label fw-bold small text-dark d-flex align-items-center gap-1">
                <i className="bi bi-file-earmark-ruled text-primary"></i>
                <span>Community Rules</span>
              </label>

              <div className="input-group mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter a community rule (e.g. Be respectful)..."
                  value={newRuleInput}
                  onChange={(e) => setNewRuleInput(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={handleAddRule}
                >
                  Add Rule
                </button>
              </div>

              <ul className="list-group list-group-flush border rounded-3">
                {rules.map((rule, idx) => (
                  <li
                    key={idx}
                    className="list-group-item d-flex justify-content-between align-items-center py-2"
                  >
                    <span className="small text-dark">
                      <strong>{idx + 1}.</strong> {rule}
                    </span>
                    <button
                      type="button"
                      className="btn btn-sm btn-link text-danger p-0"
                      onClick={() => handleRemoveRule(idx)}
                      title="Remove rule"
                    >
                      <i className="bi bi-x-circle"></i>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions: Preview & Create */}
            <div className="d-flex justify-content-between align-items-center pt-3 border-top">
              <button
                type="button"
                className="btn btn-light border"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>

              <div className="d-flex gap-2">
                <button
                  type="button"
                  className="btn btn-outline-primary-custom"
                  onClick={() => setShowPreviewModal(true)}
                  disabled={!name.trim() || !description.trim()}
                >
                  <i className="bi bi-eye me-1"></i>Preview
                </button>

                <button
                  type="button"
                  className="btn btn-primary-custom px-4"
                  onClick={handleSubmit}
                  disabled={!name.trim() || !description.trim()}
                >
                  <i className="bi bi-plus-lg me-1"></i>Create Community
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Bootstrap Preview Modal */}
      {showPreviewModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content rounded-4 border-0 shadow overflow-hidden">
              <div
                style={{
                  height: '140px',
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.7)), url(${coverUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>
              <div className="modal-body p-4 pt-0 position-relative">
                <img
                  src={iconUrl}
                  alt="avatar"
                  className="rounded-circle border border-4 border-white shadow-sm"
                  style={{ width: '70px', height: '70px', marginTop: '-35px', objectFit: 'cover' }}
                />
                <h4 className="fw-bold mt-2 mb-1">{name || 'New Community'}</h4>
                <p className="text-muted small mb-2">r/{name.replace(/\s+/g, '')} • {category} • {privacy}</p>
                <p className="text-secondary small mb-3">{description}</p>

                <h6 className="fw-bold small text-dark mb-2">Rules ({rules.length})</h6>
                <ol className="small text-secondary ps-3 mb-0">
                  {rules.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ol>
              </div>
              <div className="modal-footer border-top bg-light">
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => setShowPreviewModal(false)}
                >
                  Edit Information
                </button>
                <button
                  type="button"
                  className="btn btn-primary-custom btn-sm px-4"
                  onClick={handleSubmit}
                >
                  Confirm &amp; Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCommunity;
