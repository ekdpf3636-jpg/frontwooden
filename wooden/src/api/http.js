import axios from "axios";

const http = axios.create({
  baseURL: "/api", // ✅ 여기서만 /api 사용
});

http.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("[API ERROR]", err?.response?.status, err?.response?.data || err);
    return Promise.reject(err);
  }
);

export default http;

