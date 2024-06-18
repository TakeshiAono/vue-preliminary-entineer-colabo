<template>

  <main>
    <h1 v-if="userStore.currentUser">{{ userStore.currentUser.name }}さんのプロフィール</h1>
    <UserIntroduction v-if="userStore.currentUser" />
    <UserProjects />
    <h2>フォロワー</h2>
      <p>{{ userStore.currentUser.followerIds }}</p>
  </main>
</template>
<script setup lang="ts">
import UserIntroduction from '@/components/UserIntroduction.vue';
import UserProjects from '@/components/UserProjects.vue';
import { useProjectStore } from '@/stores/projectStore';
import { useUserStore } from '@/stores/userStore';
import { onMounted } from 'vue';

const userStore = useUserStore();
const projectStore = useProjectStore();

onMounted(async () => {
  await projectStore.fetchAllProjects();
});
</script>