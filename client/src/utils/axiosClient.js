import axios from "axios";
import {
  KEY_ACCESS_TOKEN,
  getItem,
  removeItem,
  setItem,
} from "./localStorageManager";
import store from "../redux/store";
import { setLoading, showToast } from "../redux/slices/appConfigSlice";
import { TOAST_FAILURE } from "../App";

let baseURL = "http://localhost:4000";
if (process.env.NODE_ENV === "production") {
  baseURL = process.env.REACT_APP_SERVER_BASE_URL;
}

export const axiosClient = axios.create({
  baseURL,
  withCredentials: true,
});

axiosClient.interceptors.request.use((request) => {
  const accessToken = getItem(KEY_ACCESS_TOKEN);
  request.headers["Authorization"] = `Bearer ${accessToken}`;
  store.dispatch(setLoading(true));
  return request;
});

axiosClient.interceptors.response.use(
  async (response) => {
    console.log("hksahf")
    store.dispatch(setLoading(false));
    const data = response.data;
    if (data.status === "OK") {
      return data;
    }
    const statusCode = data.statusCode;
    const error = data.message;
    const originalRequest = response.config;
    console.log(originalRequest)

    if (statusCode === 401 && !originalRequest._retry) {
      //access token expires
      originalRequest._retry = true;
      const res = await axios
        .create({
          withCredentials: true,
        })
        .get(`${baseURL}/auth/refresh`);
      if (res.data.status === "OK") {
        setItem(KEY_ACCESS_TOKEN, res.data.result.accessToken);
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${res.data.result.accessToken}`;
        return axiosClient(originalRequest);
      } else {
        //refresh token expires
        removeItem(KEY_ACCESS_TOKEN);
        window.location.replace("/login");
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
  async (error) => {
    store.dispatch(setLoading(false));
    store.dispatch(
      showToast({
        type: TOAST_FAILURE,
        message: error.message,
      })
    );
    return Promise.reject(error);
  }
);
