<script setup lang="ts">
import { useUserStore } from "@/stores/userStore"
import { useProjectStore } from "@/stores/projectStore"
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"

const userStore = useUserStore()
const projectStore = useProjectStore()
const project = ref(null)
const route = useRoute()

onMounted(async () => {
  console.log("aaa", route.params.id)
  project.value = await projectStore.fetchProject(route.params.id)
  console.log(project.value)
})
</script>

<template>
  <main>
    <h1>ProjectShow</h1>
    <p>ログイン中: {{ userStore.isLogin }}</p>
    <p>{{ project.name }}</p>
    <p>{{ project.recruitingText }}</p>
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
