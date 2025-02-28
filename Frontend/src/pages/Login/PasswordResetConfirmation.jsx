import React from "react";
import styles from "../../styles/Login/PasswordResetConfirmation.module.css";

const PasswordResetConfirmation = ({ onClose }) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Change Password</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <div className={styles.confirmationBox}>
          <div className={styles.confirmationHeader}>
            <h3>Password has been reset</h3>
            <button className={styles.confirmationCloseButton} onClick={onClose}>×</button>
          </div>
          <p className={styles.message}>
            Your password has been saved. Please refresh the login page to log in with your new password.
          </p>
        </div>

        <button className={styles.saveButton} onClick={onClose}>
          Save Password
        </button>
      </div>
    </div>
  );
};

export default PasswordResetConfirmation;
