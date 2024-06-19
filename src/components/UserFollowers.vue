<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import { onMounted, ref } from 'vue';

const userStore = useUserStore();

const followerInfo = ref<Record<number, any>>({});

const fetchFollowerInfo = async (followerId: number) => {
  followerInfo.value[followerId] = await userStore.getUserInfo(followerId);
}

onMounted(async () => {
  await Promise.all(userStore.currentUser.followerIds.map(userId => fetchFollowerInfo(userId)));
});
</script>

<template>
  <div v-if="userStore.currentUser">
    <h2>フォロワー</h2>
    <ul>
      <li v-for="followerId in userStore.currentUser.followerIds" :key="followerId">
        <template v-if="followerInfo[followerId]">
          {{ followerInfo[followerId].data.name }}
        </template>
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>