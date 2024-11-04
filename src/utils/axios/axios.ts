import axios from "axios";

// Setup Axios interceptor
axios.interceptors.request.use(
  (config) => {
    return { ...config };
  },
  (error) => {
    return Promise.reject(error);
  }
);

// You can export axios if you're customizing other defaults
export default axios;
