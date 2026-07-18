import axios from "axios";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const { API_BASE_URL } = publicRuntimeConfig;

const instance = axios.create({
  baseURL: API_BASE_URL,
});

export default instance;