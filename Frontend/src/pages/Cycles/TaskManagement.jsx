import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import styles from "../../styles/Cycles/TaskManagement.module.css";
import { getTaskById, updateTask, deleteTask } from "../../api/taskApi";
import SetReminderModal from "./SetReminderModal";

const TaskManagement = () => {
  const { taskId } = useParams(); // Get TaskID from URL
  const [task, setTask] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const taskData = await getTaskById(taskId);
        setTask(taskData);
        setName(taskData.TName || "");
        setDescription(taskData.TNotes || "");
        setDuration(taskData.TaskDuration || "");
        setTags(taskData.Tags || []);
      } catch (error) {
        console.error("Failed to fetch task:", error);
      }
      setIsLoading(false);
    };

    fetchTask();
  }, [taskId]);

  const handleSave = async () => {
    try {
      const updatedTask = {
        TaskID: taskId,
        TName: name,
        TNotes: description,
        TaskDuration: duration,
      };
      await updateTask(taskId, updatedTask);
      alert("Task updated successfully!");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await deleteTask(taskId);
      alert("Task deleted successfully!");
      window.history.back(); // Go back to the previous page
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleAddTag = (event) => {
    if (event.key === "Enter" && event.target.value.trim() !== "") {
      setTags([...tags, event.target.value.trim()]);
      event.target.value = "";
    }
  };

  if (isLoading) return <p>Loading task details...</p>;

  return (
    <div className={styles.container}>
      <Sidebar />

      {/* Main Workspace */}
      <div className={styles.content}>
        <h2>Task Management Workspace</h2>

        {/* Task Header */}
        <div className={styles.taskHeader}>
          <label className={styles.label}>Task Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
          />

          <label className={styles.label}>Days Duration</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className={styles.input}
          />
        </div>

        {/* Description Section */}
        <label className={styles.label}>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.textarea}
        />

        {/* Task Tags */}
        <label className={styles.label}>Tags</label>
        <input
          type="text"
          placeholder="Type a tag and press Enter"
          onKeyDown={handleAddTag}
          className={styles.input}
        />
        <div className={styles.tagContainer}>
          {tags.map((tag, index) => (
            <span key={index} className={styles.tag}>
              #{tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <button className={styles.saveButton} onClick={handleSave}>
            Save Changes
          </button>
          <button className={styles.deleteButton} onClick={handleDelete}>
            Delete Task
          </button>
        </div>

        {/* Reminder Section */}
        <div className={styles.reminderSection}>
          <button
            className={styles.setReminderButton}
            onClick={() => setIsReminderModalOpen(true)}
          >
            Set Reminder
          </button>
        </div>

        {/* Reminder Modal */}
        {isReminderModalOpen && (
          <SetReminderModal
            taskId={taskId}
            onClose={() => setIsReminderModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default TaskManagement;
