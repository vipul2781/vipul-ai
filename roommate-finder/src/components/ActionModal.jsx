import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const ActionModal = () => {
  const { modalData, closeModal, showToast } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    authEmail: '',
    authPass: ''
  });

  if (!modalData.isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalData.type === 'contact-owner') {
      showToast(`Inquiry sent to property owner for ${modalData.targetName}!`, 'success', 'bi-envelope-check-fill');
    } else if (modalData.type === 'send-message') {
      showToast(`Message sent successfully to ${modalData.targetName}!`, 'success', 'bi-send-check-fill');
    } else if (modalData.type === 'connect') {
      showToast(`Connection request sent to ${modalData.targetName}!`, 'success', 'bi-person-check-fill');
    } else if (modalData.type === 'auth-login') {
      showToast('Logged in successfully! Welcome back.', 'success', 'bi-check-circle-fill');
    } else if (modalData.type === 'auth-signup') {
      showToast('Account created! Welcome to RoomMate.', 'success', 'bi-stars');
    }
    closeModal();
  };

  return (
    <div className="custom-modal-backdrop" onClick={closeModal}>
      <div className="custom-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center p-4 border-bottom bg-light">
          <div>
            <h5 className="modal-title fw-bold text-dark mb-0">{modalData.title}</h5>
            {modalData.targetName && (
              <span className="text-primary-custom small fw-semibold">
                {modalData.targetName}
              </span>
            )}
          </div>
          <button
            type="button"
            className="btn-close shadow-none"
            aria-label="Close"
            onClick={closeModal}
          ></button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-4">
          {(modalData.type === 'contact-owner' || modalData.type === 'send-message' || modalData.type === 'connect') && (
            <>
              <div className="mb-3">
                <label className="form-label small fw-bold text-secondary">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Akash Patel"
                  className="form-control rounded-3 shadow-none"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="row g-2 mb-3">
                <div className="col-6">
                  <label className="form-label small fw-bold text-secondary">Your Phone</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    className="form-control rounded-3 shadow-none"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="col-6">
                  <label className="form-label small fw-bold text-secondary">Your Email</label>
                  <input
                    type="email"
                    required
                    placeholder="akash@example.com"
                    className="form-control rounded-3 shadow-none"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold text-secondary">
                  {modalData.type === 'connect' ? 'Introduction / Connection Note' : 'Message'}
                </label>
                <textarea
                  rows="3"
                  required
                  placeholder={
                    modalData.type === 'connect'
                      ? 'Hi! I saw your profile and our preferences match. I would love to connect and chat about teaming up for a flat.'
                      : 'Hello, I am interested in this room listing. Could we schedule a visit this weekend?'
                  }
                  className="form-control rounded-3 shadow-none"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>
            </>
          )}

          {(modalData.type === 'auth-login' || modalData.type === 'auth-signup') && (
            <>
              {modalData.type === 'auth-signup' && (
                <div className="mb-3">
                  <label className="form-label small fw-bold text-secondary">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    className="form-control rounded-3 shadow-none"
                  />
                </div>
              )}
              <div className="mb-3">
                <label className="form-label small fw-bold text-secondary">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  className="form-control rounded-3 shadow-none"
                  value={formData.authEmail}
                  onChange={(e) => setFormData({ ...formData, authEmail: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label small fw-bold text-secondary">Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="form-control rounded-3 shadow-none"
                  value={formData.authPass}
                  onChange={(e) => setFormData({ ...formData, authPass: e.target.value })}
                />
              </div>
              {modalData.type === 'auth-signup' && (
                <div className="mb-3 form-check">
                  <input type="checkbox" className="form-check-input" id="termsCheck" required />
                  <label className="form-check-label small text-secondary" htmlFor="termsCheck">
                    I agree to RoomMate's Terms of Service and Privacy Policy.
                  </label>
                </div>
              )}
            </>
          )}

          {/* Action Footer */}
          <div className="d-flex justify-content-end gap-2 pt-2 border-top">
            <button
              type="button"
              className="btn btn-outline-secondary rounded-pill px-3 py-2"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary-custom rounded-pill px-4 py-2">
              {modalData.type === 'contact-owner' && 'Send Inquiry'}
              {modalData.type === 'send-message' && 'Send Message'}
              {modalData.type === 'connect' && 'Send Request'}
              {modalData.type === 'auth-login' && 'Log In'}
              {modalData.type === 'auth-signup' && 'Create Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActionModal;
