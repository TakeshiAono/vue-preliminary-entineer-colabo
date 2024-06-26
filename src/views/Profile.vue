<template>
  <main>
    <p>ログイン中のユーザー{{ userStore.currentUser.name }}</p>
    <h1>{{ user?.name }}さんのプロフィール</h1>
    <UserIntroduction :user="user" />
    <UserProjects :projectIds="user?.projectIds || []" />
    <!-- <UserFollowers />  -->
    <p>フォロワー一覧{{ user?.followerIds }}</p>
  </main>
</template>

<script setup lang="ts">
// import UserFollowers from "@/components/UserFollowers.vue";
import UserIntroduction from "@/components/UserIntroduction.vue";
import UserProjects from "@/components/UserProjects.vue";
import { useProjectStore } from '@/stores/projectStore';
import { useUserStore } from "@/stores/userStore";
import { User } from "@/types";
import { onMounted, ref } from "vue";
import { useRoute } from 'vue-router';

const userStore = useUserStore();
const user = ref<User | null>(null);
const userProjectIds = ref<number[]>([]);
const route = useRoute();
const userId = parseInt(route.params.id as string, 10);
const projectStore = useProjectStore();

onMounted(async () => {
  try {
    const userInfo = await userStore.getUserInfo(userId);
    user.value = userInfo;
    if (userInfo?.projectIds) {
      await projectStore.setProjects(userInfo.projectIds); 
      userProjectIds.value = projectStore.getBelongingProjectIds();
    }
  } catch (error) {
    console.error('Error fetching user info:', error);
  }
});
</script>
