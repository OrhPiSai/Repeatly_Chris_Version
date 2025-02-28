import React, { useState } from "react";
import styles from "../../styles/Cycles/CreateActivityModal.module.css";
import { createActivity } from "../../api/activityApi";

const CreateActivityModal = ({ cycleId, onClose, onActivityCreated }) => {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreateActivity = async () => {
    setError("");
    if (!name || !duration) {
      setError("Name and Duration are required.");
      return;
    }

    setIsLoading(true);
    try {
      const newActivity = {
        AName: name,
        ADuration: parseInt(duration),
        ADescription: description || "",
      };

      await createActivity(cycleId, newActivity);
      onActivityCreated(); // Refresh workspace
      onClose(); // Close modal
    } catch (error) {
      setError("Failed to create activity. Try again.");
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Create Activity</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <div className={styles.modalBody}>
          <label className={styles.label}>Name:</label>
          <input
            type="text"
            placeholder="Enter Activity name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
          />

          <label className={styles.label}>Days Duration:</label>
          <input
            type="number"
            placeholder="Enter number of days"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className={styles.input}
          />

          <label className={styles.label}>Description:</label>
          <textarea
            placeholder="Enter a description for this Activity"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.textarea}
          />

          {error && <p className={styles.error}>{error}</p>}

          <button
            className={styles.createButton}
            onClick={handleCreateActivity}
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Activity!"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateActivityModal;
