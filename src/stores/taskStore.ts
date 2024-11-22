import { ref } from "vue"
import { defineStore } from "pinia"
import axios from "axios"

export type searchTasksParams = {
  name?: string
  description?: string
  projectId?: number
  userId?: number
  milestoneId?: number
  deadlineFromDate?: string
  deadlineToDate?: string
  isDone?: boolean
}

export const useTaskStore = defineStore(
  "task",
  () => {
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
        }),
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
      return tasksMaps.value.filter((tasksMap: TasksMap) => tasksMap.projectId == projectId)[0]
        .tasks
    }

    async function searchTasks(params: searchTasksParams): Promise<ResponseTask[]> {
      const response = await axios.get<ResponseSearchTasks>(`${API_URL}/tasks`, { params })
      const responseTasks: ResponseTask[] = response.data.tasks

      return responseTasks
    }

    async function createTask(params: {
      name: string
      description: string
      projectId: number
      inChargeUserId: number
    }) {
      try {
        // タスクをバックエンドに追加
        await axios.post<ResponseTask>(`${API_URL}/tasks/create`, params)
      } catch (error) {
        console.error("タスクの作成に失敗しました:", error)
        throw error
      }
    }

    async function updateTask(
      id: number,
      params: {
        name: string
        description: string
        projectId: number
        inChargeUserId: number
      },
    ) {
      try {
        await axios.patch<ResponseTask>(`${API_URL}/tasks/${id}`, params)
      } catch (error) {
        console.error("タスクの更新に失敗しました:", error)
        throw error
      }
    }

    return {
      userId,
      belongingProjectIds,
      tasksMaps,
      initialize,
      setProjectIds,
      getTasksMaps,
      getTasksByProject,
      searchTasks,
      createTask,
      updateTask,
    }
  },
  {
    persist: {
      storage: sessionStorage,
      paths: ["tasksMaps"],
    },
  },
)
