// // src/services/apiService.js
// import axios from "axios";

// const API_BASE_URL = "https://shatrunjaygroup.com/lms/api/";

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Generic request handler
// const apiRequest = async ({ endpoint, method = "GET", data = null, params = null ,isFormData = false}) => {
//   try {
//     const response = await api({
//       url: endpoint,
//       method,
//       data,
//       params,
//     });
//     return response.data;
//   } catch (error) {
//     console.error("API Error:", error);
//     throw error.response?.data || { status: "error", message: "Something went wrong" };
//   }
// };

// export default apiRequest;

// src/services/apiService.js
import axios from "axios";

const API_BASE_URL = "https://shatrunjaygroup.com/lms/api/";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json", // default for JSON
  },
});

const apiRequest = async ({ endpoint, method = "GET", data = null, params = null, isFormData = false }) => {
  try {
    const config = {
      url: endpoint,
      method,
      data,
      params,
    };

    // If uploading files, let axios set the correct multipart/form-data headers
    if (isFormData) {
      config.headers = {
        "Content-Type": "multipart/form-data",
      };
    }

    const response = await api(config);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error.response?.data || { status: "error", message: "Something went wrong" };
  }
};

export default apiRequest;
