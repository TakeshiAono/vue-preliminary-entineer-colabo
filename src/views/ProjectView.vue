<script setup lang="ts">
import ShareFileArea from "@/components/ShareFileArea.vue"
import UploadModal from "@/components/UploadModal.vue"
import { CloudUpload } from "@vicons/ionicons5"
import { api } from "@/api/axios"
import { onMounted, ref } from "vue"
import { useRoute, useRouter } from "vue-router"

import { useProjectStore } from "@/stores/projectStore"
import { useTaskStore } from "@/stores/taskStore"
import type { ResponseChannel, Channel } from "@/stores/API"
import { useUserStore } from "@/stores/userStore"
import { getUsersByProject } from "@/utils/utils"
import { bulkFetch } from "@/utils/bulk"

const showModal = ref(false)
const isValidShareFiles = ref<boolean | null>(null)
const route = useRoute()
const router = useRouter()
const projectStore = useProjectStore()
const userStore = useUserStore()
const taskStore = useTaskStore()
const project = ref<Project | null>(null)
const channels = ref<Channel[]>([])
const createChannelVisible = ref<boolean>(false)
const channelName = ref<string>("")
const userIds = ref<{label: string, value: number}[]>([])
const options = ref<{label: string, value: number}[]>([])

onMounted(async () => {
  // TODO: ブラウザ更新したらstoreの中の値も空になるため全てのコンポーネントでbulkFetchを使用しなければならないためDRY出ないので改善する
  await bulkFetch()
  project.value = await projectStore.fetchProject(route.params.id as string)
  if (await isCreatedBucket()) {
    isValidShareFiles.value = true
  } else {
    isValidShareFiles.value = false
  }

  if (typeof route.params.id != "string") return
  channels.value = await projectStore.fetchChannels(route.params.id, userStore.currentUser.id)
  setOptions()
})

const setOptions = () => {
  const users = getUsersByProject(projectStore, userStore, route.params.id)
  const createdOptions = users.map((user) => {
    return {
      label: user.name,
      value: user.id,
    }
  })

  options.value = createdOptions
}

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

const createChannel = async () => {
  const response = await api.post<ResponseChannel>(`/channels/create`, {
    name: channelName.value,
    userIds: userIds.value,
    ownerId: userStore.currentUser.id,
    projectId: route.params.id,
  })
  console.log("response:", response.data)
  channels.value = [...channels.value, response.data]
}

const deleteChannel = async (id: number) => {
  console.log("id:", id);
  console.log("userStore.currentUser.id:", userStore.currentUser.id);

  await api.delete(`/channels/${id}`, {
    data: { ownerId: userStore.currentUser.id } // リクエストボディを指定
  });

  channels.value = channels.value.filter((channel) => channel.id !== id)
};
</script>

<template>
  <n-modal
    :show="createChannelVisible"
    preset="dialog"
    positive-text="作成"
    negative-text="キャンセル"
    @positive-click="() => {
      createChannel()
      createChannelVisible = false
    }"
    @negative-click="() => {createChannelVisible = false}"
  >
    <div :style="{ display: 'flex', flexDirection: 'row', margin: '10px' }">
      <n-input v-model:value="channelName" placeholder="チャンネル名" :style="{margin: '10px'}" />
      <n-select multiple v-model:value="userIds" :options="options" />
    </div>
  </n-modal>
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
        <div :style="{display: 'flex', flexDirection: 'row'}">
          <h2>チャットチャンネル一覧</h2>
          <n-button type="info" :style="{marginLeft: '20px'}" @click="() => {createChannelVisible = true}">
            チャンネル作成
          </n-button>
        </div>
        <div :id="'chat-channel-area'">
          <div v-if="!!channels">
            <div :id="'chat-channel-content'" v-for="channel in channels" :key="channel.id">
              <div :style="{ display: 'grid', gridTemplateColumns: '1fr 1fr'}">
                <n-button
                  text
                  type="info"
                  tag="a"
                  @click="() => {router.push(`/channels/${channel.id}`)}"
                >
                  #{{ channel.name }}
                </n-button>
                <div v-if="channel.ownerId === userStore.currentUser.id">
                  <n-button type="error" @click="() => {deleteChannel(channel.id)}">
                    削除
                  </n-button>
                </div>
              </div>
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
#chat-channel-content{
  margin: 15px;
}
</style>
