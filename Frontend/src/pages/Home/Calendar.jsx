import { useState } from "react";
import styles from "../styles/components/Calendar.module.css";

const Calendar = ({ tasks }) => {
  const [expandedDate, setExpandedDate] = useState(null);

  return (
    <div className={styles.calendarContainer}>
      {/* Calendar Header */}
      <div className={styles.calendarHeader}>
        <button>{"<"}</button>
        <h3>January 2025</h3>
        <button>{">"}</button>
      </div>

      {/* Calendar Grid */}
      <div className={styles.calendarGrid}>
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className={styles.calendarCell}
            onClick={() => setExpandedDate(i + 1)}
          >
            <span>{i + 1}</span>
            {/* Example task indicator */}
            {i % 5 === 0 && <div className={styles.taskIndicator}>3</div>}
          </div>
        ))}
      </div>

      {/* Task Expansion Pop-Up */}
      {expandedDate && (
        <div className={styles.taskPopup}>
          <h4>Tasks for {expandedDate} January</h4>
          <button className={styles.closePopup} onClick={() => setExpandedDate(null)}>×</button>
          <ul>
            <li className={styles.taskItem}>A - Food & Drinks</li>
            <li className={styles.taskItem}>T - Stock up on dumplings</li>
            <li className={styles.taskItem}>P - CNY 2025</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Calendar;
