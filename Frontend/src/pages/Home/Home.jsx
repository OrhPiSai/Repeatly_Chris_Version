import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Calendar from "../../components/Calendar";
import styles from "../../styles/Home/Home.module.css";

const Home = () => {
  const [selectedProject, setSelectedProject] = useState("All Projects");
  const [tasks, setTasks] = useState([]);

  return (
    <div className={styles.container}>
      <Sidebar />

      {/* Main Content */}
      <div className={styles.content}>
        <div className={styles.header}>
          <h2>Hi Peter Cole!</h2>
          <select
            className={styles.projectDropdown}
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
          >
            <option value="All Projects">All Projects</option>
            <option value="CNY 2025">CNY 2025</option>
          </select>
        </div>

        {/* Calendar Component */}
        <Calendar tasks={tasks} />
      </div>
    </div>
  );
};

export default Home;
