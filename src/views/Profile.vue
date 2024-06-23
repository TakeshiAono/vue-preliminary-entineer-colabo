<template>
  <main>
    <h1 >{{ userStore.currentUser.name }}さんのプロフィール</h1>
    <UserIntroduction />
    <UserProjects />
    <UserFollowers />
  </main>
</template>

<script setup lang="ts">
import UserFollowers from '@/components/UserFollowers.vue';
import UserIntroduction from '@/components/UserIntroduction.vue';
import UserProjects from '@/components/UserProjects.vue';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();

</script>