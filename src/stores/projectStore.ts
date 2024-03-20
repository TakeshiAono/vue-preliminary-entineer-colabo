import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import VueCookies from 'vue-cookies'
import axios from 'axios'
import { useUserStore } from './userStore'

export const useProjectStore = defineStore('project', () => {
  const API_URL = import.meta.env.VITE_API_SERVER_URI
  const belongsProjects = ref<Project[]>([])

  async function getProject(id: string): Promise<Project> {
    const response = await axios.get(`${API_URL}/projects/${id}`)
    return response
  }

  async function setProjects(projectIds: string[]) {
    await projectIds.forEach(async (projectId) => {
      const project = await getProject(projectId)
      belongsProjects.value.push(project.data)
    })
  }

  return { belongsProjects, getProject, setProjects }
})
