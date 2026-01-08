import axios from "axios";

// Vite automatically reads your .env file.
// dotenv.config() is not required and will not work in the browser.
const habitApi = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/habit`,
  withCredentials: true,
});

export default habitApi;
