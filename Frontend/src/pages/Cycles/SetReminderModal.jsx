import { useState } from "react";
import styles from "../../styles/Cycles/SetReminderModal.module.css";

const SetReminderModal = ({ onClose, onSetReminder }) => {
  const [daysBefore, setDaysBefore] = useState("");
  const [time, setTime] = useState("");
  const [timeFormat, setTimeFormat] = useState("12Hrs");
  const [recurrence, setRecurrence] = useState("");
  const [recurrenceUnit, setRecurrenceUnit] = useState("Minutes");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");

  // Toggle between 12Hrs and 24Hrs format
  const toggleTimeFormat = () => {
    setTimeFormat(timeFormat === "12Hrs" ? "24Hrs" : "12Hrs");
  };

  // Handle setting reminder
  const handleSetReminder = () => {
    if (!daysBefore || !time || !recurrence) {
      alert("Please fill in all required fields.");
      return;
    }

    onSetReminder({
      daysBefore,
      time,
      timeFormat,
      recurrence,
      recurrenceUnit,
      description,
      email,
    });

    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <h2>Set Reminder</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        {/* Form Fields */}
        <div className={styles.form}>
          {/* Days Before Due */}
          <label className={styles.label}>No. of Days Before Due</label>
          <input
            type="number"
            placeholder="Eg. 3"
            value={daysBefore}
            onChange={(e) => setDaysBefore(e.target.value)}
            className={styles.input}
          />

          {/* Reminder Time */}
          <label className={styles.label}>Time</label>
          <div className={styles.timeInputContainer}>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className={styles.input}
            />
            <button onClick={toggleTimeFormat} className={styles.toggleButton}>
              {timeFormat}
            </button>
          </div>

          {/* Recurrence Settings */}
          <label className={styles.label}>Recurrence</label>
          <div className={styles.recurrenceContainer}>
            <input
              type="number"
              placeholder="Eg. 3"
              value={recurrence}
              onChange={(e) => setRecurrence(e.target.value)}
              className={styles.input}
            />
            <select
              value={recurrenceUnit}
              onChange={(e) => setRecurrenceUnit(e.target.value)}
              className={styles.select}
            >
              <option value="Seconds">Seconds</option>
              <option value="Minutes">Minutes</option>
              <option value="Hours">Hours</option>
            </select>
          </div>

          {/* Reminder Description */}
          <label className={styles.label}>Description</label>
          <textarea
            placeholder="Enter a reminder description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.textarea}
          />

          {/* Email Notification */}
          <label className={styles.label}>Email for Reminder</label>
          <input
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />

          {/* Actions */}
          <div className={styles.actions}>
            <button className={styles.setReminderButton} onClick={handleSetReminder}>
              Set Reminder!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetReminderModal;
