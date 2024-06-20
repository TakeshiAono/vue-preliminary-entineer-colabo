<template>
  <main>
    <h1 >{{ userStore.currentUser.name }}さんのプロフィール</h1>
    <UserIntroduction />
    <UserProjects />
    <UserFollowers />
    <UserSkills />
    <p>ロール経験{{ userStore.currentUser.roleIds }}</p>
  </main>
</template>

<script setup lang="ts">
import UserFollowers from '@/components/UserFollowers.vue';
import UserIntroduction from '@/components/UserIntroduction.vue';
import UserProjects from '@/components/UserProjects.vue';
import UserSkills from '@/components/UserSkills.vue';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();

</script>