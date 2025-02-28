import { useState, useEffect } from "react";
import { getCyclesForProject, addCycleToProject, removeCycleFromProject } from "../../api/projectCycleMappingApi";
import styles from "../../styles/Projects/ProjectTimeline.module.css";

const ProjectTimeline = ({ projectId, userId }) => {
  const [cycles, setCycles] = useState([]);

  useEffect(() => {
    const fetchMappedCycles = async () => {
      try {
        const data = await getCyclesForProject(projectId);
        setCycles(data);
      } catch (error) {
        console.error("Error fetching cycles:", error);
      }
    };

    fetchMappedCycles();
  }, [projectId]);

  const handleDrop = async (e) => {
    e.preventDefault();
    const cycleData = JSON.parse(e.dataTransfer.getData("cycle"));

    try {
      await addCycleToProject(projectId, cycleData.CycleID, userId);
      setCycles([...cycles, cycleData]);
    } catch (error) {
      console.error("Error adding cycle:", error);
    }
  };

  const handleRemove = async (cycleId) => {
    if (!window.confirm("Are you sure you want to remove this cycle?")) return;

    try {
      await removeCycleFromProject(projectId, cycleId);
      setCycles(cycles.filter(cycle => cycle.CycleID !== cycleId));
    } catch (error) {
      console.error("Error removing cycle:", error);
    }
  };

  return (
    <div className={styles.timeline} onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
      <h3>Project Timeline</h3>

      <div className={styles.timelineContainer}>
        <div className={styles.logicalStart}>
          <span>Logical Start Date</span>
          <div className={styles.startIndicator}></div>
        </div>

        {cycles.map((cycle, index) => (
          <div key={index} className={styles.cycleBlock} style={{ backgroundColor: cycle.color }}>
            <span>{cycle.CName}</span>
            <span>{cycle.CDuration} Days</span>
            <button className={styles.deleteButton} onClick={() => handleRemove(cycle.CycleID)}>X</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectTimeline;
