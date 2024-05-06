<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{ users: User[] | null, initUser: User, projectId: number }>()
const options = ref(props.users && props.users.map(user => ({ label: user.name, value: user.id, disabled: false })))

const emit = defineEmits(["select"])
const selectedUserNotify = (user: User) => { emit("select", user) }

watch(() => props.users, () => {
  options.value = props.users && props.users.map(user => ({ label: user.name, value: user.id, disabled: false }))
})
</script>

<template>
  <div id="user-select-content">
    <p>ユーザー</p>
    <n-select :key="props.projectId" id="user-selector" :default-value="props.initUser.name" :options="options" @update:value="selectedUserNotify" />
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
