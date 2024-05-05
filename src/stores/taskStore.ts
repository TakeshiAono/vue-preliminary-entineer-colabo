import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import _ from 'lodash'

export const useTaskStore = defineStore('task', () => {
  const API_URL = import.meta.env.VITE_API_SERVER_URI

  const userId = ref<number | null>(null)
  const belongingProjectIds = ref<number[]>([])
  const tasksMaps = ref<TasksMap[]>([])

  async function initialize(projectIds: number[], userId: number) {
    await setProjectIds(projectIds)
    await setUserId(userId)
    await fetchTasks()
  }

  async function fetchTasks(): Promise<void> {
    const TasksOfProjects = await Promise.all(
      belongingProjectIds.value.map(async (projectId) => {
        const TasksOfProject = (
          await axios.get<TasksOfProject>(`${API_URL}/projects/${projectId}/tasks`)
        ).data
        return TasksOfProject
      })
    )

    tasksMaps.value = TasksOfProjects
  }

  function setUserId(id: number): void {
    userId.value = id
  }

  function setProjectIds(ids: number[]): void {
    belongingProjectIds.value = ids
  }

  function getTasksMaps(): TasksMap[] {
    return tasksMaps.value
  }

  function getTasksByProject(projectId: number): Task[] {
    return tasksMaps.value.filter((tasksMap: TasksMap) => tasksMap.projectId == projectId)[0].tasks
  }

  function getTasksByUserByProject(projectId: number, userId: number): Task[] {
    const tasksByProject = getTasksByProject(projectId)
    return _.groupBy(tasksByProject, (task) => task.inChargeUserId)[userId]
  }

  return {
    userId,
    belongingProjectIds,
    tasksMaps,
    initialize,
    setProjectIds,
    getTasksMaps,
    getTasksByProject,
    getTasksByUserByProject
  }
}, {
  persist: {
    storage: sessionStorage,
    paths: [
      'tasksMaps'
    ]
  }
})
