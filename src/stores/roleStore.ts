import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRoleStore = defineStore('role', () => {
  const API_URL = import.meta.env.VITE_API_SERVER_URI
  const roles = ref<Role[]>([])

  async function fetchRoles(): Promise<void> {
    const response = await axios.get<Role[]>(`${API_URL}/roles`)
    roles.value = response.data
  }

  function getRoleById(id: number): Role | undefined {
    return roles.value.find(role => role.id === id)
  }

  return {
    roles,
    fetchRoles,
    getRoleById
  }
})
