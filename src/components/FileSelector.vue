<script setup lang="ts">
import { ref } from "vue"
// @ts-ignore
import saveAs from "file-saver";
import { DownloadOutline, NewspaperOutline } from '@vicons/ionicons5'
import axios from "axios";
import { useRoute } from "vue-router";

const { file, directoryName } = defineProps(["file", "directoryName"])
const isFileDownloading = ref(false)
const route = useRoute()

const getDownloadSignature = async () => {
  return await axios.get(`http://localhost:8080/projects/${route.params.id}/files/${file}/download-signature-url?directoryName=${directoryName}`)
}

const fileDownload = async () => {
  isFileDownloading.value = true
  const {data: signature} = await getDownloadSignature()
  const getFile = await axios.get(`${signature}`, { responseType: 'arraybuffer' })
  const mineType = getFile.headers["content-type"];
  const blob = new Blob([getFile.data], { type: mineType });
  saveAs(blob, file);
  isFileDownloading.value = false
}
</script>

<template>
    <div class="file-wrapper">
      <n-icon class="file" size="25">
        <NewspaperOutline/>
      </n-icon>
      {{ file }}
      <div v-if="isFileDownloading">
        <n-spin size="small" />
      </div>
      <div v-else>
        <n-icon class="download-icon" size="25" @click="fileDownload">
          <DownloadOutline />
        </n-icon>
      </div>
    </div>
</template>

<style scoped>
.download-icon {
  cursor: pointer;
  margin-left: 10px;
  padding: auto;
}

.file-wrapper {
  display: flex;
}
</style>
