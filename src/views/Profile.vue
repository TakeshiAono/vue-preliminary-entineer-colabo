<template>
  <main>
    <p>ログイン中のユーザー{{ userStore.currentUser.name }}</p>
    <h1>{{ user?.name }}さんのプロフィール</h1>
    <UserIntroduction :user="user" />
    <UserProjects :projectIds="user?.projectIds || []" />
    <UserFollowers :userId="user?.id" /> 
    <h2>オファーを出す</h2>
    <textarea v-model="offerMessage" placeholder="オファーメッセージを入力してください"></textarea>
    <p><button @click="submitOffer">オファーを出す</button></p>
  </main>
</template>

<script setup lang="ts">
import UserFollowers from "@/components/UserFollowers.vue";
import UserIntroduction from "@/components/UserIntroduction.vue";
import UserProjects from "@/components/UserProjects.vue";
import { useProjectStore } from '@/stores/projectStore';
import { useUserStore } from "@/stores/userStore";
import { User } from "@/types";
import axios from 'axios';
import { onMounted, ref } from "vue";
import { useRoute } from 'vue-router';

const userStore = useUserStore();
const user = ref<User | null>(null);
const userProjectIds = ref<number[]>([]);
const route = useRoute();
const userId = parseInt(route.params.id as string, 10);
const projectStore = useProjectStore();
const offerMessage = ref('');

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

const submitOffer = async () => {
  try {
    console.log('Offer message:', offerMessage.value); // ここで確認
    const response = await axios.post(`${import.meta.env.VITE_API_SERVER_URI}/offers/create`, {
      message: offerMessage.value,
      userId: userStore.currentUser.id,
      scoutedUserId: userId
    });
    console.log('Offer submitted response:', response);

    // オファーが成功したことをユーザーに通知するなど、適切なフィードバックを実装することができます。
  } catch (error) {
    console.error('Error submitting offer:', error);
    // エラーが発生した場合、ユーザーにエラーメッセージを表示するなど、適切に処理します。
  }
};
</script>
