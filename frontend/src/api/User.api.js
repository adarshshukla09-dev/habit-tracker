import axios from "axios";

// No dotenv.config() needed here!
export const Userapi = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
  withCredentials: true, // Allows the browser to send/receive cookies (like JWTs)
});
