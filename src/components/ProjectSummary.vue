<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import ProjectDescription from './ProjectDescription.vue';
import ProjectMemberSummary from './ProjectMemberSummary.vue';

const props = defineProps(["projects", "userStore"])
const initProjectId = ref<string | null>(null)
const members = ref([])

onMounted(async () => {
  if (props.projects && props.projects.length > 0) {
    initProjectId.value = props.projects[0].id
    members.value = await projectMemberNames()
  }
})

const projectNames = computed(() => {
  return props.projects.map(project => 
    project.name
  );
})

const projectMemberNames = async () => {
  const findProject = props.projects.find((project) => {
    return project.id == initProjectId.value
  })

  if(findProject){
    const userIds = findProject.userIds
    const names = await Promise.all(userIds.map(async (id) => {
      const userInfo = await props.userStore.getUserInfo(id)
      return userInfo.data.name
    }));
    return names
  }
}
</script>

<template>
  <n-layout has-sider>
      <n-layout-sider
        collapse-mode="transform"
        :collapsed-width="80"
        :width="300"
        show-trigger="arrow-circle"
        content-style="padding: 24px;"
        bordered="true"
      >
        <n-h3 id="project-summary">プロジェクト一覧</n-h3>
        <p v-for="projectName in projectNames" :key="projectName">{{ projectName }}</p>
      </n-layout-sider>
      <n-layout-content content-style="padding: 24px;" v-if="initProjectId">
        <h1 id="project-name">{{ props.projects[initProjectId].name }}</h1>
        <ProjectDescription :description="props.projects[initProjectId].description"/>
        <ProjectMemberSummary :member-names="members"/>
      </n-layout-content>
    </n-layout>
</template>

<style scoped>
#project-name {
  text-decoration: underline;
}

#project-summary{
  font-weight: bold;
}
</style>
