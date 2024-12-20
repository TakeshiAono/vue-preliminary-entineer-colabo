import { defineStore } from "pinia"
import { api } from "@/api/axios"

export const useMilestoneStore = defineStore("milestone", () => {
  async function fetchMilestones(projectId: number): Promise<ResponseMilestone[]> {
    const response = await api.get(`/projects/${projectId}/milestones`)

    return response.data
  }

  return {
    fetchMilestones,
  }
})
