import { api } from "@/api/axios"
import { defineStore } from "pinia"
import { ref } from "vue"
import type { ResponseChannel, ResponseProject } from "./API"

export const useProjectStore = defineStore("project", () => {
  const belongingProjects = ref<ResponseProject[]>([])
  const projectUsersMaps = ref<{ projectId: number; userIds: number[] }[]>([])
  const allProjects = ref<ResponseProject[]>([])

  async function fetchProject(id: string): Promise<ResponseProject> {
    const response = await api.get(`/projects/${id}`)
    return response.data
  }

  async function fetchChannels(channelIds: number[], currentUserId: number): Promise<ResponseChannel[]> {
    const response = await axios.get<ResponseChannel[]>(`${API_URL}/channels`, {
      params: {
        ids: channelIds,
        userId: currentUserId,
      },
      paramsSerializer: { indexes: null },
    })
    return response.data
  }

  async function fetchAllProjects() {
    const response = await api.get("/projects")
    allProjects.value = response.data
  }

  function getProjectById(projectId: number): ResponseProject | undefined {
    return allProjects.value.find((project) => project.id === projectId)
  }

  async function searchProjects(queryParamasString: string): Promise<ResponseProject> {
    const response = await api.get(`/projects/search?${queryParamasString}`)
    return response.data
  }

  function getBelongingProjectIds() {
    return belongingProjects.value.map((belongingProject) => belongingProject.id)
  }

  async function setProjects(projectIds: number[]) {
    const projectList: ResponseProject[] = await Promise.all(
      projectIds.map(async (projectId) => {
        const project = await fetchProject(projectId.toString())
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

  function addProject(project: ResponseProject) {
    if (!project || !project.id) {
      console.error("Invalid project data:", project)
      return
    }

    const exists = belongingProjects.value.some((p) => p.id === project.id)
    if (!exists) {
      belongingProjects.value.push(project)
      projectUsersMaps.value.push({
        projectId: project.id,
        userIds: project.userIds,
      })
    }
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
    addProject,
    fetchChannels,
  }
})
