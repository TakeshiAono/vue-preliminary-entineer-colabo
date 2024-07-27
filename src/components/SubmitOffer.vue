<template>
  <main>
    <h2>オファーを出す</h2>
    <div id="offer-input">
      <textarea
        v-model="offerStore.offerMessage"
        placeholder="オファーメッセージを入力"
        rows="10"
        cols="20"
      ></textarea>
      <p><n-button type="primary" @click="submitOffer">オファーを出す</n-button></p>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useOfferStore } from "@/stores/offerStore"
import { useUserStore } from "@/stores/userStore"

const props = defineProps<{ scoutedUserId: number }>()

const userStore = useUserStore()
const offerStore = useOfferStore()

const submitOffer = async () => {
  try {
    console.log("Offer message:", offerStore.offerMessage)
    await offerStore.submitOffer(userStore.currentUser.id, props.scoutedUserId)
  } catch (error) {
    console.error("Error submitting offer:", error)
  }
}
</script>

<style scoped>
#offer-input {
  width: 200px;
  height: auto;
  border-radius: 10px;
  border: solid;
  padding: 10px;
}

p {
  margin: 0;
}
</style>
