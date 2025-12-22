import axios from "axios";
const todoApi = axios.create({
  baseURL: "http://localhost:5000/api/todos",
  withCredentials: true,
});

export default todoApi;
