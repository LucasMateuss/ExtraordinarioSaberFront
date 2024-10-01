import axios from "axios";
import router from "../router/index.js";
import store from "@/store";

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL || "http://localhost:3000",
  timeout: 10000,
});

api.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["x-access-token"] = token;
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);

    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      localStorage.removeItem("token");
      store.commit("clearAuthData");
      router.push("/");
    }

    return Promise.reject(error);
  }
);

export default api;
