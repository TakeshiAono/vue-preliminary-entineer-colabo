import { defineStore } from 'pinia'
import axios from 'axios'

export const useMilestoneStore = defineStore('milestone', () => {
  const API_URL = import.meta.env.VITE_API_SERVER_URI

  async function fetchMilestones(projectId: number): Promise<ResponseMilestone[]> {
    const response = await axios.get(`${API_URL}/projects/${projectId}/milestones`)

    return response.data
  }

  return {
    fetchMilestones,
  }
})
