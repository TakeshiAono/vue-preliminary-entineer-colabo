<script setup lang="ts">
import ApplicationForm from "@/components/ApplicationForm.vue"
import DashboardContainerForProjectView from "@/components/DashboardContainerForProjectView.vue"
import ProjectDescription from "@/components/ProjectDescription.vue"

import { useApplicationStore } from "@/stores/applicationStore"
import { useProjectStore } from "@/stores/projectStore"
import { useUserStore } from "@/stores/userStore"
import { computed, onMounted, ref } from "vue"
import { useRoute } from "vue-router"

const userStore = useUserStore()
const projectStore = useProjectStore()
const project = ref({ name: "", description: "" })
const projectUsers = ref([])
const route = useRoute()
const projectId = parseInt(route.params.id as string, 10)
const tasks = ref([])
const applicationMessage = ref("")
const applicationStore = useApplicationStore()

const successMessage = ref("")
const errorMessage = ref("")

// プロジェクトメンバーかどうかをチェック
const isProjectMember = computed(() => {
  return projectUsers.value.some((user) => user.id === userStore.currentUser?.id)
})

const handleApplicationSubmit = async (message: string) => {
  try {
    if (isProjectMember.value) {
      errorMessage.value = "あなたは既にプロジェクトのメンバーです"
      return
    }

    errorMessage.value = ""
    successMessage.value = ""
    const userStore = useUserStore()
    applicationStore.applicationMessage = message
    await applicationStore.submitApplication(userStore.currentUser.id, projectId)
    successMessage.value = "メッセージが送信されました"
  } catch (error) {
    if (error instanceof Error) {
      errorMessage.value = error.message // Errorオブジェクトからメッセージを取得
    } else {
      errorMessage.value = "応募の送信中にエラーが発生しました"
    }
  }
}

onMounted(async () => {
  project.value = await projectStore.fetchProject(projectId)
  if (project.value?.userIds) {
    const users = await Promise.all(
      project.value.userIds.map(async (userId: number) => await userStore.getUserInfo(userId)),
    )
    projectUsers.value = users
  }
})
</script>

<template>
  <main>
    <div v-if="errorMessage" class="message error-message">
      {{ errorMessage }}
    </div>
    <!-- 成功メッセージの表示 -->
    <div v-if="successMessage" class="message success-message">
      {{ successMessage }}
    </div>
    <h1>{{ project.name }}</h1>
    <div v-if="project" id="project-layout">
      <div id="left-side">
        <ProjectDescription :description="project.description" :width="'100%'" />
        <h1 id="project-member-title">メンバー</h1>
        <div id="project-member-content">
          <div v-if="projectUsers.length">
            <p v-for="user in projectUsers" :key="user.id">{{ user.name }}</p>
          </div>
        </div>
      </div>
      <div id="right-side">
        <ApplicationForm @submit="handleApplicationSubmit" />

        <DashboardContainerForProjectView
          v-if="projectUsers.length > 0 && project.name !== ''"
          :tasks="[]"
          :projects="[project]"
          :selectedProjectId="projectId"
          :users="projectUsers"
        />
      </div>
    </div>
  </main>
</template>

<style scoped>
#project-layout {
  display: flex;
  gap: 50px;
}

#left-side {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 80px;
}

#right-side {
  flex: 3;
  margin-right: 80px;
}

#project-member-content {
  height: 320px;
  border-radius: 10px;
  border: solid;
}

.success-message {
  position: fixed; /* 画面に固定 */
  top: 50px; /* 上からの距離 */
  left: 50%; /* 左端から50%の位置 */
  transform: translateX(-50%); /* 要素の幅の半分だけ左に移動 */
  padding: 1rem 2rem;
  color: red;
  z-index: 50; /* 他の要素の上に表示 */
}
.error-message {
  position: fixed; /* 画面に固定 */
  top: 50px; /* 上からの距離 */
  left: 50%; /* 左端から50%の位置 */
  transform: translateX(-50%); /* 要素の幅の半分だけ左に移動 */
  padding: 1rem 2rem;
  color: red;
  z-index: 50; /* 他の要素の上に表示 */
}
</style>
