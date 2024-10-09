<script setup lang="ts">
import ProjectDescription from "@/components/ProjectDescription.vue"
import { useProjectStore } from "@/stores/projectStore"
import { useUserStore } from "@/stores/userStore"
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"

const userStore = useUserStore()
const projectStore = useProjectStore()
const project = ref(null)
const route = useRoute()
const projectId = parseInt(route.params.id as string, 10)

onMounted(async () => {
  project.value = await projectStore.fetchProject(projectId)
})
</script>

<template>
  <main>
    <h1>ProjectShow</h1>
    <div v-if="project">
      <ProjectDescription :description="project.description" />
    </div>
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
