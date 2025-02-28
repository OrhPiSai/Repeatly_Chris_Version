import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/activities";

// Create a new activity
export const createActivity = async (cycleId, activityData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/${cycleId}`, activityData);
    return response.data;
  } catch (error) {
    console.error("Error creating activity:", error);
    throw error;
  }
};
