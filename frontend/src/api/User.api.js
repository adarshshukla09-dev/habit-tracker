import axios from "axios";

export const Userapi = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // crucial for cookies
});
