import { useState } from "react";
import styles from "../../styles/Projects/CreateProjectModal.module.css";

const CreateProjectModal = ({ onClose }) => {
  const [projectName, setProjectName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [description, setDescription] = useState("");
  const [cycleTemplates, setCycleTemplates] = useState([
    { cycle: "", placement: "", color: "#000000" },
  ]);

  // Function to add another cycle template
  const addCycleTemplate = () => {
    setCycleTemplates([...cycleTemplates, { cycle: "", placement: "", color: "#000000" }]);
  };

  // Function to update cycle template values
  const updateCycleTemplate = (index, field, value) => {
    const updatedTemplates = [...cycleTemplates];
    updatedTemplates[index][field] = value;
    setCycleTemplates(updatedTemplates);
  };

  // Function to handle project creation
  const handleCreateProject = () => {
    if (!projectName || !startDate) {
      alert("Project name and start date are required.");
      return;
    }

    const newProject = {
      projectName,
      startDate,
      description,
      cycles: cycleTemplates,
    };

    console.log("Creating Project:", newProject);
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* Modal Header */}
        <div className={styles.header}>
          <h2>Create Project</h2>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>

        {/* Project Name Input */}
        <div className={styles.formGroup}>
          <label>Project Name</label>
          <input
            type="text"
            placeholder="Enter project name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </div>

        {/* Logical Start Date Input */}
        <div className={styles.formGroup}>
          <label>Logical Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        {/* Project Description */}
        <div className={styles.formGroup}>
          <label>Project Description</label>
          <textarea
            placeholder="Enter project description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        {/* Cycle Templates Section */}
        <div className={styles.cycleTemplates}>
          <h3>Cycle Templates</h3>
          {cycleTemplates.map((cycle, index) => (
            <div key={index} className={styles.cycleTemplate}>
              <label>Cycle Template {index + 1}</label>
              <select
                value={cycle.cycle}
                onChange={(e) => updateCycleTemplate(index, "cycle", e.target.value)}
              >
                <option value="">Choose an existing Cycle</option>
                <option value="cycle1">Cycle 1</option>
                <option value="cycle2">Cycle 2</option>
              </select>

              <select
                value={cycle.placement}
                onChange={(e) => updateCycleTemplate(index, "placement", e.target.value)}
              >
                <option value="">Choose a placement</option>
                <option value="before">Before Logical Start Date</option>
                <option value="after">After Logical Start Date</option>
              </select>

              <input
                type="color"
                value={cycle.color}
                onChange={(e) => updateCycleTemplate(index, "color", e.target.value)}
              />
            </div>
          ))}

          <button className={styles.addCycleButton} onClick={addCycleTemplate}>
            + Add another Cycle Template
          </button>
        </div>

        {/* Action Buttons */}
        <div className={styles.actions}>
          <button className={styles.createButton} onClick={handleCreateProject}>
            Create Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectModal;
