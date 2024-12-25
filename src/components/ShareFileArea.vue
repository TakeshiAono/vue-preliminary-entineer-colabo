<script setup lang="ts">
import { api } from "@/api/axios"
import { onMounted, ref } from "vue"
// @ts-ignore
import { useRoute } from "vue-router"
import Directory from "./DirectoryComponent.vue"
import _ from "lodash"
import FileSelector from "./FileSelector.vue"

type Response = {
  directories: DirectoryType[]
}

type DirectoryType = {
  name: string
  files: fileInfoType[]
}

type fileInfoType = {
  name: string
  file_id: number
  updated_at: string
}

// const props = defineProps(["chatLogs"])
const route = useRoute()
const directories = ref<Response>()
const topFiles = ref([])

onMounted(async () => {
  const fileList = await fetchFileList(route.params.id as string)
  const [files, directoryList]: TreeNode[] = _.partition(
    fileList,
    (file) => typeof file === "string",
  )
  topFiles.value = files
  directories.value = directoryList
})

const fetchFileList = async (projectId: string) => {
  const { data } = await api.get(`/projects/${projectId}/files`)
  return buildTree(data)
}

const buildTree = (keys: string[]): TreeNode => {
  const root: TreeNode = []

  keys.forEach((key) => {
    const parts = key.split("/").filter((part) => part !== "") // "/" でキーを分割し、空の部分を除外
    let current = root

    parts.forEach((part, index) => {
      if (index === parts.length - 1) {
        // 最後の部分はファイルとして扱う
        current.push(part)
      } else {
        // ディレクトリを探すか、なければ作成
        let dir = current.find(
          (item) => typeof item === "object" && (item as DirectoryNode).directoryName === part,
        ) as DirectoryNode

        if (!dir) {
          // ディレクトリが存在しない場合は作成
          dir = { directoryName: part, files: [] }
          current.push(dir)
        }
        // 次の階層に進む
        current = dir.files
      }
    })
  })

  return root
}
</script>

<template>
  <div id="share-file-area-content">
    <!-- FIXME: ディレクトリにファイルが入っていないとディレクトリコンポーネントが表示されないので、要修正 -->
    <div v-for="(directory, index) in directories" :key="index">
      <Directory
        :name="directory.directoryName"
        :files="directory.files"
        :path="'/' + directory.directoryName"
      />
    </div>
    <div v-for="(file, index) in topFiles" :key="index">
      <FileSelector :file="file" />
    </div>
  </div>
</template>

<style scoped></style>
