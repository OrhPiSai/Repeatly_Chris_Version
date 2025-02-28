import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import styles from "../../styles/Cycles/CycleWorkspace.module.css";
import { getCycleById, updateCycle, deleteCycle } from "../../api/cycleApi";
import CreateActivityModal from "./CreateActivityModal";
import SetReminderModal from "./SetReminderModal";

const CycleWorkspace = () => {
  const { cycleId } = useParams(); // Get CycleID from URL
  const navigate = useNavigate();

  const [cycle, setCycle] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Manage Activity Modal
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);

  // Manage Reminder Modal
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);

  // Fetch cycle details on load
  useEffect(() => {
    const fetchCycle = async () => {
      try {
        const cycleData = await getCycleById(cycleId);
        setCycle(cycleData);
        setName(cycleData.CName || "");
        setDescription(cycleData.CDescription || "");
        setDuration(cycleData.CDuration || "");
        setCreatedAt(cycleData.CreatedAt || "");
        setUpdatedAt(cycleData.UpdatedAt || "");
      } catch (error) {
        console.error("Failed to fetch cycle:", error);
      }
      setIsLoading(false);
    };

    fetchCycle();
  }, [cycleId]);

  // Handle Save
  const handleSave = async () => {
    try {
      const updatedCycle = {
        CycleID: cycleId,
        CName: name,
        CDescription: description,
        CDuration: duration,
        UpdatedAt: new Date().toISOString(), // Update timestamp
      };
      await updateCycle(cycleId, updatedCycle);
      alert("Cycle updated successfully!");
      setUpdatedAt(new Date().toISOString()); // Update UI timestamp
    } catch (error) {
      console.error("Error updating cycle:", error);
    }
  };

  // Handle Delete
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this cycle?")) return;

    try {
      await deleteCycle(cycleId);
      alert("Cycle deleted successfully!");
      navigate("/cycles"); // Redirect after deletion
    } catch (error) {
      console.error("Error deleting cycle:", error);
    }
  };

  // Refresh Workspace after Activity Creation
  const handleActivityCreated = () => {
    console.log("Activity Created! Refresh workspace.");
    // Add logic to refresh activity list here
  };

  // Handle Reminder Set
  const handleSetReminder = (reminderData) => {
    console.log("Reminder Set:", reminderData);
    // Add logic to send reminder data to API here
  };

  if (isLoading) return <p>Loading cycle details...</p>;

  return (
    <div className={styles.container}>
      <Sidebar />

      {/* Main Workspace */}
      <div className={styles.content}>
        <h2>Cycle Management Workspace</h2>

        {/* Cycle Header */}
        <div className={styles.cycleHeader}>
          <label className={styles.label}>Cycle Name</label>
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

        {/* Cycle Metadata */}
        <div className={styles.metadata}>
          <p><strong>Created At:</strong> {new Date(createdAt).toLocaleString()}</p>
          <p><strong>Last Updated:</strong> {new Date(updatedAt).toLocaleString()}</p>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <button className={styles.saveButton} onClick={handleSave}>Save Changes</button>
          <button className={styles.deleteButton} onClick={handleDelete}>Delete Cycle</button>
          <button className={styles.reminderButton} onClick={() => setIsReminderModalOpen(true)}>
            Set Reminder
          </button>
        </div>

        {/* Activity Management */}
        <div className={styles.activitySection}>
          <h3>Activities</h3>
          <button
            className={styles.createActivityButton}
            onClick={() => setIsActivityModalOpen(true)}
          >
            + Create Activity
          </button>
        </div>

        {/* Modals */}
        {isActivityModalOpen && (
          <CreateActivityModal
            cycleId={cycleId}
            onClose={() => setIsActivityModalOpen(false)}
            onActivityCreated={handleActivityCreated}
          />
        )}

        {isReminderModalOpen && (
          <SetReminderModal
            onClose={() => setIsReminderModalOpen(false)}
            onSetReminder={handleSetReminder}
          />
        )}
      </div>
    </div>
  );
};

export default CycleWorkspace;
