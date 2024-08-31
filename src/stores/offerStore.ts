import axios from "axios"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useOfferStore = defineStore("offerStore", () => {
  const API_URL = import.meta.env.VITE_API_SERVER_URI

  const offerMessage = ref("")
  const offers = ref([])

  const setOfferMessage = (message: string) => {
    offerMessage.value = message
  }

  const submitOffer = async (userId: number, scoutedUserId: number, projectId: number) => {
    try {
      const response = await axios.post(`${API_URL}/offers/create`, {
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
      const response = await axios.get(`${API_URL}/offers/${offerId}`)
      return response.data
    } catch (error) {
      console.error("Error fetching offer details:", error)
      throw error
    }
  }

  return { offerMessage, offers, setOfferMessage, submitOffer, fetchOfferDetails }
})
