import axios from "axios";

// Vite automatically reads your .env file.
// dotenv.config() is not required and will not work in the browser.
const habitApi = axios.create({
  baseURL: `/api/habit/${import.meta.env.VITE_BACKEND_URL}`,
  withCredentials: true,
});

export default habitApi;
