<script setup lang="ts">
import { ref } from "vue"
import { Delete } from "@vicons/carbon"
// @ts-ignore
import { FolderOutline, FolderOpenSharp, CloudUpload } from "@vicons/ionicons5"
import FileSelector from "./FileSelector.vue"
import UploadModal from "./UploadModal.vue"
import { useDialog } from "naive-ui"
import { useRoute, useRouter } from "vue-router"
import axios from "axios"

const { name, files, path } = defineProps(["name", "files", "path"])
const isSelected = ref(false)
const showModal = ref(false)
const createShareFileModalVisible = ref(false)
const directoryName = ref(name)
const router = useRouter()
const route = useRoute()

const dialog = useDialog()

const handleDirectoryClick = (e) => {
  isSelected.value = !isSelected.value
}

const onClickUpload = () => {
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  createShareFileModalVisible.value = false
}

const deleteDirectory = async () => {
  console.log(path)
  console.log(directoryName.value)
  await axios.delete(
    `http://localhost:8080/projects/${route.params.id}/directories?directoryName=${path}`,
  )
}

const displayDeleteDialog = () => {
  dialog.warning({
    title: "ディレクトリ削除",
    content: "すべてのデータを削除しますか？",
    positiveText: "はい",
    negativeText: "いいえ",
    onPositiveClick: async () => {
      await deleteDirectory()
      router.go(0)
    },
  })
}
</script>

<template>
  <div>
    <UploadModal :visible="showModal" @onUpdateSuccess="closeModal" :directoryName="path" />
    <CreateShareFileModal
      :visible="createShareFileModalVisible"
      @onUpdateSuccess="closeModal"
      :directoryName="path"
    />
    <div class="directory-wrapper">
      <div class="directory-icon">
        <div v-if="isSelected" :style="{ 'align-content': 'center' }">
          <n-icon size="30" @click="handleDirectoryClick">
            <FolderOpenSharp />
          </n-icon>
        </div>
        <div v-else :style="{ 'align-content': 'center' }">
          <n-icon size="30" @click="handleDirectoryClick">
            <FolderOutline />
          </n-icon>
        </div>
        <p>{{ name }}</p>
        <n-icon v-if="isSelected" class="upload-icon" size="25" @click="onClickUpload">
          <CloudUpload />
        </n-icon>
        <n-icon v-if="isSelected" class="delete-icon" size="25" @click="displayDeleteDialog">
          <Delete />
        </n-icon>
      </div>
    </div>

    <div v-for="(file, index) in files.filter((file) => typeof file != 'string')">
      <div v-if="isSelected">
        <div
          v-if="
            (() => {
              const directoryList = files.filter((file) => typeof file != 'string')
              return directoryList.length > 0
            })()
          "
        >
          <Directory
            :style="{ 'margin-left': '20px' }"
            :name="file.directoryName"
            :path="path + '/' + file.directoryName"
            :files="file.files"
          />
        </div>
      </div>
    </div>

    <div v-for="(file, index) in files.filter((file) => typeof file == 'string')">
      <div v-if="isSelected">
        <FileSelector :file="file" :style="{ 'margin-left': '20px' }" :directoryName="path" />
        <div
          v-if="
            (() => {
              const directoryList = files.filter((file) => typeof file != 'string')
              return directoryList.length > 0
            })()
          "
        ></div>
      </div>
    </div>
    <DownloadDoneFilled />
  </div>
</template>

<style scoped>
.directory-wrapper {
  width: 200px;
}

.directory-icon {
  display: flex;
}

.upload-icon {
  cursor: pointer;
  margin-left: 10px;
  padding: auto;
}

.download-icon {
  cursor: pointer;
  margin-left: 10px;
  padding: auto;
}

.file-wrapper {
  display: flex;
}
</style>
