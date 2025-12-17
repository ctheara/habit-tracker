import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL ?? "http://localhost:5000";

/**
 * Send message to AI coach
 * @param {string} message - User's message
 * @param {Array} conversationHistory - Previous messages [{role, content}]
 * @returns {Promise} Response with AI message and timestamp
 */
const sendMessage = async (message, conversationHistory = []) => {
  try {
    const client = axios.create({ baseURL });
    const response = await client.post(
      "/v1/coaches/chat",
      {
        message,
        conversationHistory,
      },
      {
        withCredentials: true, // Include auth cookie
      }
    );

    console.log("Coach API response:", response.data);
    return response.data;
  } catch (error) {
    console.warn(
      "Coach API error:",
      JSON.stringify(error.response?.data || error.message)
    );
    throw error;
  }
};

const coachClient = {
  sendMessage,
};

export default coachClient;
