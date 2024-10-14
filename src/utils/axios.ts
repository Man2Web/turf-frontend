// axiosConfig.ts

import axios from 'axios';

// Setup Axios interceptor
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// You can export axios if you're customizing other defaults
export default axios;