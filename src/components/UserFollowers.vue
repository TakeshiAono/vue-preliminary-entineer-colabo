<template>
  <main>
    <h2>フォロワー一覧</h2>
    <div id="follower-list">
      <ul v-if="followers.length > 0">
        <li v-for="follower in followers" :key="follower.id">
          {{ follower.name }}
        </li>
      </ul>
      <p v-else>No followers found</p>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/userStore"
import type { User } from "@/types"
import { defineProps, ref, watch } from "vue"

const props = defineProps({
  userId: {
    type: Number,
    required: true,
  },
})

const followers = ref<User[]>([])
const userStore = useUserStore()

const fetchFollowers = async (userId: number) => {
  try {
    const user = await userStore.getUserInfo(userId)
    const followerIds = user.followerIds || []

    const followerDetails = await Promise.all(followerIds.map((id) => userStore.getUserInfo(id)))
    followers.value = followerDetails.filter((follower) => !!follower)
  } catch (error) {
    console.error("Error fetching followers:", error)
  }
}

watch(
  () => props.userId,
  (newUserId) => {
    if (newUserId) {
      fetchFollowers(newUserId)
    } else {
      followers.value = []
    }
  },
  { immediate: true },
)
</script>

<style scoped>
#follower-list {
  width: 200px;
  height: auto;
  border-radius: 10px;
  border: solid;
}

ul {
  padding-left: 10px;
}

li {
  list-style: none;
}
</style>
