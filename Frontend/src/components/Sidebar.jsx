import { NavLink } from "react-router-dom";
import styles from "../styles/components/Sidebar.module.css";

const Sidebar = () => {
  return (
    <nav className={styles.sidebar}>
      <h1 className={styles.logo}>Repeatly</h1>
      <ul className={styles.navList}>
        <li>
          <NavLink to="/home" className={({ isActive }) => isActive ? styles.active : ""}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/projects" className={({ isActive }) => isActive ? styles.active : ""}>
            Projects
          </NavLink>
        </li>
        <li>
          <NavLink to="/cycles" className={({ isActive }) => isActive ? styles.active : ""}>
            Cycles
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
