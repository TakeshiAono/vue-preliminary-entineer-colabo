<template>
  <main>
    <p>ログイン中のユーザー{{ userStore.currentUser.name }}</p>
    <h1>{{ user?.name }}さんのプロフィール</h1>
    <p>参加PJ一覧{{ user?.projectIds }}</p>
    <p>フォロワー一覧{{ user?.followerIds }}</p>
    <UserIntroduction :user="user" />
    <!-- <UserProjects /> -->
    <!-- <UserFollowers />  -->
  </main>
</template>

<script setup lang="ts">
// import UserFollowers from "@/components/UserFollowers.vue";
import UserIntroduction from "@/components/UserIntroduction.vue";
// import UserProjects from "@/components/UserProjects.vue";
import { useUserStore } from "@/stores/userStore";
import { onMounted, ref } from "vue";
import { useRoute } from 'vue-router';

const userStore = useUserStore();
const user = ref<User | null>(null);
const route = useRoute();
const userId = parseInt(route.params.id as string, 10);

onMounted(async () => {
  try {
    const userInfo = await userStore.getUserInfo(userId);
    console.log(userInfo)
    user.value = userInfo; // ユーザー情報をセット
  } catch (error) {
    console.error('Error fetching user info:', error);
  }
});
</script>
