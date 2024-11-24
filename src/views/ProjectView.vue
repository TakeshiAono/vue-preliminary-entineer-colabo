<script setup lang="ts">
import DashboardContainerForProjectView from "@/components/DashboardContainerForProjectView.vue"
import ProjectDescription from "@/components/ProjectDescription.vue"

import { useProjectStore } from "@/stores/projectStore"
import { useUserStore } from "@/stores/userStore"
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"

const userStore = useUserStore()
const projectStore = useProjectStore()
const project = ref({ name: "", description: "" })
const projectUsers = ref([])
const route = useRoute()
const projectId = parseInt(route.params.id as string, 10)
const tasks = ref([])

onMounted(async () => {
  project.value = await projectStore.fetchProject(projectId)
  if (project.value?.userIds) {
    const users = await Promise.all(
      project.value.userIds.map(async (userId: number) => await userStore.getUserInfo(userId)),
    )
    projectUsers.value = users
  }
})
</script>

<template>
  <main>
    <h1>{{ project.name }}</h1>
    <div v-if="project" id="project-layout">
      <div id="left-side">
        <ProjectDescription :description="project.description" :width="'100%'" />
        <h1 id="project-member-title">メンバー</h1>
        <div id="project-member-content">
          <div v-if="projectUsers.length">
            <p v-for="user in projectUsers" :key="user.id">{{ user.name }}</p>
          </div>
        </div>
      </div>
      <div id="right-side">
        <div>
          <h1>応募フォーム</h1>
          <div id="application-form-content">
            <button>参加希望を出す</button>
          </div>
        </div>

        <DashboardContainerForProjectView
          v-if="projectUsers.length > 0 && project.name !== ''"
          :tasks="[]"
          :projects="[project]"
          :selectedProjectId="projectId"
          :users="projectUsers"
        />
      </div>
    </div>
  </main>
</template>

<style scoped>
#project-layout {
  display: flex;
  gap: 50px;
}

#left-side {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 80px;
}

#right-side {
  flex: 3;
  margin-right: 80px;
}

#application-form-content {
  max-width: 600px;
  width: 100%;
  height: 170px;
  border-radius: 10px;
  border: solid;
}

#project-member-content {
  height: 320px;
  border-radius: 10px;
  border: solid;
}
</style>
