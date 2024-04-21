import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import VueCookies from 'vue-cookies'
import axios from 'axios'

export interface UserStore {
  isLogin: Ref<boolean | string>;
  login: (email: string, password: string) => Promise<any>;
  getIsLogin: boolean | string;
  accountCreate: (name: string, email: string, password: string) => Promise<any>;
  logout: () => Promise<any>;
  currentUser: Ref<GetResponseUser | null>;
  getCurrentUser: () => GetResponseUser | null;
  haveProjectIds: Ref<string[] | null>;
  getUserInfo: (id: number) => Promise<GetResponseUser>;
}

export const useUserStore = defineStore('user', (): UserStore => {
  const API_URL = import.meta.env.VITE_API_SERVER_URI
  const isLogin = ref(VueCookies.get('token'))
  const currentUser = ref<GetResponseUser | null>(null)
  const users = ref([])
  const haveProjectIds = ref<string[] | null>(null)

  async function login(email: string, password: string): Promise<any> {
    const response = await axios.post(`${API_URL}/login`, { password: password, email: email })
    _setToken('true', email, password)
    isLogin.value = 'true'
    await _fetchUserInfo(response.data.id)
    return response
  }

  async function logout(): Promise<any> {
    _setToken('false', '', '')
    isLogin.value = false
  }

  async function getUserInfo(id: number): Promise<GetResponseUser> {
    const responseUser = await axios.get<GetResponseUser>(`${API_URL}/users/${id}`)
    return responseUser
  }

  async function accountCreate(name: string, email: string, password: string): Promise<any> {
    const response = await axios.post(`${API_URL}/account`, {
      name: name,
      password: password,
      email: email
    })
    _setToken('true', email, password)
    await _fetchUserInfo(response.data.id)
    isLogin.value = 'true'
    return response
  }

  function getCurrentUser() {
    return currentUser.value
  }

  async function _fetchUserInfo(id: number): Promise<void> {
    const responseUser = await axios.get<GetResponseUser>(`${API_URL}/users/${id}`)
    currentUser.value = responseUser.data
    _addUser(responseUser.data)
    haveProjectIds.value = responseUser.data.projectIds
  }

  function _setToken(token: string | boolean, email: string, password: string) {
    VueCookies.set('token', token)
    VueCookies.set('email', email)
    VueCookies.set('password', password)
  }

  function _getToken(): string | boolean {
    return VueCookies.get('token')
  }

  function _addUser(user: User): void {
    users.value = users.value.some(u => u.id === user.id) ? users : [...users, user];
  }

  const getIsLogin = isLogin.value

  return {
    isLogin,
    login,
    getIsLogin,
    accountCreate,
    logout,
    currentUser,
    getCurrentUser,
    haveProjectIds,
    getUserInfo
  }
})
