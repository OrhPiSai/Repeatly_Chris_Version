import { useState, useEffect } from "react";
import { getAllProjects, createProject } from "../../api/projectApi";
import { getCyclesForProject, reorderCycles } from "../../api/projectCycleMappingApi";
import Sidebar from "../../components/Sidebar";
import CreateProjectModal from "./CreateProjectModal";
import styles from "../../styles/Projects/Project.module.css";

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [cycles, setCycles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch projects on mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getAllProjects();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  // Fetch cycles for selected project
  useEffect(() => {
    if (selectedProject) {
      const fetchCycles = async () => {
        try {
          const data = await getCyclesForProject(selectedProject.ProjectID);
          setCycles(data);
        } catch (error) {
          console.error("Error fetching cycles:", error);
        }
      };

      fetchCycles();
    }
  }, [selectedProject]);

  // Handle project creation
  const handleCreateProject = async (newProjectData) => {
    try {
      const createdProject = await createProject(newProjectData);
      setProjects([...projects, createdProject]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  // Handle reordering cycles
  const handleReorder = async (newOrder) => {
    try {
      await reorderCycles(selectedProject.ProjectID, newOrder);
      setCycles(newOrder);
    } catch (error) {
      console.error("Error reordering cycles:", error);
    }
  };

  return (
    <div className={styles.container}>
      <Sidebar />

      <div className={styles.content}>
        <h2>Project Management</h2>

        <div className={styles.projectList}>
          {projects.map((project) => (
            <button key={project.ProjectID} onClick={() => setSelectedProject(project)}>
              {project.PName}
            </button>
          ))}
        </div>

        {selectedProject && (
          <div className={styles.projectWorkspace}>
            <h3>{selectedProject.PName}</h3>

            <div className={styles.timeline}>
              {cycles.map((cycle, index) => (
                <div
                  key={cycle.CycleID}
                  className={styles.timelineItem}
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData("text/plain", index)}
                  onDrop={(e) => {
                    const draggedIndex = e.dataTransfer.getData("text/plain");
                    const newOrder = [...cycles];
                    const movedItem = newOrder.splice(draggedIndex, 1)[0];
                    newOrder.splice(index, 0, movedItem);
                    handleReorder(newOrder);
                  }}
                  onDragOver={(e) => e.preventDefault()}
                >
                  {cycle.CycleID}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {isModalOpen && <CreateProjectModal onClose={() => setIsModalOpen(false)} onCreate={handleCreateProject} />}
    </div>
  );
};

export default Project;
