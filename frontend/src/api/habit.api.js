import axios from "axios";
const habitApi = axios.create({
  baseURL: "http://localhost:5000/api/habit",
  withCredentials: true,
});

export default habitApi;
