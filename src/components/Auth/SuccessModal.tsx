import React, { useEffect } from 'react';
import { motion, AnimatePresence, MotionStyle } from 'framer-motion';

const SuccessModal = ({ message, onClose }) => {
  useEffect(() => {
    console.log("SuccessModal rendered");
    const timer = setTimeout(() => {
      onClose(); // Automatically close the modal after 2 seconds
    }, 2000);

    return () => {
      console.log("SuccessModal unmounted");
      clearTimeout(timer); // Cleanup timer
    };
  }, [onClose]);

  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    } as MotionStyle,
    modal: {
      backgroundColor: '#fff',
      borderRadius: '12px',
      padding: '24px',
      width: '350px',
      textAlign: 'center' as const, // Cast to a valid type
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    } as MotionStyle,
    iconContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '16px',
    } as React.CSSProperties,
    icon: {
      width: '48px',
      height: '48px',
      color: '#4CAF50',
    } as React.CSSProperties,
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '8px',
      color: '#333',
    } as React.CSSProperties,
    message: {
      fontSize: '16px',
      color: '#666',
    } as React.CSSProperties,
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={styles.overlay}
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          style={styles.modal}
        >
          <div style={styles.iconContainer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={styles.icon}
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
          <h2 style={styles.title}>Success!</h2>
          <p style={styles.message}>{message}</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SuccessModal;