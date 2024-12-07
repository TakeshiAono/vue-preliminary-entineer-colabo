import { useProjectStore } from "@/stores/projectStore"
import axios from "axios"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useApplicationStore = defineStore("applicationStore", () => {
  const API_URL = import.meta.env.VITE_API_SERVER_URI

  const applicationMessage = ref("")
  const applications = ref([])

  const projectStore = useProjectStore()

  const setApplicationMessage = (message: string) => {
    applicationMessage.value = message
  }

  // const submitOffer = async (userId: number, scoutedUserId: number, projectId: number) => {
  //   try {
  //     const response = await axios.post(`${API_URL}/offers/create`, {
  //       message: offerMessage.value,
  //       userId,
  //       scoutedUserId,
  //       projectId,
  //     })
  //     offers.value.push(response.data)
  //     offerMessage.value = ""
  //     console.log("Offer submitted response:", response)
  //   } catch (error) {
  //     console.error("Error submitting offer:", error)
  //   }
  // }

  const fetchApplicationDetails = async (applicationId: number) => {
    try {
      const response = await axios.get(`${API_URL}/applications/${applicationId}`)
      return response.data
    } catch (error) {
      console.error("Error fetching application details:", error)
      throw error
    }
  }

  const acceptApplication = async (applicationId: number) => {
    try {
      const response = await axios.post(`${API_URL}/applications/accept/${applicationId}`)
      const responseData = response.data // APIのレスポンスデータを取得

      if (responseData && responseData.project) {
        const project = responseData.project
        projectStore.addProject(project) // プロジェクトを追加
      } else {
        console.error("Project data is missing in the response.")
      }

      console.log("Application accepted response:", responseData)
    } catch (error) {
      console.error("Error accepting application:", error)
      throw error
    }
  }

  return {
    applicationMessage,
    applications,
    setApplicationMessage,
    fetchApplicationDetails,
    acceptApplication,
  }
})
