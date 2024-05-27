<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import axios from 'axios';
import { onMounted, ref, watch } from 'vue';
import ProjectSearchBox from '@/components/ProjectSearchBox.vue';

const userStore = useUserStore()
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
    <p>{{ projects.map(project => project.name) }}</p>
    <h1>ProjectsSearchPage</h1>
    <p>ログイン中: {{ userStore.isLogin }}</p>
    <ProjectSearchBox/>
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
