<template>
  <h1 id="project-user-notice-title">お知らせ</h1>
  <div id="project-user-notice-content">
    <p class="user-notice" v-for="userNotice in props.userNoticeLogs" :key="userNotice.id">
      <span v-if="userNotice.offerId" @click="openModal(userNotice)" class="clickable-log">
        {{ userNotice.log }}
      </span>
      <span v-if="userNotice.applicationId" @click="openModal(userNotice)" class="clickable-log">
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
      <template v-if="offerContent">
        <h2 class="title">オファー詳細</h2>
        <div v-if="offerContent">
          <p>{{ offerContent.userName }}さんからのオファーです。</p>
          <p>プロジェクト名: {{ offerContent.projectName }}</p>
          <p>メッセージ: {{ offerContent.message }}</p>
        </div>
        <div class="button-container">
          <n-button @click="closeModal" class="cancel-btn">閉じる</n-button>
          <n-button
            type="primary"
            @click="acceptOffer"
            class="offer-accept-btn"
            :disabled="isOfferAccepted"
            :style="{ '--n-border-disabled': isButtonDisabled ? 'none' : '' }"
            >オファーを受ける</n-button
          >
        </div>
      </template>

      <template v-else-if="applicationContent">
        <h2 class="title">参加リクエスト詳細</h2>
        <div v-if="applicationContent">
          <p>{{ applicationContent.userName }}さんからの参加リクエストです。</p>
          <p>プロジェクト名: {{ applicationContent.projectName }}</p>
          <p>メッセージ: {{ applicationContent.message }}</p>
        </div>
        <div class="button-container">
          <n-button @click="closeModal" class="cancel-btn">閉じる</n-button>
          <n-button
            type="primary"
            @click="acceptApplication"
            class="offer-accept-btn"
            :disabled="isApplicationAccepted"
            :style="{ '--n-border-disabled': isButtonDisabled ? 'none' : '' }"
            >参加リクエストを受ける</n-button
          >
        </div>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { useApplicationStore } from "@/stores/applicationStore"
import { useOfferStore } from "@/stores/offerStore"
import { ref } from "vue"

const props = defineProps<{
  userNoticeLogs: { id: number; log: string; offerId?: number; applicationId?: number }[]
}>()

const offerStore = useOfferStore()
const showModal = ref(false)
const selectedOfferDetails = ref<{ log: string; offerId?: number } | null>(null)
const offerContent = ref<{
  offerId: number
  message: string
  projectName: string
  userName: string
  isAccepted?: boolean
} | null>(null)

const applicationStore = useApplicationStore()
const selectedApplicationDetails = ref<{ log: string; applicationId?: number } | null>(null)
const applicationContent = ref<{
  offerId: number
  message: string
  projectName: string
  userName: string
  isAccepted?: boolean
} | null>(null)

const isOfferAccepted = ref(false) // 承諾済みかどうかを追跡
const isApplicationAccepted = ref(false) // 承諾済みかどうかを追跡

const openModal = async (noticeDetails: {
  log: string
  offerId?: number
  applicationId?: number
}) => {
  if (noticeDetails.offerId) {
    selectedOfferDetails.value = noticeDetails
    try {
      offerContent.value = await offerStore.fetchOfferDetails(offerDetails.offerId)
      isOfferAccepted.value = offerContent.value?.isAccepted ?? false
    } catch (error) {
      console.error("Error fetching offer details:", error)
    }
  } else if (noticeDetails.applicationId) {
    selectedApplicationDetails.value = noticeDetails
    try {
      applicationContent.value = await applicationStore.fetchApplicationDetails(
        noticeDetails.applicationId,
      )
      isApplicationAccepted.value = applicationContent.value?.isAccepted ?? false
    } catch (error) {
      console.error("Error fetching application details:", error)
    }
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  offerContent.value = null
  applicationContent.value = null
}

const handleClose = (value: boolean) => {
  showModal.value = value
  if (!value) {
    selectedOfferDetails.value = null
    selectedApplicationDetails.value = null
    offerContent.value = null
    applicationContent.value = null
  }
}

const acceptOffer = async () => {
  if (offerContent.value && offerContent.value.id) {
    try {
      await offerStore.acceptOffer(offerContent.value.id)
      console.log("Offer accepted successfully")
      // 承諾済みフラグを true に設定
      isOfferAccepted.value = true
      offerContent.value.isAccepted = true

      closeModal()
    } catch (error) {
      console.error("Error accepting the offer:", error)
    }
  } else {
    console.error("offerContent or offerId is undefined")
  }
}

const acceptApplication = async () => {
  if (applicationContent.value && applicationContent.value.id) {
    try {
      await applicationStore.acceptApplication(applicationContent.value.id)
      console.log("Application accepted successfully")
      isApplicationAccepted.value = true
      applicationContent.value.isAccepted = true

      closeModal()
    } catch (error) {
      console.error("Error accepting the application:", error)
    }
  } else {
    console.error("applicationContent or applicationId is undefined")
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

.offer-accept-btn:disabled {
  background-color: gray;
  color: white;
  cursor: default;
}

.custom-modal {
  width: 50vw !important;
  max-width: 90vw;
  max-height: 90vh;
}
</style>
