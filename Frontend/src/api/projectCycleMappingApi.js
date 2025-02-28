import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/project-cycle-mapping";

// Get all cycles mapped to a specific project (ordered)
export const getCyclesForProject = async (projectId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${projectId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cycles for project:", error.response?.data || error.message);
    throw error;
  }
};

// Add a cycle to a project
export const addCycleToProject = async (projectId, cycleId, userId) => {
  try {
    const response = await axios.post(API_BASE_URL, {
      ProjectID: projectId,
      CycleID: cycleId,
      UserID: userId,
    });

    return response.data;
  } catch (error) {
    console.error("Error adding cycle to project:", error.response?.data || error.message);
    throw error;
  }
};

// Remove a cycle from a project
export const removeCycleFromProject = async (projectId, cycleId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${projectId}/${cycleId}`);
    return response.data;
  } catch (error) {
    console.error("Error removing cycle from project:", error.response?.data || error.message);
    throw error;
  }
};

// Reorder cycles in a project
export const reorderCycles = async (projectId, updatedOrder) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/reorder`, {
      ProjectID: projectId,
      cycles: updatedOrder,
    });

    return response.data;
  } catch (error) {
    console.error("Error reordering cycles:", error.response?.data || error.message);
    throw error;
  }
};
