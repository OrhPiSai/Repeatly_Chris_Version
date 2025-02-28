import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/users";

// Register a new user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error.response?.data || error.message);
    throw error;
  }
};

// User login
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      Email: email,
      Password: password,
    });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }

    return response.data;
  } catch (error) {
    console.error("Error logging in:", error.response?.data || error.message);
    throw error;
  }
};

// Fetch logged-in user profile
export const getUserProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_BASE_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error.response?.data || error.message);
    throw error;
  }
};

// Update user profile
export const updateUserProfile = async (updatedData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${API_BASE_URL}/update`, updatedData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error.response?.data || error.message);
    throw error;
  }
};

// Delete user account
export const deleteUserAccount = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${API_BASE_URL}/delete`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    localStorage.removeItem("token");
    return response.data;
  } catch (error) {
    console.error("Error deleting user account:", error.response?.data || error.message);
    throw error;
  }
};
