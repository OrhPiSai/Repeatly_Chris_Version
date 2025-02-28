import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/projects";

// Get all projects
export const getAllProjects = async (queryParams = {}) => {
  try {
    const response = await axios.get(API_BASE_URL, { params: queryParams });
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error.response?.data || error.message);
    throw error;
  }
};

// Get a single project by ID
export const getProjectById = async (projectId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${projectId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching project ${projectId}:`, error.response?.data || error.message);
    throw error;
  }
};

// Create a new project
export const createProject = async (projectData) => {
  try {
    const response = await axios.post(API_BASE_URL, projectData);
    return response.data;
  } catch (error) {
    console.error("Error creating project:", error.response?.data || error.message);
    throw error;
  }
};

// Update an existing project
export const updateProject = async (projectId, updatedProjectData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${projectId}`, updatedProjectData);
    return response.data;
  } catch (error) {
    console.error(`Error updating project ${projectId}:`, error.response?.data || error.message);
    throw error;
  }
};

// Delete a project
export const deleteProject = async (projectId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${projectId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting project ${projectId}:`, error.response?.data || error.message);
    throw error;
  }
};

// Assign a cycle to a project
export const assignCycleToProject = async (projectId, cycleId, userId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/${projectId}/cycles`, {
      CycleID: cycleId,
      UserID: userId,
    });
    return response.data;
  } catch (error) {
    console.error(`Error assigning cycle ${cycleId} to project ${projectId}:`, error);
    throw error;
  }
};

// Remove a cycle from a project
export const removeCycleFromProject = async (projectId, cycleId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${projectId}/cycles/${cycleId}`);
    return response.data;
  } catch (error) {
    console.error(`Error removing cycle ${cycleId} from project ${projectId}:`, error);
    throw error;
  }
};

// Get all cycles assigned to a project
export const getProjectCycles = async (projectId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${projectId}/cycles`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching cycles for project ${projectId}:`, error);
    throw error;
  }
};
