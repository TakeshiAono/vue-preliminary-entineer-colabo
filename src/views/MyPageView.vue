<script setup lang="ts">
import { onBeforeMount } from "vue"

import ProjectSummary from "@/components/ProjectSummary.vue"
import { useProjectStore } from "@/stores/projectStore"
import { useUserStore } from "@/stores/userStore"
import { bulkFetch } from "@/utils/bulk"
import { ref } from "vue"
import { useRouter } from "vue-router"

const projectStore = useProjectStore()
const userStore = useUserStore()
const router = useRouter()
const modalVisible = ref(false)
const newProjectName = ref("")

onBeforeMount(async () => {
  await bulkFetch()
})
</script>

<template>
  <n-button
    style="width: 140px;"
    type="primary"
    @click="
      () => {
        modalVisible = true
      }
    "
  >
    プロジェクト作成
  </n-button>
  <ProjectSummary
    id="project-summary-wrapper"
    :users="userStore.getUsers()"
    :projects="projectStore.belongingProjects"
    :user-store="userStore"
    v-if="projectStore.belongingProjects.length > 0"
  />
  <n-modal
    :show="modalVisible"
    preset="dialog"
    positive-text="作成"
    negative-text="キャンセル"
    @positive-click="
      async () => {
        try {
          await projectStore.createProject(newProjectName, userStore.currentUser.id)
        } finally {
          router.go({ path: '/myPage', force: true })
        }
      }
    "
    @negative-click="
      () => {
        modalVisible = false
      }
    "
    title="新規プロジェクト作成"
  >
    <div id="project-name-input">
      <span>プロジェクト名 </span>
      <input type="text" v-model="newProjectName" />
    </div>
  </n-modal>
</template>

<style scoped>
</style>
