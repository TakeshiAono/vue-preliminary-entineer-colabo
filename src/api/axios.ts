import { api } from "@/api/axios"
import { useUserStore } from "@/stores/userStore"
export type { AxiosPromise } from "axios"

const API_URL = import.meta.env.VITE_API_SERVER_URI

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

// リフレッシュトークンの処理中フラグのみ保持
let isRefreshing = false

api.interceptors.response.use(
  (response) => {
    const userStore = useUserStore()
    userStore.isLoggedIn = true
    return response
  },
  async (error) => {
    const originalRequest = error.config
    const userStore = useUserStore()

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      if (!isRefreshing) {
        isRefreshing = true
        try {
          await api.post("/auth/refresh")
          isRefreshing = false
          userStore.isLoggedIn = true
          return api(originalRequest)
        } catch (refreshError) {
          isRefreshing = false
          userStore.isLoggedIn = false
          return Promise.reject(refreshError)
        }
      }
    }
    return Promise.reject(error)
  },
)
