import { useState } from "react";
import styles from "../../styles/Cycles/CreateCycleModal.module.css";

const CreateCycleModal = ({ onClose, onCreate }) => {
  const [template, setTemplate] = useState("");
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const templates = ["Sprint Planning", "Marketing Campaign", "Product Launch"]; // Example templates

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !duration) {
      alert("Please fill in all required fields!");
      return;
    }

    setIsLoading(true);

    // Simulate API request
    setTimeout(() => {
      onCreate({ name, duration, description });
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Create Cycle</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Cycle Template Dropdown */}
          <label className={styles.label}>Create from Existing Cycle Template</label>
          <select
            className={styles.input}
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
          >
            <option value="">Select a template</option>
            {templates.map((temp, index) => (
              <option key={index} value={temp}>{temp}</option>
            ))}
          </select>

          {/* Cycle Name Input */}
          <label className={styles.label}>Name</label>
          <input
            type="text"
            placeholder="Enter Cycle name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
          />

          {/* Days Duration Input */}
          <label className={styles.label}>Days Duration</label>
          <input
            type="number"
            placeholder="Enter days duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className={styles.input}
          />

          {/* Description Input */}
          <label className={styles.label}>Description</label>
          <textarea
            placeholder="Enter a description for this Cycle"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.textarea}
          />

          {/* Create Cycle Button */}
          <button type="submit" className={styles.createButton} disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Cycle!"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCycleModal;
