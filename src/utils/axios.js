import axios from "axios";
import { TOKEN, API_BASE } from "./config";

const instance = axios.create({
  baseURL: API_BASE,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((request) => {
  if (TOKEN) {
    request.headers['Authorization'] = `Bearer ${TOKEN}`;
  }

  return request;
});

export default instance;