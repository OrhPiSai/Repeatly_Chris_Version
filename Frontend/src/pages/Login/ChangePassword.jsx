import { useState } from "react";
import PasswordResetConfirmation from "./PasswordResetConfirmation";
import styles from "../../styles/Login/ChangePassword.module.css";

const ChangePassword = ({ userEmail, onClose }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (!/[A-Z]/.test(newPassword) || !/[0-9]/.test(newPassword) || !/[!@#$%^&*]/.test(newPassword)) {
      setError("Password must contain an uppercase letter, a number, and a special character.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    // Simulating API call delay
    setTimeout(() => {
      setIsLoading(false);
      setIsConfirmationOpen(true);
    }, 1000);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Change Password</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        {!isConfirmationOpen ? (
          <>
            <p className={styles.instruction}>
              Enter your new password below.
            </p>

            <form onSubmit={handleSubmit} className={styles.form}>
              <label className={styles.label}>Email:</label>
              <input
                type="email"
                value={userEmail}
                disabled
                className={styles.inputDisabled}
              />

              <label className={styles.label}>New Password:</label>
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={styles.input}
              />

              <label className={styles.label}>Confirm Password:</label>
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={styles.input}
              />

              {error && <p className={styles.error}>{error}</p>}

              <button
                type="submit"
                className={styles.saveButton}
                disabled={!newPassword || !confirmPassword || isLoading}
              >
                {isLoading ? "Saving..." : "Save Password"}
              </button>
            </form>
          </>
        ) : (
          <PasswordResetConfirmation onClose={onClose} />
        )}
      </div>
    </div>
  );
};

export default ChangePassword;
