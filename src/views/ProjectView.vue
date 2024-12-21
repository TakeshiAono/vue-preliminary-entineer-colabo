<script setup lang="ts">
import DashboardContainerForProjectView from "@/components/DashboardContainerForProjectView.vue"
import ProjectDescription from "@/components/ProjectDescription.vue"

import { useApplicationStore } from "@/stores/applicationStore"
import { useProjectStore } from "@/stores/projectStore"
import { useUserStore } from "@/stores/userStore"
import { onMounted, ref } from "vue"
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

const submitApplication = async () => {
  try {
    const userStore = useUserStore()
    applicationStore.applicationMessage = applicationMessage.value
    await applicationStore.submitApplication(userStore.currentUser.id, projectId)
    applicationMessage.value = ""
    // デバッグ用にconsole.logを追加
    console.log("送信成功")
    successMessage.value = "メッセージが送信されました"
    console.log("successMessage:", successMessage.value)
  } catch (error) {
    if (error instanceof Error) {
      successMessage.value = error.message
    } else {
      successMessage.value = "応募の送信中にエラーが発生しました"
    }
    // エラー時のメッセージもログ出力
    console.log("エラー時のsuccessMessage:", successMessage.value)
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
    <div v-if="successMessage" class="success-message">
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
        <div>
          <h1>応募フォーム</h1>
          <div id="application-form-content">
            <textarea
              v-model="applicationMessage"
              placeholder="プロジェクトオーナーに向けたメッセージを入力してください"
              rows="8"
              style="width: 100%; box-sizing: border-box; border: none; outline: none; resize: none"
            ></textarea>
            <div class="btn-wrapper">
              <n-button type="primary" @click="submitApplication" class="application-submit-btn"
                >参加希望を出す</n-button
              >
            </div>
          </div>
        </div>

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

#application-form-content {
  max-width: 600px;
  width: 100%;
  height: 170px;
  padding: 5px;
  box-sizing: border-box;
  border-radius: 10px;
  border: solid;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

#project-member-content {
  height: 320px;
  border-radius: 10px;
  border: solid;
}

.application-submit-btn {
  display: block;
  margin-left: auto;
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
</style>
