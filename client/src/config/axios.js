import axios from "axios";
const keys = require("../keys/keys");

const axiosInstance = axios.create({
  baseURL: keys.SERVER_URL,

  withCredentials: true,
});
export default axiosInstance;
