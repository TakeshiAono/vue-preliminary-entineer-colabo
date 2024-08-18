import axios from "axios"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useProjectStore = defineStore("project", () => {
  const API_URL = import.meta.env.VITE_API_SERVER_URI
  const belongingProjects = ref<ResponseProject[]>([])
  const projectUsersMaps = ref<{ projectId: number; userIds: number[] }[]>([])
  const allProjects = ref<ResponseProject[]>([])

  async function fetchProject(id: string): Promise<ResponseProject> {
    const response = await axios.get(`${API_URL}/projects/${id}`)
    return response.data
  }

  async function fetchAllProjects() {
    const response = await axios.get(`${API_URL}/projects`)
    allProjects.value = response.data
  }

  function getProjectById(projectId: number): ResponseProject | undefined {
    return allProjects.value.find((project) => project.id === projectId)
  }

  async function searchProjects(queryParamasString: string): Promise<ResponseProject> {
    const response = await axios.get(`${API_URL}/projects/search?${queryParamasString}`)
    return response.data
  }

  function getBelongingProjectIds() {
    return belongingProjects.value.map((belongingProject) => belongingProject.id)
  }

  async function setProjects(projectIds: number[]) {
    const projectList: ResponseProject[] = await Promise.all(
      projectIds.map(async (projectId) => {
        const project = await fetchProject(projectId)
        return project
      }),
    )
    const createdProjectUsersMaps = projectList.map((project) => {
      return { projectId: project.id, userIds: project.userIds }
    })
    projectUsersMaps.value = [...projectUsersMaps.value, ...createdProjectUsersMaps]
    belongingProjects.value = projectList
  }

  function getUserIdsByProject(projectId: number) {
    return projectUsersMaps.value.find((projectUsersMap) => projectUsersMap.projectId == projectId)
      ?.userIds
  }

  return {
    belongingProjects,
    projectUsersMaps,
    allProjects,
    fetchProject,
    fetchAllProjects,
    setProjects,
    getBelongingProjectIds,
    getUserIdsByProject,
    searchProjects,
    getProjectById,
  }
})
