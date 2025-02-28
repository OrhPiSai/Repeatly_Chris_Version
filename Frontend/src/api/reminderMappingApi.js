import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000/api/reminder-mappings";

// Get all reminder mappings
export const getAllReminderMappings = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching reminder mappings:", error);
    throw error;
  }
};

// Get reminder mappings by ReminderID
export const getReminderMappingByReminderId = async (reminderId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${reminderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching reminder mapping:", error);
    throw error;
  }
};

// Create a new reminder mapping
export const createReminderMapping = async (reminderId, activityId = null, taskId = null) => {
  try {
    const data = {
      ReminderID: reminderId,
      ActivityID: activityId,
      TaskID: taskId
    };

    const response = await axios.post(API_BASE_URL, data);
    return response.data;
  } catch (error) {
    console.error("Error creating reminder mapping:", error);
    throw error;
  }
};

// Delete a reminder mapping
export const deleteReminderMapping = async (reminderId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${reminderId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting reminder mapping:", error);
    throw error;
  }
};
