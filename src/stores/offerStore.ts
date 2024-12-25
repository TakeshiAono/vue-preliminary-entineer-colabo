import { useProjectStore } from "@/stores/projectStore"
import { api } from "@/api/axios"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useOfferStore = defineStore("offerStore", () => {
  const offerMessage = ref("")
  const offers = ref([])

  const projectStore = useProjectStore()

  const setOfferMessage = (message: string) => {
    offerMessage.value = message
  }

  const submitOffer = async (userId: number, scoutedUserId: number, projectId: number) => {
    try {
      const response = await api.post("/offers/create", {
        message: offerMessage.value,
        userId,
        scoutedUserId,
        projectId,
      })
      offers.value.push(response.data)
      offerMessage.value = ""
      console.log("Offer submitted response:", response)
    } catch (error) {
      console.error("Error submitting offer:", error)
    }
  }

  const fetchOfferDetails = async (offerId: number) => {
    try {
      const response = await api.get(`/offers/${offerId}`)
      return response.data
    } catch (error) {
      console.error("Error fetching offer details:", error)
      throw error
    }
  }

  const acceptOffer = async (offerId: number) => {
    try {
      const response = await api.post(`/offers/accept/${offerId}`)
      const responseData = response.data // APIのレスポンスデータを取得

      if (responseData && responseData.project) {
        const project = responseData.project
        projectStore.addProject(project) // プロジェクトを追加
      } else {
        console.error("Project data is missing in the response.")
      }

      console.log("Offer accepted response:", responseData)
    } catch (error) {
      console.error("Error accepting offer:", error)
      throw error
    }
  }

  return { offerMessage, offers, setOfferMessage, submitOffer, fetchOfferDetails, acceptOffer }
})
