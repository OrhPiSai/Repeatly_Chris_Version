import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import CreateCycleModal from "./CreateCycleModal";
import styles from "../../styles/Cycles/Cycles.module.css";

const Cycles = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cycles, setCycles] = useState([]);

  const handleCreateCycle = (newCycle) => {
    setCycles([...cycles, newCycle]);
  };

  return (
    <div className={styles.container}>
      <Sidebar />

      {/* Main Content */}
      <div className={styles.content}>
        <h2>Cycles</h2>

        {/* Create Cycle Button */}
        <button className={styles.createCycleButton} onClick={() => setIsModalOpen(true)}>
          Create Cycle
        </button>

        {/* Display Cycles Table */}
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Days Duration</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {cycles.length === 0 ? (
                <tr>
                  <td colSpan="4" className={styles.noCycles}>
                    You currently do not have any Cycles. Start by creating one.
                  </td>
                </tr>
              ) : (
                cycles.map((cycle, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{cycle.name}</td>
                    <td>{cycle.duration} days</td>
                    <td>{cycle.description}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Cycle Modal */}
      {isModalOpen && <CreateCycleModal onClose={() => setIsModalOpen(false)} onCreate={handleCreateCycle} />}
    </div>
  );
};

export default Cycles;
