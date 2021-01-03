import axios from "axios";
const keys = require("../keys/keys");

const axiosInstance = axios.create({
  baseURL: keys.SERVER_URL,
  timeout: 5000,
});
export default axiosInstance;
