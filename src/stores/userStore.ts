import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import VueCookies from 'vue-cookies'
import axios from 'axios'

export const useUserStore = defineStore('user', () => {
  const API_URL = import.meta.env.VITE_API_SERVER_URI
  const isLogin = ref(VueCookies.get('token'))
  const currentUser = ref<GetResponseUser | null>(null)
  const haveProjectIds = ref<string[] | null>(null)

  async function login(email: string, password: string): Promise<any> {
    const response = await axios.post(`${API_URL}/login`, { password: password, email: email })
    setToken('true', email, password)
    isLogin.value = 'true'
    await fetchUserInfo(response.data.id)
    return response
  }

  async function logout(): Promise<any> {
    setToken('false', '', '')
    isLogin.value = false
  }

  async function fetchUserInfo(id: number): Promise<void> {
    const responseUser = await axios.get<GetResponseUser>(`${API_URL}/users/${id}`)
    currentUser.value = responseUser.data
    haveProjectIds.value = responseUser.data.projectIds
  }

  async function accountCreate(name: string, email: string, password: string): Promise<any> {
    const response = await axios.post(`${API_URL}/account`, {
      name: name,
      password: password,
      email: email
    })
    setToken('true', email, password)
    await fetchUserInfo(response.data.id)
    isLogin.value = 'true'
    return response
  }

  function setToken(token: string | boolean, email: string, password: string) {
    VueCookies.set('token', token)
    VueCookies.set('email', email)
    VueCookies.set('password', password)
  }

  function getToken(): string | boolean {
    return VueCookies.get('token')
  }

  function getCurrentUser() {
    return currentUser.value
  }

  const getIsLogin = isLogin.value

  return {
    isLogin,
    login,
    getIsLogin,
    accountCreate,
    logout,
    currentUser,
    fetchUserInfo,
    getCurrentUser,
    haveProjectIds
  }
})
