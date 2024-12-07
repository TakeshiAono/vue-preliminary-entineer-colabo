import axios from "axios"
export type { AxiosPromise } from "axios"

const API_URL = import.meta.env.VITE_API_SERVER_URI

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})
