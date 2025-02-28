import { useState } from "react";
import styles from "../../styles/Cycles/CreateTaskModal.module.css";

const CreateTaskModal = ({ activityId, onClose, onTaskCreated }) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDuration, setTaskDuration] = useState("");
  const [loading, setLoading] = useState(false);

  // 📌 Handle Task Creation
  const handleCreateTask = async () => {
    if (!taskName || !taskDuration) {
      alert("Task Name and Days Duration are required!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          AID: activityId, // Link task to the selected Activity
          TName: taskName,
          TDescription: taskDescription,
          TDuration: taskDuration,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Task created successfully!");
        onTaskCreated(); // Refresh Activity Management UI
        onClose(); // Close the modal
      } else {
        alert("Error creating task: " + data.error);
      }
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* Modal Header */}
        <div className={styles.modalHeader}>
          <h3>Create Task</h3>
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Task Name */}
        <label className={styles.label}>Task Name</label>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className={styles.input}
          placeholder="Enter Task name"
        />

        {/* Days Duration */}
        <label className={styles.label}>Days Duration</label>
        <input
          type="number"
          value={taskDuration}
          onChange={(e) => setTaskDuration(e.target.value)}
          className={styles.input}
          placeholder="Eg. 3"
        />

        {/* Task Description */}
        <label className={styles.label}>Description</label>
        <textarea
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          className={styles.textarea}
          placeholder="Enter a description for this Task"
        ></textarea>

        {/* Create Task Button */}
        <button
          className={styles.createButton}
          onClick={handleCreateTask}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Task!"}
        </button>
      </div>
    </div>
  );
};

export default CreateTaskModal;
