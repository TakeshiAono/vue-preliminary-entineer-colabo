<script setup lang="ts">
import { onMounted, ref } from 'vue';
import VueApexCharts from 'vue-apexcharts'

const {users} = defineProps<{users: User[]}>()
const options = users.map( user => ({ label: user.name, value: user.id, disabled: false }))
const value = ref(options[0].value)
</script>

<template>
  <div id="user-select-content">
    <p>ユーザー</p>
    {{console.log("aasfssdfasdfa", value)}}
    <n-select id="user-selector" v-model:value="value" :options="options" />
  </div>
</template>

<style scoped>
#user-select-content {
  display: flex;
  justify-content: end;
  align-items: center;
}

#user-selector {
  width: 200px;
}
</style>
