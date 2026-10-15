import React from 'react';
import { useApp } from '../context/AppContext';

const ToastContainer = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="custom-toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className="custom-toast-item">
          <i className={`bi ${toast.icon} fs-5 text-primary-custom`}></i>
          <div className="flex-grow-1 small fw-semibold">{toast.message}</div>
          <button
            type="button"
            className="btn-close btn-close-white small shadow-none opacity-75"
            onClick={() => removeToast(toast.id)}
            aria-label="Close"
          ></button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
