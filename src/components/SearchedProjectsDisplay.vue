<script setup lang="ts">
import router from '@/router';
import axios from 'axios';
import _ from 'lodash';
import { ref, watch } from 'vue';

type propsType = {
  searchedProjects?: Project[];
}

const props: propsType = defineProps(["searchedProjects"])
const projectUserMaps = ref<{projectId: number, user: User}[] | []>([])

watch(props, async () => {
  if (props.searchedProjects) {
    projectUserMaps.value = await Promise.all(props.searchedProjects.map(async (project) => {
      const owner = await fetchUser(project.ownerId)
      return {projectId: project.id, user: owner}
    }))
  }
})

async function fetchUser(id: number) {
  const API_URL = import.meta.env.VITE_API_SERVER_URI
  const response = await axios.get(`${API_URL}/users/${id}`)
  return response.data
}

const getProjectUser = (projectId: number) => {
  const projectUserMap = projectUserMaps.value.find(projectUserMap => projectUserMap.projectId === projectId)
  return projectUserMap && projectUserMap.user
}
</script>

<template>
  <div :key="project.id" v-for="project in props.searchedProjects">
    <div class="projectCard" @click="router.push({path: `/projects/${project.id}`})">
      <div class="cardHeader">
        <h1>{{ project.name }}</h1>
        <div>
          <span>責任者: </span>
          <span>{{ getProjectUser(project.id)?.iconUrl }}</span>
          <span>{{ getProjectUser(project.id)?.name }}</span>
        </div>
      </div>
      <div class="projectContent">
        <div>
          <h2>PJ概要</h2>
          <div class="descriptionContent">
            <p>{{ project.description }}</p>
          </div>
        </div>
        <div>
          <h2>関連技術</h2>
          <div class="technologyContent">
            <div :key="project.id + technologyText" v-for="technologyText in _.map(project.useTechnology, (value, key) => `${key + ': ' + value}`)">
              <p>{{ technologyText }}</p>
            </div>
          </div>
        </div>
        <div>
          <h2>募集メンバー</h2>
          <div class="recruitingMemberJobContent">
            <div :key="project.id + recruitingMemberJobText" v-for="recruitingMemberJobText in _.map(project.recruitingMemberJob, (value, key) => `${key + ': ' + value + '人'}`)">
              <p>{{ recruitingMemberJobText }}</p>
            </div>
          </div>
        </div>
        <div>
          <h2>ひとこと</h2>
          <div class="recruitingTextContent">
            <p>{{ project.recruitingText }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  margin-top: 0;
}

h2 {
  margin-bottom: 0;
}

.projectCard {
  border: solid;
  margin: 20px auto;
  padding: 10px;
  border-radius: 10px;
  width: 90%;
  cursor: pointer;
}

.descriptionContent,.technologyContent,.recruitingMemberJobContent,.recruitingTextContent {
  border: solid;
  border-radius: 10px;
  align-content: start;
  width: 200px;
  height: 130px;
  padding: 5px;
}

.cardHeader {
  display: flex;
  justify-content:space-between;
  align-items: center;
}

.projectContent {
  display: flex;
  justify-content: space-around;
  }
</style>
