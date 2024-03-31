<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import ProjectDescription from './ProjectDescription.vue';
import ProjectMemberSummary from './ProjectMemberSummary.vue';
import MessageLog from './MessageLog.vue';
import axios from 'axios';
import _ from "lodash"

const API_URL = import.meta.env.VITE_API_SERVER_URI
const props = defineProps(["projects", "userStore"])
const headProject = ref<string | null>(null)
const members = ref([])
const chatLogs = ref([])

onMounted(async () => {
  if (props.projects && props.projects.length > 0) {
    headProject.value = props.projects[0]
    members.value = await getProjectMemberNames()
    chatLogs.value = await fetchChatMessage()
  }
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

async function fetchChatMessage(): Promise<Project> {
  const channelIds = await fetchChannelIds()
  const messages = await Promise.all(channelIds.map(async (id) => {
    const message = await axios.get(`${API_URL}/messages/${id}`)
    return message.data
  }));
  const sortedMessagesByUpdatedAt = _.sortBy(messages, message => new Date(message.updatedAt)).reverse().map( message => message.text)
  return sortedMessagesByUpdatedAt
}
</script>

<template>
  <n-layout has-sider>
      <n-layout-sider
        collapse-mode="transform"
        :collapsed-width="80"
        :width="300"
        show-trigger="arrow-circle"
        content-style="padding: 24px;"
        bordered="true"
      >
        <n-h3 id="project-summary">プロジェクト一覧</n-h3>
        <p v-for="projectName in projectNames" :key="projectName">{{ projectName }}</p>
      </n-layout-sider>
      <n-layout-content content-style="padding: 24px;" v-if="headProject">
        <h1 id="project-name">{{ headProject.name }}</h1>
        <ProjectDescription :description="headProject.description"/>
        <ProjectMemberSummary :member-names="members"/>
        <MessageLog :chat-logs="chatLogs"/>
      </n-layout-content>
    </n-layout>
</template>

<style scoped>
#project-name {
  text-decoration: underline;
}

#project-summary{
  font-weight: bold;
}
</style>
