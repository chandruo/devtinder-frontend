import axios from "axios";
const http = axios.create({
  baseURL: "http://localhost:777",
  withCredentials: true,
});


export default http;