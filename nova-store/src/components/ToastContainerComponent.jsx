import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { useToast } from '../context/ToastContext';

const ToastContainerComponent = () => {
  const { toasts, removeToast } = useToast();

  const getVariantStyles = (type) => {
    switch (type) {
      case 'success':
        return { bg: 'success', icon: 'bi-check-circle-fill' };
      case 'danger':
        return { bg: 'danger', icon: 'bi-exclamation-triangle-fill' };
      case 'warning':
        return { bg: 'warning', icon: 'bi-exclamation-circle-fill' };
      case 'info':
      default:
        return { bg: 'primary', icon: 'bi-info-circle-fill' };
    }
  };

  return (
    <ToastContainer
      position="bottom-end"
      className="p-3"
      style={{ zIndex: 9999, position: 'fixed' }}
    >
      {toasts.map((toast) => {
        const { bg, icon } = getVariantStyles(toast.type);
        return (
          <Toast
            key={toast.id}
            onClose={() => removeToast(toast.id)}
            delay={3500}
            autohide
            bg={bg}
            className="text-white shadow-lg border-0 mb-2 rounded-3"
          >
            <Toast.Header closeButton closeVariant="white" className={`bg-${bg} text-white border-0`}>
              <i className={`bi ${icon} me-2 fs-5`}></i>
              <strong className="me-auto text-capitalize">{toast.type} Notification</strong>
              <small className="text-white-50">Just now</small>
            </Toast.Header>
            <Toast.Body className="fw-medium py-2">{toast.message}</Toast.Body>
          </Toast>
        );
      })}
    </ToastContainer>
  );
};

export default ToastContainerComponent;
