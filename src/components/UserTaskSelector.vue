<script setup lang="ts">
const {users, initUser} = defineProps<{users: User[], initUser: User}>()
const options = users.map( user => ({ label: user.name, value: user.id, disabled: false }))

const emit = defineEmits(["select"])
const selectedUserNotify = (user: User) => {emit("select", user)}
</script>

<template>
  <div id="user-select-content">
    <p>ユーザー</p>
    <n-select id="user-selector" :default-value="initUser.name" :options="options" @update:value="selectedUserNotify" />
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
