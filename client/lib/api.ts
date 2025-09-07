import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3002";

export const api = axios.create({
  baseURL,
  withCredentials: true,
});
