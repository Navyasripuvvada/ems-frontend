import axios from "axios";

const api = axios.create({
  baseURL: "https://ems-backend-lac.vercel.app",
});

export default api;