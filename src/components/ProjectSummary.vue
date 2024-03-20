<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import ProjectDescription from './ProjectDescription.vue';
import ProjectMemberSummary from './ProjectMemberSummary.vue';
const props = defineProps(["projects"])
const initProjectId = ref<string | null>(null)

onMounted(() => {
  if (props.projects && props.projects.length > 0) {
    initProjectId.value = props.projects[0].id
  }
})

const projectNames = computed(() => {
  return props.projects.map(project => 
    project.name
  );
})

// const projectDescriptions = computed(() => {
//   return props.projects.map(project => 
//     project.description
//   );
// })

const projectMemberNames = computed(() => {
  // return props.projects.map(project => 
  // console.log("sdaf",props.projects[initProjectId].userIds)
  const findProject = props.projects.find((project) => {
    return project.id == initProjectId.value
  })

  return props.userStore.findProject
  // 子コンポーネントにuserStoreをimportさせたくない。させるならProfile.vue
  // しかし、実際にデータを取得する作業はprojectSummaryにやらせたい
  // なので親コンポーネントでuserStoreのメソッドを子コンポーネントに渡す。
  // そして渡したものを親コンポーネントに渡してstate管理をしたい。
})

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
        <n-h3>所属プロジェクト一覧</n-h3>
        <p v-for="projectName in projectNames" :key="projectName">{{ projectName }}</p>
      </n-layout-sider>
      <n-layout-content content-style="padding: 24px;" v-if="initProjectId">
        <h1 id="project-name">{{ props.projects[initProjectId].name }}</h1>
        <ProjectDescription :description="props.projects[initProjectId].description"/>
        {{ console.log(props.projects[initProjectId]) }}
        <ProjectMemberSummary :member-names="props.projects[initProjectId].description"/>
      </n-layout-content>
    </n-layout>
</template>

<style scoped>
#project-name {
  text-decoration: underline;
}

nav {
  background: linear-gradient(skyblue, white);
  height: 2.5rem;
}

.wrapper {
  display: flex;
  justify-content: end;
  align-items: center;
  margin-top: auto;
  height: 100%;
  gap: 0 3%;
  margin-right: 10px;
  font-size: 1.2em;
  text-decoration: none;
}

.nav-content {
  text-decoration: none;
  color: black;
}
</style>
