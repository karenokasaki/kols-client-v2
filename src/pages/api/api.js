import axios from "axios";

const apisURL = {
  development: "https://red-vast-tortoise.cyclic.app",
  production: "https://red-vast-tortoise.cyclic.app",
};

const api = axios.create({
  baseURL: apisURL[process.env.NODE_ENV],
});

api.interceptors.request.use((config) => {
  const json = localStorage.getItem("loggedInUser");
  const loggedInUser = JSON.parse(json || '""');

  if (loggedInUser.token) {
    config.headers = { Authorization: `Bearer ${loggedInUser.token}` };
  }

  return config;
});

export { api };
