// src/services/apiService.js
import axios from "axios";

const API_BASE_URL = "https://shatrunjaygroup.com/lms/api/";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Generic request handler
const apiRequest = async ({ endpoint, method = "GET", data = null, params = null }) => {
  try {
    const response = await api({
      url: endpoint,
      method,
      data,
      params,
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error.response?.data || { status: "error", message: "Something went wrong" };
  }
};

export default apiRequest;
