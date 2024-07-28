<template>
  <main>
    <!-- <p>ログイン中のユーザー{{ userStore.currentUser.name }}</p> -->
    <div id="selected-user-name">
      <h1>{{ user?.name }}さんのプロフィール</h1>
      <n-button @click="showModal = true"> オファーを出す </n-button>
    </div>
    <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
    <UserIntroduction :user="user" />
    <UserProjects :projectIds="user?.projectIds || []" />
    <UserFollowers :userId="user?.id" />
    <SubmitOffer
      v-if="showModal"
      :scoutedUserId="user?.id"
      v-model:show="showModal"
      @update:show="showModal = $event"
      @cancel="handleClose"
      @success="handleSuccess"
    />
  </main>
</template>

<script setup lang="ts">
import SubmitOffer from "@/components/SubmitOffer.vue"
import UserFollowers from "@/components/UserFollowers.vue"
import UserProjects from "@/components/UserProjects.vue"
import { useProjectStore } from "@/stores/projectStore"
import { useUserStore } from "@/stores/userStore"
import { User } from "@/types"
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"

const showModal = ref(false)
const successMessage = ref<string | null>(null)

const userStore = useUserStore()
const user = ref<User | null>(null)
const userProjectIds = ref<number[]>([])
const route = useRoute()
const userId = parseInt(route.params.id as string, 10)
const projectStore = useProjectStore()

onMounted(async () => {
  try {
    const userInfo = await userStore.getUserInfo(userId)
    user.value = userInfo
    if (userInfo?.projectIds) {
      await projectStore.setProjects(userInfo.projectIds)
      userProjectIds.value = projectStore.getBelongingProjectIds()
    }
  } catch (error) {
    console.error("Error fetching user info:", error)
  }
})

const handleClose = () => {
  showModal.value = false
}

const handleSuccess = () => {
  showModal.value = false
  successMessage.value = "オファーを送信しました！"
}
</script>

<style scoped>
#selected-user-name {
  display: flex;
  align-items: center;
  gap: 15px;
}
.success-message {
  color: green;
  margin-top: 1rem;
}
</style>
