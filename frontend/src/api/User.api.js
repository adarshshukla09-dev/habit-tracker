import axios from "axios";

// No dotenv.config() needed here!
export const Userapi = axios.create({
  baseURL: `/api/${import.meta.env.VITE_BACKEND_URL}`,
  withCredentials: true, // Allows the browser to send/receive cookies (like JWTs)
});
