import React from 'react';
import styles from './Popup.module.css';

interface PopupProps {
  isOpen: boolean;
  type: 'success' | 'error';
  title: string;
  message: string;
  onClose: () => void;
}

export default function Popup({ isOpen, type, title, message, onClose }: PopupProps) {
  if (!isOpen) return null;

  const modalClass = type === 'success' ? styles.success : styles.error;
  const titleClass = type === 'success' ? styles.successTitle : styles.errorTitle;
  const messageClass = type === 'success' ? styles.successMessage : styles.errorMessage;
  const buttonClass = type === 'success' ? styles.successButton : styles.errorButton;

  return (
    <>
      {/* Backdrop */}
      <div
        className={styles.backdrop}
        onClick={onClose}
      />

      {/* Modal */}
      <div className={styles.modalContainer}>
        <div
          className={`${styles.modal} ${modalClass}`}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className={`${styles.title} ${titleClass}`}>{title}</h2>
          <p className={`${styles.message} ${messageClass}`}>{message}</p>
          <button
            onClick={onClose}
            className={`${styles.button} ${buttonClass}`}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}
