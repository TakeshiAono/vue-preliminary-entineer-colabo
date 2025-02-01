<script setup lang="ts">
const props = defineProps(["memberNames"])
</script>

<template>
  <div id="container">
    <h2 id="project-member-title">メンバー</h2>
    <div id="project-member-content">
      <p class="member" v-for="name in props.memberNames" :key="name">{{ name }}</p>
    </div>
  </div>
</template>

<style scoped>
#container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

#project-member-title {
  text-decoration: underline;
}

#project-member-content {
  width: 100%;
  flex: 1;
  border-radius: 10px;
  border: solid;
}

.member {
  margin: 5px;
}
</style>
