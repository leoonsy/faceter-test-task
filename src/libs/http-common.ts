import axios from "axios";

const headers = {
  Accept: "application/json"
};

const HTTP = axios.create({
  baseURL: process.env.VUE_APP_SW_API,
  headers
});

export default HTTP;
