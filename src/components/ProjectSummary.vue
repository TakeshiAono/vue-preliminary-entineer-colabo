<script setup lang="ts">
import { useProjectStore } from "@/stores/projectStore"
import { useUserStore } from "@/stores/userStore"
import {
  fetchChannels,
  fetchMessagesByChannels,
  fetchOperationLog,
  fetchTasks,
  fetchUserNotices,
} from "@/utils/request"
import { getUsersByProject, sortByUpdatedAt } from "@/utils/utils"
import { onBeforeMount, onMounted, ref, watch } from "vue"
import DashboardContainer from "./DashboardContainer.vue"
import MessageLog from "./MessageLog.vue"
import OperationLog from "./OperationLog.vue"
import ProjectDescription from "./ProjectDescription.vue"
import ProjectMemberSummary from "./ProjectMemberSummary.vue"
import UserNotice from "./UserNotice.vue"
import { useRouter } from "vue-router"
import { CreateOutline } from "@vicons/ionicons5"

const props = defineProps<{ projects: Project[]; users: User[] }>()
const projectStore = useProjectStore()
const userStore = useUserStore()

const headProject = ref<Project>(props.projects[0])
const chatLogs = ref<string[]>([])
const userNoticeLogs = ref<ResponseUserNotice["log"][]>([])
const operationLogs = ref<string[]>([])
const tasks = ref<ResponseTask[]>([])
const selectedProjectId = ref<number>(headProject.value.id)
const usersByProject = ref<User[]>([])

const menuOptions = ref<{ label: string; key: number }[]>([])
const modalVisible = ref(false)

const currentUser = userStore.currentUser
const router = useRouter()

const fetchData = async () => {
  try {
    if (props.projects && props.projects.length > 0) {
      const channels = await fetchChannels(selectedProject(), currentUser.id)
      const messages = await fetchMessagesByChannels(channels)
      chatLogs.value = sortByUpdatedAt<ResponseMessage>(messages).map((message) => message.text)

      const userNotices = await fetchUserNotices(currentUser)
      console.log("Fetched User Notices:", userNotices) // デバッグ用ログ
      userNoticeLogs.value = sortByUpdatedAt<ResponseUserNotice>(userNotices)

      const operations = await fetchOperationLog(selectedProject())
      operationLogs.value = sortByUpdatedAt<ResponseOperation>(operations).map(
        (operation) => operation.log,
      )
    }
  } catch (error) {
    console.error("Failed to fetch data:", error)
  }
}

onBeforeMount(async () => {
  usersByProject.value = getUsersByProject(projectStore, userStore, selectedProjectId.value)
  tasks.value = await fetchTasks(headProject.value as ResponseProject)

  menuOptions.value = props.projects.map((project) => ({
    label: project.name,
    key: project.id,
  }))
})

onMounted(fetchData)

watch(
  () => selectedProjectId.value,
  async () => {
    await fetchData()
    const userIds = projectStore.getUserIdsByProject(selectedProjectId.value) as number[]
    usersByProject.value = userIds.map(
      (userId) => userStore.users.find((user) => userId == user.id) as User,
    )
  },
)

watch(
  () => projectStore.belongingProjects,
  (newProjects) => {
    console.log("Updated projects:", newProjects) // デバッグメッセージ
    menuOptions.value = newProjects.map((project) => ({
      label: project.name,
      key: project.id,
    }))
  },
  { deep: true },
)

const selectedProject = (): ResponseProject => {
  return projectStore.belongingProjects.find(
    (project) => project.id == selectedProjectId.value,
  ) as ResponseProject
}

const getProject = (id: number): Project => {
  return projectStore.belongingProjects.find((project) => project.id == id) as Project // NOTE: 所属プロジェクトがない場合はprojectSummaryは表示しないため型アサーション
}
</script>

<template>
  <n-layout has-sider id="project-layout">
    <n-layout-sider
      collapse-mode="transform"
      :collapsed-width="30"
      :width="200"
      show-trigger="arrow-circle"
      content-style="padding: 24px;"
      bordered="true"
    >
      <n-h3 id="project-summary">プロジェクト一覧</n-h3>
      <ProjectSummarySidebar />
      <n-menu
        :inverted="inverted"
        :collapsed-width="64"
        :collapsed-icon-size="22"
        :options="menuOptions"
        :on-update:value="
          (projectId: number) => {
            selectedProjectId = projectId
            projectStore.selectProject(projectId)
          }
        "
      />
    </n-layout-sider>
    <div id="grid-wrapper">
      <div :style="{ display: 'flex', alignItems: 'start' }">
        <h2 id="project-name" :style="{ margin: '10px' }">
          {{
            projectStore.belongingProjects.find((project) => project.id == selectedProjectId)?.name
          }}
        </h2>
        <n-button
          strong
          secondary
          circle
          type="warning"
          @click="
            () => {
              modalVisible = true
            }
          "
        >
          <n-icon size="20">
            <CreateOutline />
          </n-icon>
        </n-button>
      </div>
      <div id="grid-container">
        <div id="project-description-container">
          <ProjectDescription
            :description="getProject(selectedProjectId).description"
            @jump-project-page="
              () => {
                router.push('projects/show/' + selectedProjectId)
              }
            "
          />
        </div>
        <div id="dashboard-container">
          <DashboardContainer
            v-if="projects.length != 0 && tasks.length != 0"
            :tasks="tasks"
            :projects="projects"
            :selectedProjectId="selectedProjectId"
            :users="usersByProject"
          />
        </div>
        <div id="project-member-container">
          <ProjectMemberSummary :member-names="usersByProject.map((user) => user.name)" />
        </div>
        <div id="chat-log-container">
          <MessageLog :chat-logs="chatLogs" />
        </div>
        <div id="operation-log-container">
          <OperationLog :operation-logs="operationLogs" />
        </div>
        <div id="user-notice-container">
          <UserNotice :userNoticeLogs="userNoticeLogs" />
        </div>
      </div>
    </div>
  </n-layout>
  <n-modal
    :show="modalVisible"
    preset="dialog"
    positive-text="変更"
    negative-text="キャンセル"
    @positive-click="
      async () => {
        try {
          await projectStore.putProject(
            projectStore.selectedProjectsAtMyPage.name,
            projectStore.selectedProjectsAtMyPage?.description,
            projectStore.selectedProjectsAtMyPage.id,
          )
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
    title="プロジェクト編集"
  >
    <div id="project-name-input">
      <div>
        <h3>プロジェクト名</h3>
        <n-input
          v-model:value="projectStore.selectedProjectsAtMyPage.name"
          type="text"
          placeholder=""
        />
      </div>
      <div>
        <h4>概要</h4>
        <n-input
          v-model:value="projectStore.selectedProjectsAtMyPage.description"
          type="textarea"
          placeholder=""
        />
      </div>
    </div>
  </n-modal>
</template>

<style scoped>
#project-layout {
  height: 100%;
}

#grid-wrapper {
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

#grid-container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 1fr 1fr;
  gap: 20px;
  margin: 0px 30px;
  flex: 1;
  padding: 20px;
}

#project-description-container {
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 1;
}

#project-member-container {
  grid-column-start: 4;
  grid-column-end: 7;
  grid-row-start: 1;
  grid-row-end: 1;
}

#dashboard-container {
  grid-column-start: 7;
  grid-column-end: 13;
  grid-row-start: 1;
  grid-row-end: 1;
}

#chat-log-container {
  grid-column-start: 1;
  grid-column-end: 5;
  grid-row-start: 2;
  grid-row-end: 2;
  flex-grow: 1;
}

#user-notice-container {
  grid-column-start: 5;
  grid-column-end: 9;
  grid-row-start: 2;
  grid-row-end: 2;
}

#operation-log-container {
  grid-column-start: 9;
  grid-column-end: 13;
  grid-row-start: 2;
  grid-row-end: 2;
}

@media screen and (max-width: 850px) {
  #grid-container {
    display: block;
  }
  #project-description-container,
  #dashboard-container,
  #project-member-container,
  #chat-log-container,
  #operation-log-container,
  #user-notice-container {
    min-height: 100px;
    padding: 10px;
  }
}
</style>
