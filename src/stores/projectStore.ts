import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useProjectStore = defineStore('project', () => {
  const API_URL = import.meta.env.VITE_API_SERVER_URI
  const belongingProjects = ref<Project[]>([])

  async function fetchProject(id: string): Promise<Project> {
    const response = await axios.get(`${API_URL}/projects/${id}`)
    return response.data
  }

  function getBelongingProjectIds() {
    return belongingProjects.value.map((belongingProject) => belongingProject.id)
  }

  async function setProjects(projectIds: string[]) {
    const projectList: Project[] = await Promise.all(
      projectIds.map(async (projectId) => {
        const project = await fetchProject(projectId)
        return project
      })
    )
    belongingProjects.value = projectList
  }

  return { belongingProjects, fetchProject, setProjects, getBelongingProjectIds }
})
