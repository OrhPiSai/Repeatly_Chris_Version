import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/tag-mapping";

// Get all tag mappings
export const getAllTagMappings = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching tag mappings:", error.response?.data || error.message);
    throw error;
  }
};

// Add a tag to an activity or task
export const addTagToActivityOrTask = async (tagId, activityId = null, taskId = null) => {
  try {
    const response = await axios.post(API_BASE_URL, {
      TagID: tagId,
      ActivityID: activityId,
      TaskID: taskId,
    });

    return response.data;
  } catch (error) {
    console.error("Error adding tag mapping:", error.response?.data || error.message);
    throw error;
  }
};

// Remove a tag from an activity or task
export const removeTagFromActivityOrTask = async (tagId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${tagId}`);
    return response.data;
  } catch (error) {
    console.error("Error removing tag mapping:", error.response?.data || error.message);
    throw error;
  }
};
