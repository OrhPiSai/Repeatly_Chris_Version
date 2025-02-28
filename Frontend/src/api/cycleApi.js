import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/cycles";

// Get all cycles (with optional pagination & sorting)
export const getCycles = async (page = 1, limit = 10, order = "created_at", direction = "asc") => {
  try {
    const response = await axios.get(`${API_BASE_URL}?page=${page}&limit=${limit}&order=${order}&direction=${direction}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cycles:", error);
    throw error;
  }
};

// Search cycles by name/description
export const searchCycles = async (query) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search?query=${query}`);
    return response.data;
  } catch (error) {
    console.error("Error searching cycles:", error);
    throw error;
  }
};

// Get a single cycle by ID
export const getCycleById = async (cycleId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${cycleId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cycle:", error);
    throw error;
  }
};

// Get all cycles assigned to a specific project
export const getCyclesForProject = async (projectId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/project/${projectId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching cycles for project ${projectId}:`, error);
    throw error;
  }
};

// Get cycles not assigned to any project
export const getUnassignedCycles = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/unassigned`);
    return response.data;
  } catch (error) {
    console.error("Error fetching unassigned cycles:", error);
    throw error;
  }
};

// Create a new cycle
export const createCycle = async (cycleData) => {
  try {
    const response = await axios.post(API_BASE_URL, cycleData);
    return response.data;
  } catch (error) {
    console.error("Error creating cycle:", error);
    throw error;
  }
};

// Update an existing cycle
export const updateCycle = async (cycleId, updatedData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${cycleId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating cycle:", error);
    throw error;
  }
};

// Assign a color to a cycle
export const updateCycleColor = async (cycleId, color) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/${cycleId}/color`, { color });
    return response.data;
  } catch (error) {
    console.error(`Error updating color for cycle ${cycleId}:`, error);
    throw error;
  }
};

// Delete a cycle
export const deleteCycle = async (cycleId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${cycleId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting cycle:", error);
    throw error;
  }
};

// Duplicate a cycle
export const duplicateCycle = async (cycleId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/duplicate/${cycleId}`);
    return response.data;
  } catch (error) {
    console.error("Error duplicating cycle:", error);
    throw error;
  }
};
