<script setup lang="ts">
import { computed, onMounted, onBeforeMount, ref } from 'vue';
import ProjectDescription from './ProjectDescription.vue';
import ProjectMemberSummary from './ProjectMemberSummary.vue';
import MessageLog from './MessageLog.vue';
import axios from 'axios';
import _ from "lodash"
import UserNotice from './UserNotice.vue';
import OperationLog from './OperationLog.vue';
import Dashboard from './Dashboard.vue';

const API_URL = import.meta.env.VITE_API_SERVER_URI

const props = defineProps(["projects", "userStore", "users"])
const headProject = ref<string | null>(null)
const members = ref([])
const chatLogs = ref([])
const userNoticeLogs = ref([])
const operationLogs = ref([])
const tasks = ref([])

onMounted(async () => {
  if (props.projects && props.projects.length > 0) {
    members.value = await getProjectMemberNames()
    chatLogs.value = await fetchChatMessage()
    userNoticeLogs.value = await fetchUserNotice()
    operationLogs.value = await fetchOperationLog()
  }
})

onBeforeMount(async () => {
  headProject.value = props.projects[0]
  tasks.value = await fetchTasks()
})

const projectNames = computed(() => {
  return props.projects.map(project => 
    project.name
  );
})

const getProjectMemberNames = async () => {
  if(headProject.value){
    const userIds = headProject.value.userIds
    const names = await Promise.all(userIds.map(async (id) => {
      const userInfo = await props.userStore.getUserInfo(id)
      return userInfo.data.name
    }));
    return names
  }
}

const fetchChannelIds = async () => {
  if(headProject.value){
    const chatRoomIds = headProject.value.chatRoomIds
    const chatChannelIds = await Promise.all(chatRoomIds.map(async (id) => {
      const chatRoom = await axios.get(`${API_URL}/chatRooms/${id}`)
      return chatRoom.data.channelIds
    }));
    return _.flatten(chatChannelIds)
  }
}

async function fetchChatMessage(): Promise<any> {
  const channelIds = await fetchChannelIds()
  const messages = await Promise.all(channelIds.map(async (id) => {
    const message = await axios.get(`${API_URL}/messages/${id}`)
    return message.data
  }));
  const sortedMessagesByUpdatedAt = _.sortBy(messages, message => new Date(message.updatedAt)).reverse().map( message => message.text)
  return sortedMessagesByUpdatedAt
}

async function fetchOperationLog(): Promise<any> {
  const operationIds = headProject.value.operationIds
  const operations = await Promise.all(operationIds.map(async (id) => {
    const operation = await axios.get(`${API_URL}/operations/${id}`)
    return operation.data
  }));
  const sortedoperationsByUpdatedAt = _.sortBy(operations, operation => new Date(operation.updatedAt)).reverse().map( operation => operation.log)
  return sortedoperationsByUpdatedAt
}

async function fetchUserNotice() {
  const userNoticeIds = props.userStore.currentUser.userNoticeIds
  const userNoticeLogs = await Promise.all(userNoticeIds.map(async (id) => {
    const userNotice = await axios.get(`${API_URL}/userNotices/${id}`)
    return userNotice.data.log
  }))
  return userNoticeLogs
}

async function fetchTasks(): Promise<any> {
  const taskIds = headProject.value.taskIds
  return await Promise.all(taskIds.map(async (id) => {
    const task = (await axios.get<Task>(`${API_URL}/tasks/${id}`)).data
    task.createdAt = new Date(task.createdAt)
    task.updatedAt = new Date(task.updatedAt)
    task.deadline = new Date(task.deadline)
    task.doneAt = task.doneAt && new Date(task.doneAt)
    return task
  }));
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
        <p v-for="projectName in projectNames" :key="projectName">{{ projectName }}</p>
      </n-layout-sider>
      <n-layout-content content-style="padding: 24px;" v-if="headProject">
        <div id="my-page-info">
          <div>
            <div id="project-info">
              <div id="project-member">
                <h1 id="project-name">{{ headProject.name }}</h1>
                <ProjectDescription :description="headProject.description"/>
                <ProjectMemberSummary :member-names="members"/>
              </div>
              <div id="chat-log">
                <MessageLog :chat-logs="chatLogs"/>
              </div>
              <div id="operation-log">
                <OperationLog :operation-logs="operationLogs"/>
              </div>
            </div>
            <Dashboard v-if="projects.length != 0 && tasks.length != 0" :tasks="tasks" :projects="projects" :target-project-id="1" :users="users"/>
          </div>
          <div id="user-notice">
            <UserNotice :userNoticeLogs="userNoticeLogs"/>
          </div>
        </div>
      </n-layout-content>
    </n-layout>
</template>

<style scoped>
#project-member,#chat-log {
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

#project-summary{
  font-weight: bold;
}
</style>
