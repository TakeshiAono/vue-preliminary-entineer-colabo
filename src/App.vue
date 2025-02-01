<script setup lang="ts">
import { RouterView } from "vue-router"
import NavigationBar from "./components/NavigationBar.vue"
import { NConfigProvider, NMessageProvider } from "naive-ui"
</script>

<template>
  <NConfigProvider>
    <NMessageProvider>
      <n-dialog-provider>
        <NavigationBar />
        <RouterView />
      </n-dialog-provider>
    </NMessageProvider>
  </NConfigProvider>
</template>

<style scoped>
.n-config-provider {
  display: flex;
  flex-direction: column;
  flex: 1;
}

main {
  height: 100%;
}
</style>
