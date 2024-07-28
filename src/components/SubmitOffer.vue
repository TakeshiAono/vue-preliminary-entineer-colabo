<template>
  <main>
    <n-modal
      v-model:show="showModal"
      @update:show="handleClose"
      :mask-closable="false"
      preset="dialog"
      class="custom-modal"
    >
      <h2 class="title">オファーメッセージ</h2>
      <div v-if="errorMessages.length" class="error-message">
        <ul>
          <li v-for="msg in errorMessages" :key="msg">{{ msg }}</li>
        </ul>
      </div>
      <div id="offer-input">
        <n-select
          v-model:value="selectedProject"
          :options="projectOptions"
          placeholder="プロジェクトを選択"
          @update:value="logSelectedProject"
          class="offer-selector"
        />
        <textarea
          v-model="offerStore.offerMessage"
          placeholder="オファーメッセージを入力してください"
          rows="30"
          class="offer-textarea"
        ></textarea>
        <div class="button-container">
          <n-button @click="cancel" class="cancel-btn">キャンセル</n-button>
          <n-button type="primary" @click="submitOffer" class="offer-submit-btn"
            >オファーを出す</n-button
          >
        </div>
      </div>
    </n-modal>
  </main>
</template>

<script setup lang="ts">
import { useOfferStore } from "@/stores/offerStore"
import { useProjectStore } from "@/stores/projectStore"
import { useUserStore } from "@/stores/userStore"
import { onMounted, ref, watch } from "vue"

const props = defineProps<{ scoutedUserId: number; show: boolean }>()

const emit = defineEmits<{
  (event: "cancel"): void
  (event: "success"): void
}>()

const showModal = ref(props.show)

watch(
  () => props.show,
  (newVal) => {
    showModal.value = newVal
  },
)

const userStore = useUserStore()
const projectStore = useProjectStore()
const offerStore = useOfferStore()

const selectedProject = ref<number | null>(null)
const projectOptions = ref<{ label: string; value: number }[]>([])
const errorMessages = ref<string[]>([])

onMounted(() => {
  const projects = projectStore.belongingProjects
  projectOptions.value = projects.map((project) => ({ label: project.name, value: project.id }))
})

const logSelectedProject = (value: number) => {
  console.log("Selected project:", value)
  selectedProject.value = value
}

const submitOffer = async () => {
  errorMessages.value = []

  if (selectedProject.value === null) {
    errorMessages.value.push("プロジェクトを選択してください")
  }
  if (!offerStore.offerMessage.trim()) {
    errorMessages.value.push("オファーメッセージを入力してください")
  }
  if (errorMessages.value.length > 0) {
    return // エラーメッセージがある場合は処理を中断
  }

  try {
    const offerData = {
      message: offerStore.offerMessage,
      userId: userStore.currentUser.id,
      scoutedUserId: props.scoutedUserId,
      projectId: selectedProject.value,
    }
    console.log("Submitting offer data:", offerData)
    await offerStore.submitOffer(offerData.userId, offerData.scoutedUserId, offerData.projectId)
    emit("success")
  } catch (error) {
    console.error("Error submitting offer:", error)
    errorMessages.value.push("オファーの送信中にエラーが発生しました")
  }
}

const cancel = () => {
  emit("cancel")
}
const handleClose = (value: boolean) => {
  emit("update:show", value)
}
</script>

<style scoped>
#offer-input {
  width: 100%;
  height: 65vh;
  display: flex;
  flex-direction: column;
}
.error-message {
  color: red;
  margin-top: 1rem;
}
.title {
  margin-bottom: 10px;
}
.offer-selector {
  width: 50%;
  margin-bottom: 10px;
  align-self: flex-start;
}
.offer-textarea {
  height: 80%;
  box-sizing: border-box;
  outline: none;
  resize: none;
}
.button-container {
  display: flex;
  gap: 10px;
  margin-top: 10px;
  align-self: flex-end;
}
.n-dialog__content {
  margin-bottom: 0;
}
</style>

<style>
.n-dialog__title .n-dialog__icon {
  display: none;
}
.n-dialog__content {
  margin-bottom: 8px !important;
}
.custom-modal {
  width: 50vw !important;
  max-width: 90vw;
  max-height: 90vh;
}
</style>
