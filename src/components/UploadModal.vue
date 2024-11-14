
<script setup lang="ts">
import { ref } from "vue"
// @ts-ignore
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  directoryName: {
    type: String,
    required: false
  },
})

const emit = defineEmits(["onUpdateSuccess"])
const router = useRouter()
const route = useRoute()

const showModal = ref(false)
const selectedFile = ref<null | File>(null)
const newDirectory = ref("")
const directoryNameInputVisible = ref(false)

const fileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    selectedFile.value = target.files[0];
  }
}

const uploadRegister = async () => {
  showModal.value = false
  await upload()
}

const getUploadSignature = async () => {
  const optimaizeDirectoryName = removeLeadingSlash(props.directoryName || "")
  if(newDirectory.value != "" && !!props.directoryName) {
    return await axios.get(
      `http://localhost:8080/projects/${route.params.id}/files/${selectedFile.value?.name}/upload-signature-url?fileType=${selectedFile.value?.type}&directoryName=${optimaizeDirectoryName}%2F${newDirectory.value}`
    )
  } else if(newDirectory.value != "") {
    return await axios.get(
      `http://localhost:8080/projects/${route.params.id}/files/${selectedFile.value?.name}/upload-signature-url?fileType=${selectedFile.value?.type}&directoryName=${newDirectory.value}`
    )
  } else {
    return await axios.get(
      `http://localhost:8080/projects/${route.params.id}/files/${selectedFile.value?.name}/upload-signature-url?fileType=${selectedFile.value?.type}&directoryName=${optimaizeDirectoryName}`
    )
  }
}

const removeLeadingSlash = (str: string) => str.replace(/^\/+/, '');

const upload = async () => {
  if (!selectedFile.value) {
    return
  }

  const {data: uploadSignatureUrl} = await getUploadSignature()

  axios.put(uploadSignatureUrl, selectedFile.value, {
    headers: {
      'Content-Type': selectedFile.value.type, // 適切なContent-Typeを指定
    }
  })
  .then(response => {
    console.log('File uploaded successfully', response.data);
    router.go(0)
  })
  .catch(error => {
    console.error('Error uploading file', error);
  })
  .finally(() => {
    emit("onUpdateSuccess")
  })
}

const setNewDirectoryName = (e: Event) => {
  const target = e.target as HTMLInputElement;
  newDirectory.value = target.value;
};
</script>

<template>
    <!-- FIXME: バツボタンおよびマスク部をクリックしたらモーダルが閉じるようにしたい -->
    <n-modal
      :show="props.visible"
      preset="dialog"
      positive-text="アップロード"
      negative-text="キャンセル"
      @positive-click="async () => {
        await uploadRegister()
      }"
      @negative-click="() => {
        emit('onUpdateSuccess')
      }"
    >
      {{ directoryName }}
      <h2>アップロード</h2>
      <p>アップロードするファイルを選択してください</p>
      <div class="directory-input-wrapper">
        <n-button type="info" @click="() => {directoryNameInputVisible = true}">
          新規ディレクトリ作成
        </n-button>
        <div id="directory-input">
          <input type="text" placeholder="ディレクトリ名" v-if="directoryNameInputVisible" @input="setNewDirectoryName" />
        </div>
      </div>
      <div id="offer-input">
        <input type="file" @change="fileChange" />
      </div>
    </n-modal>
</template>

<style scoped>
.directory-input-wrapper {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 20px;
}

#directory-input {
  width: 50%;
}

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
