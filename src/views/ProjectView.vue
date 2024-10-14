<script setup lang="ts">
import ProjectDescription from "@/components/ProjectDescription.vue"

import { useProjectStore } from "@/stores/projectStore"
import { useUserStore } from "@/stores/userStore"
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"

const userStore = useUserStore()
const projectStore = useProjectStore()
const project = ref({ name: "", description: "" })
const projectUsers = ref([])
const route = useRoute()
const projectId = parseInt(route.params.id as string, 10)

onMounted(async () => {
  project.value = await projectStore.fetchProject(projectId)
  if (project.value?.userIds) {
    const users = await Promise.all(
      project.value.userIds.map(async (userId: number) => await userStore.getUserInfo(userId)),
    )
    projectUsers.value = users
  }
})
</script>

<template>
  <main>
    <h1>{{ project.name }}</h1>
    <div v-if="project">
      <ProjectDescription :description="project.description" />
      <h1 id="project-member-title">メンバー</h1>
      <div id="project-member-content">
        <div v-if="projectUsers.length">
          <p v-for="user in projectUsers" :key="user.id">{{ user.name }}</p>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
#project-member-content {
  width: 200px;
  height: 100px;
  border-radius: 10px;
  border: solid;
}
</style>
