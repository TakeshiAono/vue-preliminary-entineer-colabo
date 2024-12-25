<script setup lang="ts">
import { onBeforeMount } from "vue"

import ProjectSummary from "@/components/ProjectSummary.vue"
import { useProjectStore } from "@/stores/projectStore"
import { useUserStore } from "@/stores/userStore"
import { bulkFetch } from "@/utils/bulk"

const projectStore = useProjectStore()
const userStore = useUserStore()

onBeforeMount(async () => {
  await bulkFetch()
})
</script>

<template>
  <main>
    <ProjectSummary
      :users="userStore.getUsers()"
      :projects="projectStore.belongingProjects"
      :user-store="userStore"
      v-if="projectStore.belongingProjects.length > 0"
    />
  </main>
</template>

<style scoped>
p {
  background-color: red;
}

header {
  background-color: blue;
}

footer {
  background-color: yellow;
}
</style>
