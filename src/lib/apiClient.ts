import axios from "axios";

const baseURL = process.env.BASE_URL;

const apiClient = axios.create({
  baseURL: `${baseURL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

export { apiClient };
