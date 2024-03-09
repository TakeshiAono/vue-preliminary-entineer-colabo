import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import VueCookies from 'vue-cookies'
import axios from 'axios'

export const useUserStore = defineStore('user', () => {
  const API_URL = import.meta.env.VITE_API_SERVER_URI
  const isLogin = ref(VueCookies.get('token'))

  async function login(email: string, password: string): Promise<any> {
    const response = await axios.post(`${API_URL}/login`, { password: password, email: email })
    // setToken(response.token)
    setToken(true)
    isLogin.value = true
    return response
  }

  async function logout(): Promise<any> {
    setToken(false)
    isLogin.value = false
  }

  async function accountCreate(name: string, email: string, password: string): Promise<any> {
    const response = await axios.post(`${API_URL}/account`, {
      name: name,
      password: password,
      email: email
    })
    // setToken(response.token)
    setToken(true)
    isLogin.value = true
    return response
  }

  function setToken(token: string | boolean) {
    VueCookies.set('token', token)
  }

  function getToken(): string | boolean {
    return VueCookies.get('token')
  }

  const getIsLogin = isLogin.value

  return { isLogin, login, getIsLogin, accountCreate, logout }
})
