import axios from "axios";
import { toast } from "react-toastify";

// Set config defaults when creating the instance
const instance = axios.create({
  // baseURL: process.env.REACT_APP_BACKEND_URL,
  baseURL: "http://localhost:8080",
});

instance.defaults.withCredentials = true;

// Alter defaults after instance has been created

// instance.defaults.headers.common[
//   "Authorization"
// ] = `Bearer ${localStorage.getItem("jwt")}`;
// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
});
// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (e) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // Do something with request error
    const status = (e && e.response && e.response.status) || 500;
    switch (status) {
      // authentication (token related issues)
      case 401: {
        if (
          window.location.pathname !== "/" &&
          window.location.pathname !== "/login" &&
          window.location.pathname !== "/register"
        ) {
          toast.error("Authentication failed, please login again");
        }
        return e.response.data;
      }

      // forbidden (permission related issues)
      case 403: {
        toast.error("you dont have permission to access this");
        return Promise.reject(e);
      }

      // bad request
      case 400: {
        return Promise.reject(e);
      }

      // not found
      case 404: {
        return Promise.reject(e);
      }

      // conflict
      case 409: {
        return Promise.reject(e);
      }

      // unprocessable
      case 422: {
        return Promise.reject(e);
      }

      // generic api error (server related) unexpected
      default: {
        return Promise.reject(e);
      }
    }
  }
);

export default instance;
