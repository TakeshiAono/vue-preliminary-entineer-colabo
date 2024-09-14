<template>
  <h1 id="project-user-notice-title">お知らせ</h1>
  <div id="project-user-notice-content">
    <p class="user-notice" v-for="userNotice in props.userNoticeLogs" :key="userNotice.id">
      <span v-if="userNotice.offerId" @click="openModal(userNotice)" class="clickable-log">
        {{ userNotice.log }}
      </span>
      <span v-else>
        {{ userNotice.log }}
      </span>
    </p>

    <n-modal
      v-model:show="showModal"
      @update:show="handleClose"
      :mask-closable="false"
      preset="dialog"
      class="custom-modal"
    >
      <h2 class="title">オファー詳細</h2>
      <div v-if="offerContent">
        <p>{{ offerContent.userName }}さんからのオファーです。</p>
        <p>プロジェクト名: {{ offerContent.projectName }}</p>
        <p>メッセージ: {{ offerContent.message }}</p>
      </div>
      <div class="button-container">
        <n-button @click="closeModal" class="cancel-btn">閉じる</n-button>
        <n-button type="primary" @click="acceptOffer" class="offer-accept-btn"
          >オファーを受ける</n-button
        >
      </div>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { useOfferStore } from "@/stores/offerStore"
import { ref } from "vue"

const props = defineProps<{ userNoticeLogs: { id: number; log: string; offerId?: number }[] }>()

const offerStore = useOfferStore()
const showModal = ref(false)
const selectedOfferDetails = ref<{ log: string; offerId?: number } | null>(null)
const offerContent = ref<{
  offerId: number
  message: string
  projectName: string
  userName: string
} | null>(null)

const openModal = async (offerDetails: { log: string; offerId?: number }) => {
  selectedOfferDetails.value = offerDetails
  if (offerDetails.offerId) {
    try {
      offerContent.value = await offerStore.fetchOfferDetails(offerDetails.offerId)
    } catch (error) {
      console.error("Error fetching offer details:", error)
    }
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  offerContent.value = null
}

const handleClose = (value: boolean) => {
  showModal.value = value
  if (!value) {
    selectedOfferDetails.value = null
    offerContent.value = null
  }
}

const acceptOffer = async () => {
  if (offerContent.value && offerContent.value.id) {
    try {
      // offerStoreを使ってオファーを受け入れる処理
      await offerStore.acceptOffer(offerContent.value.id)
      console.log("Offer accepted successfully")
      closeModal()
    } catch (error) {
      console.error("Error accepting the offer:", error)
    }
  } else {
    console.error("offerContent or offerId is undefined")
  }
}
</script>

<style scoped>
#project-user-notice-title {
  text-decoration: underline;
}

#project-user-notice-content {
  width: 200px;
  height: 90%;
  border-radius: 10px;
  border: solid;
}

.user-notice {
  margin: 5px;
}

.clickable-log {
  cursor: pointer;
  color: blue;
  text-decoration: underline;
}

.title {
  margin-bottom: 10px;
}

.button-container {
  display: flex;
  gap: 10px;
  margin-top: 10px;
  justify-content: flex-end;
}

.custom-modal {
  width: 50vw !important;
  max-width: 90vw;
  max-height: 90vh;
}
</style>
