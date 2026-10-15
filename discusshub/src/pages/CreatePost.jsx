import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Tag from '../components/Tag';
import { useForum } from '../context/ForumContext';

const CreatePost = () => {
  const { communities, addPost } = useForum();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const defaultCommunity = searchParams.get('community') || (communities[0]?.id ?? 'reactdevs');

  const [communityId, setCommunityId] = useState(defaultCommunity);
  const [title, setTitle] = useState('');
  const [postType, setPostType] = useState('Discussion');
  const [content, setContent] = useState('');
  const [codeSnippet, setCodeSnippet] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState(['React', 'WebDev']);
  const [selectedImages, setSelectedImages] = useState([]);

  // Poll state
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState(['Option 1', 'Option 2', 'Option 3']);

  // Preview Modal
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const handleAddTag = (e) => {
    e.preventDefault();
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim().replace(/^#/, '')]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleAddPollOption = () => {
    if (pollOptions.length < 6) {
      setPollOptions([...pollOptions, `Option ${pollOptions.length + 1}`]);
    }
  };

  const handlePollOptionChange = (index, value) => {
    const updated = [...pollOptions];
    updated[index] = value;
    setPollOptions(updated);
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    const newImageUrls = files.map((file) => URL.createObjectURL(file));
    setSelectedImages((prev) => [...prev, ...newImageUrls]);
  };

  const handlePublish = () => {
    const targetCommunity = communities.find((c) => c.id === communityId) || communities[0];

    const postPayload = {
      title,
      content,
      postType,
      communityId: targetCommunity.id,
      communityName: targetCommunity.name,
      communityTag: targetCommunity.tagline || `r/${targetCommunity.name.replace(/\s+/g, '')}`,
      communityIcon: targetCommunity.icon,
      category: targetCommunity.category,
      tags,
      image: selectedImages[0] || null,
      codeSnippet: codeSnippet.trim() ? codeSnippet : null,
      pollData:
        postType === 'Poll'
          ? {
            question: pollQuestion || title,
            options: pollOptions.map((opt) => ({ text: opt, votes: 0 }))
          }
          : null
    };

    const created = addPost(postPayload);
    setShowPreviewModal(false);
    navigate(`/posts/${created.id}`);
  };

  return (
    <div className="create-post-page py-5">
      <div className="container" style={{ maxWidth: '820px' }}>
        <div className="mb-4">
          <span className="badge bg-primary bg-opacity-10 text-primary border border-primary-subtle px-3 py-1 rounded-pill fw-semibold mb-2">
            Share with the World
          </span>
          <h1 className="h2 fw-bold text-dark mb-1">Create a Discussion</h1>
          <p className="text-secondary small mb-0">
            Publish your insights, questions, code, or surveys across our communities.
          </p>
        </div>

        <div className="card border rounded-4 shadow-sm bg-white p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setShowPreviewModal(true);
            }}
          >
            {/* Community Selection */}
            <div className="mb-4">
              <label className="form-label fw-bold small text-dark">
                Select Community <span className="text-danger">*</span>
              </label>
              <select
                className="form-select form-select-lg"
                value={communityId}
                onChange={(e) => setCommunityId(e.target.value)}
                required
              >
                {communities.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Post Type Buttons */}
            <div className="mb-4">
              <label className="form-label fw-bold small text-dark d-block">Post Type</label>
              <div className="d-flex flex-wrap gap-2">
                {['Discussion', 'Question', 'Poll', 'Announcement', 'Showcase'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    className={`btn btn-sm rounded-pill px-3 py-2 fw-semibold ${postType === type ? 'btn-primary-custom shadow-sm' : 'btn-light border'
                      }`}
                    onClick={() => setPostType(type)}
                  >
                    {type === 'Discussion' && <i className="bi bi-chat-text me-1"></i>}
                    {type === 'Question' && <i className="bi bi-question-circle me-1"></i>}
                    {type === 'Poll' && <i className="bi bi-bar-chart me-1"></i>}
                    {type === 'Announcement' && <i className="bi bi-megaphone me-1"></i>}
                    {type === 'Showcase' && <i className="bi bi-stars me-1"></i>}
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Post Title */}
            <div className="mb-4">
              <label className="form-label fw-bold small text-dark">
                Title <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Give your discussion an engaging, descriptive title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                maxLength={200}
              />
              <span className="small text-muted float-end mt-1">{title.length}/200</span>
            </div>

            {/* Content Textarea */}
            <div className="mb-4">
              <label className="form-label fw-bold small text-dark">
                Content Details <span className="text-danger">*</span>
              </label>
              <textarea
                className="form-control"
                rows="6"
                placeholder="Write your discussion details, background context, or instructions..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              ></textarea>
            </div>

            {/* Code Snippet Option */}
            <div className="mb-4">
              <label className="form-label fw-bold small text-dark d-flex align-items-center gap-1">
                <i className="bi bi-code-slash text-primary"></i>
                <span>Optional Code Snippet</span>
              </label>
              <textarea
                className="form-control font-monospace"
                style={{ fontSize: '0.85rem' }}
                rows="4"
                placeholder="// Paste code or config here..."
                value={codeSnippet}
                onChange={(e) => setCodeSnippet(e.target.value)}
              ></textarea>
            </div>

            {/* Poll Option Builder (Conditional) */}
            {postType === 'Poll' && (
              <div className="card border rounded-3 p-3 bg-light mb-4">
                <h6 className="fw-bold mb-3 d-flex align-items-center gap-1">
                  <i className="bi bi-bar-chart-fill text-primary"></i>
                  <span>Poll Questions &amp; Options</span>
                </h6>
                <div className="mb-3">
                  <label className="form-label small text-muted">Poll Question</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Which tool do you prefer?"
                    value={pollQuestion}
                    onChange={(e) => setPollQuestion(e.target.value)}
                  />
                </div>
                <div className="d-flex flex-column gap-2 mb-3">
                  {pollOptions.map((opt, idx) => (
                    <div key={idx} className="input-group">
                      <span className="input-group-text bg-white">{idx + 1}</span>
                      <input
                        type="text"
                        className="form-control"
                        value={opt}
                        onChange={(e) => handlePollOptionChange(idx, e.target.value)}
                        placeholder={`Option ${idx + 1}`}
                        required
                      />
                    </div>
                  ))}
                </div>
                {pollOptions.length < 6 && (
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary-custom"
                    onClick={handleAddPollOption}
                  >
                    <i className="bi bi-plus me-1"></i>Add Option
                  </button>
                )}
              </div>
            )}

            {/* Tags Input */}
            <div className="mb-4">
              <label className="form-label fw-bold small text-dark">Topic Tags</label>
              <div className="input-group mb-2">
                <span className="input-group-text bg-light text-muted">#</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. React, TypeScript, Performance (press Add)"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={handleAddTag}
                >
                  Add Tag
                </button>
              </div>

              {/* Removable badges */}
              <div className="d-flex flex-wrap gap-1">
                {tags.map((tag) => (
                  <Tag key={tag} name={tag} onRemove={handleRemoveTag} />
                ))}
              </div>
            </div>

            {/* Visual Image Upload Area */}
            <div className="mb-4">
              <label className="form-label fw-bold small text-dark">Attach Images</label>
              <div className="border border-dashed rounded-4 p-4 text-center bg-light">
                <i className="bi bi-cloud-arrow-up text-primary fs-1 mb-2 d-block"></i>
                <h6 className="fw-bold mb-1">Click to upload or drag images here</h6>
                <p className="small text-muted mb-3">PNG, JPG, or WEBP supported</p>
                <input
                  type="file"
                  id="imageUploadInput"
                  multiple
                  accept="image/*"
                  className="d-none"
                  onChange={handleImageSelect}
                />
                <label htmlFor="imageUploadInput" className="btn btn-sm btn-outline-primary-custom">
                  Browse Files
                </label>

                {/* Thumbnails preview */}
                {selectedImages.length > 0 && (
                  <div className="d-flex flex-wrap gap-2 mt-3 justify-content-center">
                    {selectedImages.map((src, idx) => (
                      <div key={idx} className="position-relative">
                        <img
                          src={src}
                          alt="thumbnail"
                          className="rounded-3 border"
                          style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                        />
                        <button
                          type="button"
                          className="btn-close position-absolute top-0 end-0 bg-white rounded-circle p-1 shadow-sm"
                          style={{ width: '0.4rem', height: '0.4rem' }}
                          onClick={() =>
                            setSelectedImages(selectedImages.filter((_, i) => i !== idx))
                          }
                        ></button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Buttons: Preview & Publish */}
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
                  disabled={!title.trim() || !content.trim()}
                >
                  <i className="bi bi-eye me-1"></i>Preview Post
                </button>

                <button
                  type="button"
                  className="btn btn-primary-custom px-4"
                  onClick={handlePublish}
                  disabled={!title.trim() || !content.trim()}
                >
                  <i className="bi bi-send me-1"></i>Publish
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
            <div className="modal-content rounded-4 border-0 shadow">
              <div className="modal-header border-bottom">
                <h5 className="modal-title fw-bold text-dark d-flex align-items-center gap-2">
                  <i className="bi bi-eye-fill text-primary"></i>
                  <span>Post Preview</span>
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowPreviewModal(false)}
                ></button>
              </div>

              <div className="modal-body p-4">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <span className="badge bg-primary-subtle text-primary">
                    {communities.find((c) => c.id === communityId)?.name || 'Community'}
                  </span>
                  <span className="badge bg-light text-secondary border">{postType}</span>
                </div>

                <h3 className="h4 fw-bold text-dark mb-3">{title || 'Untitled Post'}</h3>

                <div className="text-secondary small mb-3" style={{ whiteSpace: 'pre-wrap' }}>
                  {content || 'No content provided.'}
                </div>

                {codeSnippet && (
                  <div className="code-box mb-3 py-2 px-3">
                    <pre className="m-0" style={{ fontSize: '0.85rem' }}>
                      <code>{codeSnippet}</code>
                    </pre>
                  </div>
                )}

                {selectedImages.length > 0 && (
                  <div className="mb-3">
                    <img
                      src={selectedImages[0]}
                      alt="preview"
                      className="rounded-3 w-100"
                      style={{ maxHeight: '250px', objectFit: 'cover' }}
                    />
                  </div>
                )}

                {tags.length > 0 && (
                  <div className="d-flex flex-wrap gap-1">
                    {tags.map((t) => (
                      <Tag key={t} name={t} clickable={false} />
                    ))}
                  </div>
                )}
              </div>

              <div className="modal-footer border-top bg-light rounded-bottom-4">
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => setShowPreviewModal(false)}
                >
                  <i className="bi bi-pencil me-1"></i>Continue Editing
                </button>
                <button
                  type="button"
                  className="btn btn-primary-custom btn-sm px-4"
                  onClick={handlePublish}
                >
                  <i className="bi bi-check-lg me-1"></i>Publish Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
