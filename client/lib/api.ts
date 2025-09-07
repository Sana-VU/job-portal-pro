import axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3001'

export const api = axios.create({
  baseURL,
  withCredentials: true
})
