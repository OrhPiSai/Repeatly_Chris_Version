import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/tags";

// Get all tags
export const getAllTags = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching tags:", error.response?.data || error.message);
    throw error;
  }
};

// Get a tag by ID
export const getTagById = async (tagId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${tagId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching tag ${tagId}:`, error.response?.data || error.message);
    throw error;
  }
};

// Create a new tag
export const createTag = async (tagName) => {
  try {
    const response = await axios.post(API_BASE_URL, { TagName: tagName });
    return response.data;
  } catch (error) {
    console.error("Error creating tag:", error.response?.data || error.message);
    throw error;
  }
};

// Update an existing tag
export const updateTag = async (tagId, updatedTagName) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${tagId}`, { TagName: updatedTagName });
    return response.data;
  } catch (error) {
    console.error(`Error updating tag ${tagId}:`, error.response?.data || error.message);
    throw error;
  }
};

// Delete a tag
export const deleteTag = async (tagId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${tagId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting tag ${tagId}:`, error.response?.data || error.message);
    throw error;
  }
};
