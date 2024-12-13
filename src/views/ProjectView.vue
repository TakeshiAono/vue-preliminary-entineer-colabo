<script setup lang="ts">
import ShareFileArea from "@/components/ShareFileArea.vue"
import UploadModal from "@/components/UploadModal.vue"
import { CloudUpload } from "@vicons/ionicons5"
import { api } from "@/api/axios"
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"

import { useProjectStore } from "@/stores/projectStore"
import { useTaskStore } from "@/stores/taskStore"
import type { Channel } from "@/stores/API"

const showModal = ref(false)
const isValidShareFiles = ref<boolean | null>(null)

const route = useRoute()
const projectStore = useProjectStore()
const taskStore = useTaskStore()
const project = ref<Project | null>(null)
const channels = ref<Channel[] | null>(null)

onMounted(async () => {
  project.value = await projectStore.fetchProject(route.params.id as string)
  if (await isCreatedBucket()) {
    isValidShareFiles.value = true
  } else {
    isValidShareFiles.value = false
  }

  channels.value = await projectStore.fetchChannels(project.value.chatRoomIds)
})

const openModal = () => {
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const requestUseShareFiles = async (bucketName: string) => {
  const result = await api.post<void>(`/projects/${route.params.id}/use-share-files/${bucketName}`)
  if (result.status === 200) {
    isValidShareFiles.value = true
  } else {
    isValidShareFiles.value = false
  }
}

const isCreatedBucket = async () => {
  const result = await api.get<boolean>(`/projects/${route.params.id}/use-share-files`)
  return result.data
}
</script>

<template>
  <div class="project-view-page">
    <h1>ProjectShow</h1>
    <div id="project-view">
      <div :id="'wrapper'">
        <h2>PJ概要</h2>
        <div :id="'project-description'">
          <p>{{ project?.description }}</p>
        </div>
      </div>
      <div :id="'wrapper'">
        <h2>タスク</h2>
        <div :id="'task-summary-area'">
          <n-scrollbar style="height: 190px">
            <div v-if="!!project">
              <div v-for="task in taskStore?.getTasksByProject(project.id)" :key="task.id">
                <p>{{ task.name }}</p>
              </div>
            </div>
          </n-scrollbar>
        </div>
      </div>
      <div :id="'wrapper'">
        <h2>チャットチャンネル一覧</h2>
        <div :id="'chat-channel-area'">
          <div v-if="!!channels">
            <div v-for="channel in channels" :key="channel.id">
              <p># {{ channel.name }}</p>
            </div>
          </div>
        </div>
      </div>
      <div :id="'wrapper'">
        <div :class="'share-file-header-wrapper'">
          <h2>共有ファイル</h2>
          <div :class="'icon-wrapper'">
            <n-icon class="upload-icon" size="25" @click="openModal">
              <CloudUpload />
            </n-icon>
          </div>
        </div>
        <div :id="'share-file-area'">
          <div v-if="isValidShareFiles === null" class="content-wrapper">
            <ShareFileArea />
            <n-spin />
          </div>
          <div v-else-if="isValidShareFiles">
            <ShareFileArea />
          </div>
          <div v-else class="content-wrapper">
            <n-button
              type="success"
              @click="
                () => {
                  requestUseShareFiles('itrtewn')
                }
              "
            >
              ファイル共有を有効にする
            </n-button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <UploadModal :visible="showModal" @onUpdateSuccess="closeModal" />
</template>

<style scoped>
.project-view-page {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

h1 {
  margin-top: 0px;
  margin-bottom: 10px;
}

h2 {
  margin-top: 0px;
  margin-bottom: 0px;
}

#project-view {
  display: grid;
  margin: 10px 10px;
  gap: 20px;
  grid-template-rows: 15rem 25rem;
  grid-template-columns: 1.25fr 2fr;
}

#wrapper {
  display: flex;
  flex-direction: column;
}

.share-file-header-wrapper {
  display: flex;
  align-items: center;
}

.icon-wrapper {
  margin-left: 10px;
}

#project-description {
  border: solid;
  border-radius: 20px;
  flex-grow: 1;
}

#task-summary-area {
  border: solid;
  border-radius: 20px;
  flex-grow: 1;
}

#chat-channel-area {
  border: solid;
  border-radius: 20px;
  overflow: auto;
  flex-grow: 1;
}

#share-file-area {
  border: solid;
  overflow: auto;
  border-radius: 20px;
  flex-grow: 1;
}

header {
  background-color: blue;
}

footer {
  background-color: yellow;
}

.content-wrapper {
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
