<script setup lang="ts">
const props = defineProps(["memberNames"])
</script>

<template>
  <h1 id="project-member-title">メンバー</h1>
  <div id="project-member-content">
    <p class="member" v-for="name in props.memberNames" :key="name">{{ name }}</p>
  </div>
</template>

<style scoped>
#project-member-title {
  text-decoration: underline;
}

#project-member-content {
  width: 200px;
  height: 100px;
  border-radius: 10px;
  border: solid;
}

.member {
  margin: 5px;
}
</style>
