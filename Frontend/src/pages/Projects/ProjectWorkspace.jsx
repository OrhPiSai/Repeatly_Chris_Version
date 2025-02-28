import { useState, useEffect } from "react";
import { getProjectById, updateProject } from "../../api/projectApi";
import ProjectTimeline from "./ProjectTimeline";
import ExistingCycleTemplates from "./ExistingCycleTemplates";
import styles from "../../styles/Projects/ProjectWorkspace.module.css";

const ProjectWorkspace = ({ projectId, onClose }) => {
  const [project, setProject] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [status, setStatus] = useState("Not Started");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await getProjectById(projectId);
        setProject(data);
        setName(data.PName || "");
        setDescription(data.PDescription || "");
        setStartDate(data.LogicalStartDate || "");
        setStatus(data.Status || "Not Started");
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    fetchProject();
  }, [projectId]);

  const handleSave = async () => {
    try {
      await updateProject(projectId, {
        PName: name,
        PDescription: description,
        LogicalStartDate: startDate,
        Status: status,
      });
      alert("Project updated successfully!");
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  if (!project) return <p>Loading project details...</p>;

  return (
    <div className={styles.workspace}>
      <button className={styles.closeButton} onClick={onClose}>X</button>
      <h2>Project Management Workspace</h2>

      {/* Project Details */}
      <div className={styles.projectDetails}>
        <label>Project Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label>Logical Start Date</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />

        <label>Project Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Not Started">Not Started</option>
          <option value="In-Progress">In-Progress</option>
          <option value="Blocked">Blocked</option>
          <option value="Complete">Complete</option>
        </select>

        <button className={styles.saveButton} onClick={handleSave}>Save Changes</button>
      </div>

      {/* Timeline Manager */}
      <ProjectTimeline projectId={projectId} />

      {/* Existing Cycle Templates */}
      <ExistingCycleTemplates />
    </div>
  );
};

export default ProjectWorkspace;
