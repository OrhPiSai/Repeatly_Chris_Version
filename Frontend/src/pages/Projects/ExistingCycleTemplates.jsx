import { useState, useEffect } from "react";
import { getAllCycles } from "../../api/cycleApi";
import styles from "../../styles/Projects/ExistingCycleTemplates.module.css";

const ExistingCycleTemplates = () => {
  const [cycles, setCycles] = useState([]);

  useEffect(() => {
    const fetchCycles = async () => {
      try {
        const data = await getAllCycles();
        setCycles(data);
      } catch (error) {
        console.error("Error fetching cycles:", error);
      }
    };

    fetchCycles();
  }, []);

  const handleDragStart = (e, cycle) => {
    e.dataTransfer.setData("cycle", JSON.stringify(cycle));
  };

  return (
    <div className={styles.cycleTemplates}>
      <h3>Existing Cycle Templates</h3>

      <div className={styles.table}>
        {cycles.length > 0 ? (
          cycles.map((cycle) => (
            <div
              key={cycle.CycleID}
              className={styles.cycleRow}
              draggable
              onDragStart={(e) => handleDragStart(e, cycle)}
            >
              <span>{cycle.CName}</span>
              <span>{cycle.CDuration} Days</span>
            </div>
          ))
        ) : (
          <p>No cycles available. Create a cycle in the Cycles tab.</p>
        )}
      </div>
    </div>
  );
};

export default ExistingCycleTemplates;
