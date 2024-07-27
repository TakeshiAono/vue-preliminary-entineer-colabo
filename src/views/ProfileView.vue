<template>
  <main>
    <n-modal
      v-model:show="showModal"
      :mask-closable="false"
      preset="dialog"
      negative-text="キャンセル"
      @negative-click="onNegativeClick"
      class="custom-modal"
      :footer-class="customFooterClass"
    >
      <SubmitOffer :scoutedUserId="user?.id" />
    </n-modal>
    <!-- <p>ログイン中のユーザー{{ userStore.currentUser.name }}</p> -->
    <div id="selected-user-name">
      <h1>{{ user?.name }}さんのプロフィール</h1>
      <n-button @click="showModal = true"> オファーを出す </n-button>
    </div>
    <UserIntroduction :user="user" />
    <UserProjects :projectIds="user?.projectIds || []" />
    <UserFollowers :userId="user?.id" />
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
</script>

<style scoped>
#selected-user-name {
  display: flex;
  align-items: center;
  gap: 15px;
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
