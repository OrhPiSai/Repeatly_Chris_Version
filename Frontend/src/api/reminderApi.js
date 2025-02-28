import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000/api/reminders";

// Get all reminders
export const getAllReminders = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching reminders:", error);
    throw error;
  }
};

// Get a single reminder by ID
export const getReminderById = async (reminderId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${reminderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching reminder:", error);
    throw error;
  }
};

// Create a new reminder
export const createReminder = async (reminderData) => {
  try {
    const response = await axios.post(API_BASE_URL, reminderData);
    return response.data;
  } catch (error) {
    console.error("Error creating reminder:", error);
    throw error;
  }
};

// Update an existing reminder
export const updateReminder = async (reminderId, updatedData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${reminderId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating reminder:", error);
    throw error;
  }
};

// Delete a reminder
export const deleteReminder = async (reminderId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${reminderId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting reminder:", error);
    throw error;
  }
};
