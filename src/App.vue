<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import NavigationBar from './components/NavigationBar.vue';
</script>

<template>
  <div class="wrapper">
    <NavigationBar :isLogin="isLogin"/>
  </div>

  <RouterView />
</template>

<style scoped>
</style>
