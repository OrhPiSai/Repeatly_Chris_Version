import { useState } from "react";
import styles from "../../styles/Login/ForgetPassword.module.css";

const ForgetPassword = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    // Simulating API call delay
    setTimeout(() => {
      setSuccessMessage("A password reset link has been sent to your email.");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Forget Password</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <p className={styles.instruction}>
          Enter the email address you used to sign up for Repeatly.
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />

          {error && <p className={styles.error}>{error}</p>}
          {successMessage && <p className={styles.success}>{successMessage}</p>}

          <button
            type="submit"
            className={styles.sendButton}
            disabled={!email || isLoading}
          >
            {isLoading ? "Sending..." : "Send Verification Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
