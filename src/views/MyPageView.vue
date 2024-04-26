<script setup lang="ts">
import ProjectSummary from '@/components/ProjectSummary.vue';
import { useProjectStore } from '@/stores/projectStore';
import { useUserStore } from '@/stores/userStore';

const projectStore = useProjectStore()
const userStore = useUserStore()
</script>

<template>
  <main>
    <ProjectSummary :users= "userStore.getUsers()" :projects="projectStore.belongsProjects" :user-store="userStore" v-if="projectStore.belongsProjects.length > 0" />
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
