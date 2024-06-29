<script setup lang="ts">
import axios from "axios"
import { onMounted, ref } from "vue"
import ProjectSearchBox from "@/components/ProjectSearchBox.vue"
import SearchedProjectsDisplay from "@/components/SearchedProjectsDisplay.vue"

const projects = ref([])

onMounted(async () => {
  projects.value = await fetchProjects()
})

async function fetchProjects() {
  const API_URL = import.meta.env.VITE_API_SERVER_URI
  const response = await axios.get(`${API_URL}/projects`)
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
