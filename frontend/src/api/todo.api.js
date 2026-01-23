import axios from "axios";

// Vite automatically loads variables starting with VITE_
// into import.meta.env, so no need for dotenv.config()
const todoApi = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/todos`,
  withCredentials: true,
});

export default todoApi;
