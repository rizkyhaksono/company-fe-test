import axios from "axios";

const baseHeaders = {
  "Content-Type": "application/json",
};

const axiosBase = axios.create({
  baseURL: "https://api.company.natee.me/api",
  headers: baseHeaders,
});

export default axiosBase;