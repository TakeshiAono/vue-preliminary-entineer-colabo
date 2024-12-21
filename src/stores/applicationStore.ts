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

  const submitApplication = async (userId: number, projectId: number) => {
    try {
      if (!applicationMessage.value.trim()) {
        throw new Error("メッセージを入力してください。")
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_SERVER_URI}/applications/create`,
        {
          message: applicationMessage.value,
          userId,
          projectId,
        },
      )
      applications.value.push(response.data)
      applicationMessage.value = ""
      console.log("Application submitted response:", response)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // バックエンドからのエラーメッセージを取得
        const errorMessage = error.response?.data?.message || "応募の送信中にエラーが発生しました"
        throw new Error(errorMessage) // エラーメッセージを含むErrorオブジェクトをスロー
      }
      throw new Error("応募の送信中にエラーが発生しました")
    }
  }

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
    submitApplication,
    fetchApplicationDetails,
    acceptApplication,
  }
})
