<script setup lang="ts">
const props = defineProps(["followerNames"])
</script>

<template>
  <h2>フォロワー</h2>
  <div>
    <p v-for="name in props.followerNames" :key="name">{{ name }}</p>
  </div>
</template>

<style scoped>

</style>