<script setup lang="ts">
import { api } from "@/api/axios"
import { onMounted, ref } from "vue"
import ProjectSearchBox from "@/components/ProjectSearchBox.vue"
import SearchedProjectsDisplay from "@/components/SearchedProjectsDisplay.vue"

const projects = ref([])

onMounted(async () => {
  projects.value = await fetchProjects()
})

async function fetchProjects() {
  const response = await api.get("/projects")
  return response.data
}
</script>

<template>
  <main>
    <h1>ProjectsSearchPage</h1>
    <ProjectSearchBox
      @searchedProjects="
        (searchedProjects) => {
          projects = searchedProjects
        }
      "
    />
    <SearchedProjectsDisplay :searchedProjects="projects" />
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
