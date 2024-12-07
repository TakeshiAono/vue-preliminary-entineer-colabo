import { api } from "@/api/axios"
import { defineStore } from "pinia"
import { ref, type Ref } from "vue"
import VueCookies from "vue-cookies"

export interface UserStore {
  isLogin: Ref<boolean | string>
  login: (email: string, password: string) => Promise<any>
  getIsLogin: boolean | string
  accountCreate: (name: string, email: string, password: string) => Promise<any>
  logout: () => Promise<any>
  currentUser: Ref<ResponseUser>
  getCurrentUser: () => User
  haveProjectIds: Ref<number[] | null>
  getUserInfo: (id: number) => Promise<ResponseUser>
  addUsersByProject: (project: Project) => void
  getUsers: () => void
  users: User[]
}

export const useUserStore = defineStore(
  "user",
  (): UserStore => {
    const isLogin = ref(VueCookies.get("token"))
    const currentUser = ref<ResponseUser | null>(null)
    const users = ref<User[]>([])
    const haveProjectIds = ref<number[] | null>(null)

    async function login(email: string, password: string): Promise<any> {
      const response = await api.post("/login", { password, email })
      console.log("response.data", response.data)
      isLogin.value = "true"
      // await _fetchUserInfo(response.data.id)
      return response
    }

    async function logout(): Promise<any> {
      _setToken("false", "", "")
      isLogin.value = false
      users.value = []
    }

    async function getUserInfo(id: number): Promise<ResponseUser> {
      const responseUser = await api.get<ResponseUser>(`/users/${id}`)
      return responseUser.data
    }

    async function accountCreate(name: string, email: string, password: string): Promise<any> {
      const response = await api.post("/account", {
        name: name,
        password: password,
        email: email,
      })
      _setToken("true", email, password)
      await _fetchUserInfo(response.data.id)
      isLogin.value = "true"
      return response
    }

    async function addUsersByProject(project: Project): Promise<void> {
      const users = await Promise.all(
        project.userIds.map(async (userId) => await _fetchUser(Number(userId))),
      )

      _addUsers(users as User[])
    }

    function getCurrentUser() {
      return currentUser.value
    }

    function getUsers() {
      return users.value
    }

    async function _fetchUserInfo(id: number): Promise<void> {
      currentUser.value = await _fetchUser(id)
      _addUser(currentUser.value)
      _storeProjectIds(currentUser.value.projectIds)
    }

    async function _fetchUser(userId: number) {
      const responseUser = await api.get<ResponseUser>(`/users/${userId}`)
      return responseUser.data
    }

    async function _storeProjectIds(projectIds: number[]) {
      haveProjectIds.value = projectIds
    }

    function _addUser(user: User): void {
      if (!users.value.some((u) => u.id === user.id)) {
        users.value.push(user)
      }
    }

    function _addUsers(users: User[]): void {
      users.forEach((user) => {
        _addUser(user)
      })
    }

    const getIsLogin = isLogin.value

    return {
      isLogin,
      users,
      login,
      getIsLogin,
      accountCreate,
      logout,
      currentUser,
      getCurrentUser,
      haveProjectIds,
      getUserInfo,
      addUsersByProject,
      getUsers,
    }
  },
  {
    persist: {
      storage: sessionStorage,
      paths: ["users"],
    },
  },
)
