import axios from "axios";
import {
  KEY_ACCESS_TOKEN,
  getItem,
  removeItem,
  setItem,
} from "./localStorageManager";

export const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_SERVER_BASE_URL,
  withCredentials: true,
});

axiosClient.interceptors.request.use((request) => {
  const accessToken = getItem(KEY_ACCESS_TOKEN);
  request.headers["Authorization"] = `Bearer ${accessToken}`;
  return request;
});

axiosClient.interceptors.response.use(async (response) => {
  const data = response.data;
  if (data.status === "OK") {
    return data;
  }
  const statusCode = data.statusCode;
  const error = data.message;
  const originalRequest = response.config;

  if (
    statusCode === 401 &&
    originalRequest.url ===
      `${process.env.REACT_APP_SERVER_BASE_URL}/auth/refresh`
  ) {
    //when refres token expires send user to login page
    removeItem(KEY_ACCESS_TOKEN);
    window.location.replace("/login", "_self");
    return Promise.reject(error);
  }
  if (statusCode === 401 && !originalRequest._retry) {
    //access token expires
    originalRequest._retry = true;
    const res = await axios
      .create({
        withCredentials: true,
      })
      .get(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/refresh`);
    // console.log("response from backend", res);

    if (res.data.status === "OK") {
      setItem(KEY_ACCESS_TOKEN, res.data.result.accessToken);
      originalRequest.headers[
        "Authorization"
      ] = `Bearer ${res.data.result.accessToken}`;
      return axios(originalRequest);
    }
  }
  return Promise.reject(error);
});
