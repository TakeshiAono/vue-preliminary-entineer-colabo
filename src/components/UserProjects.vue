<script setup lang="ts">
import { useProjectStore } from '@/stores/projectStore';
import { useUserStore } from '@/stores/userStore';
import { computed, onMounted } from 'vue';

const userStore = useUserStore();
const projectStore = useProjectStore();

const userProjects = computed(() => {
  if (!userStore.currentUser || !projectStore.allProjects.length) return [];
  return getUserProjectNames(userStore.currentUser.projectIds);
});

function getUserProjectNames(projectIds: number[]) {
  return projectIds.map(id => {
    const project = projectStore.allProjects.find(project => project.id === id);
    return project ? project.name : 'Unknown Project';
  });
}

onMounted(async () => {
  await projectStore.fetchAllProjects();
});
</script>

<template>
  <div v-if="userStore.currentUser">
    <h2>参加PJ一覧</h2>
    <ul>
      <li v-for="projectName in userProjects" :key="projectName">
        {{ projectName }}
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>