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
import { sortByUpdatedAt } from "@/utils/utils"
import { onBeforeMount, onMounted, ref, watch } from "vue"
import DashboardContainer from "./DashboardContainer.vue"
import MessageLog from "./MessageLog.vue"
import OperationLog from "./OperationLog.vue"
import ProjectDescription from "./ProjectDescription.vue"
import ProjectMemberSummary from "./ProjectMemberSummary.vue"
import UserNotice from "./UserNotice.vue"
import { useRouter } from "vue-router"

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

const currentUser = userStore.currentUser
const router = useRouter()

onBeforeMount(async () => {
  usersByProject.value = getUsersByProject()
  tasks.value = await fetchTasks(headProject.value as ResponseProject)
})

onMounted(async () => {
  if (props.projects && props.projects.length > 0) {
    chatLogs.value = sortByUpdatedAt<ResponseMessage>(
      await fetchMessagesByChannels(await fetchChannels(selectedProject())),
    ).map((message) => message.text)
    userNoticeLogs.value = sortByUpdatedAt<ResponseUserNotice>(
      await fetchUserNotices(currentUser),
    ).map((userNotice) => userNotice.log)
    operationLogs.value = sortByUpdatedAt<ResponseOperation>(
      await fetchOperationLog(selectedProject()),
    ).map((operation) => operation.log)
  }
})

watch(
  () => selectedProjectId.value,
  async () => {
    if (props.projects && props.projects.length > 0) {
      chatLogs.value = sortByUpdatedAt<ResponseMessage>(
        await fetchMessagesByChannels(await fetchChannels(selectedProject())),
      ).map((message) => message.text)
      userNoticeLogs.value = sortByUpdatedAt<ResponseUserNotice>(
        await fetchUserNotices(currentUser),
      ).map((userNotice) => userNotice.log)
      operationLogs.value = sortByUpdatedAt<ResponseOperation>(
        await fetchOperationLog(selectedProject()),
      ).map((operation) => operation.log)
    }
    const userIds = projectStore.getUserIdsByProject(selectedProjectId.value) as number[]
    usersByProject.value = userIds.map(
      (userId) => userStore.users.find((user) => userId == user.id) as User,
    )
  },
)

const getUsersByProject = (): User[] => {
  const userIds = projectStore.getUserIdsByProject(selectedProjectId.value) as number[] // NOTE: プロジェクト1つにつき最低一人はユーザーが存在するため
  return userIds.map((userId) => userStore.users.find((user) => userId == user.id)) as User[] // NOTE: プロジェクト1つにつき最低一人はユーザーが存在するため
}

const selectedProject = (): ResponseProject => {
  return projectStore.belongingProjects.find(
    (project) => project.id == selectedProjectId.value,
  ) as ResponseProject
}

const menuOptions = props.projects.map((project) => {
  return { label: project.name, key: project.id }
})

const getProject = (id: number): Project => {
  return projectStore.belongingProjects.find((project) => project.id == id) as Project // NOTE: 所属プロジェクトがない場合はprojectSummaryは表示しないため型アサーション
}
</script>

<template>
  <n-layout has-sider>
    <n-layout-sider
      collapse-mode="transform"
      :collapsed-width="80"
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
          }
        "
      />
    </n-layout-sider>
    <n-layout-content content-style="padding: 24px;" v-if="headProject">
      <div id="my-page-info">
        <div>
          <div id="project-info">
            <div id="project-member">
              <h1 id="project-name">{{ projectStore.belongingProjects.find(project => project.id == selectedProjectId)?.name }}</h1>
              <ProjectDescription :description="getProject(selectedProjectId).description" @jump-project-page="() =>{router.push('projects/show/' + selectedProjectId); }"/>
              <ProjectMemberSummary :member-names="usersByProject.map((user) => user.name)" />
            </div>
            <div id="chat-log">
              <MessageLog :chat-logs="chatLogs" />
            </div>
            <div id="operation-log">
              <OperationLog :operation-logs="operationLogs" />
            </div>
          </div>
          <DashboardContainer
            v-if="projects.length != 0 && tasks.length != 0"
            :tasks="tasks"
            :projects="projects"
            :selectedProjectId="selectedProjectId"
            :users="usersByProject"
          />
        </div>
        <div id="user-notice">
          <UserNotice :userNoticeLogs="userNoticeLogs" />
        </div>
      </div>
    </n-layout-content>
  </n-layout>
</template>

<style scoped>
#project-member,
#chat-log {
  margin-right: 0.5rem;
}

#user-notice {
  margin-left: 0.5rem;
}

#my-page-info {
  display: flex;
  flex-direction: row;
}

#project-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

#project-name {
  text-decoration: underline;
}

#project-summary {
  font-weight: bold;
}
</style>
