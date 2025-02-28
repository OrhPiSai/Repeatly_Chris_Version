import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import styles from "../../styles/Cycles/ActivityManagement.module.css";
import { getActivityById, updateActivity, deleteActivity } from "../../api/activityApi";
import CreateTaskModal from "./CreateTaskModal";
import SetReminderModal from "./SetReminderModal";

const ActivityManagement = () => {
  const { activityId } = useParams(); // Get ActivityID from URL
  const [activity, setActivity] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Manage Modals
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const activityData = await getActivityById(activityId);
        setActivity(activityData);
        setName(activityData.AName || "");
        setDescription(activityData.ADescription || "");
        setDuration(activityData.ADuration || "");
        setTasks(activityData.tasks || []); // Load associated tasks
      } catch (error) {
        console.error("Failed to fetch activity:", error);
      }
      setIsLoading(false);
    };

    fetchActivity();
  }, [activityId]);

  const handleSave = async () => {
    try {
      const updatedActivity = {
        ActivityID: activityId,
        AName: name,
        ADescription: description,
        ADuration: duration,
      };
      await updateActivity(activityId, updatedActivity);
      alert("Activity updated successfully!");
    } catch (error) {
      console.error("Error updating activity:", error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this activity?")) return;

    try {
      await deleteActivity(activityId);
      alert("Activity deleted successfully!");
      window.history.back(); // Go back to the cycle workspace
    } catch (error) {
      console.error("Error deleting activity:", error);
    }
  };

  // Refresh Task List when a new task is created
  const handleTaskCreated = () => {
    console.log("New Task Created! Refresh Task List.");
    // Fetch latest tasks again
  };

  if (isLoading) return <p>Loading activity details...</p>;

  return (
    <div className={styles.container}>
      <Sidebar />

      {/* Main Workspace */}
      <div className={styles.content}>
        <h2>Activity Management Workspace</h2>

        {/* Activity Header */}
        <div className={styles.activityHeader}>
          <label className={styles.label}>Activity Name</label>
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

        {/* Actions */}
        <div className={styles.actions}>
          <button className={styles.saveButton} onClick={handleSave}>Save Changes</button>
          <button className={styles.deleteButton} onClick={handleDelete}>Delete Activity</button>
        </div>

        {/* Task & Reminder Management */}
        <div className={styles.taskSection}>
          <h3>Tasks</h3>
          <button
            className={styles.createTaskButton}
            onClick={() => setIsTaskModalOpen(true)}
          >
            + Create Task
          </button>
          <button
            className={styles.setReminderButton}
            onClick={() => setIsReminderModalOpen(true)}
          >
            Set Reminder
          </button>
        </div>

        {/* Task Table */}
        <div className={styles.taskTable}>
          <h3>Activity Tasks</h3>
          {tasks.length === 0 ? (
            <p className={styles.emptyMessage}>No tasks yet. Create a new task!</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Task Name</th>
                  <th>Due Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, index) => (
                  <tr key={task.TaskID}>
                    <td>{index + 1}</td>
                    <td>{task.TName}</td>
                    <td>{task.DueDate}</td>
                    <td>{task.Status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Modals */}
        {isTaskModalOpen && (
          <CreateTaskModal
            activityId={activityId}
            onClose={() => setIsTaskModalOpen(false)}
            onTaskCreated={handleTaskCreated}
          />
        )}
        {isReminderModalOpen && (
          <SetReminderModal
            activityId={activityId}
            onClose={() => setIsReminderModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ActivityManagement;
