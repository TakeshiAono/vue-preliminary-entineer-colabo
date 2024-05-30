<script setup lang="ts">
import _ from 'lodash';

type propsType = {
  searchedProjects?: Project[];
}

const props: propsType = defineProps(["searchedProjects"])

</script>

<template>
  <div v-for="project in props.searchedProjects">
    <div class="projectCard">
      <div class="cardHeader">
        <h1>{{ project.name }}</h1>
        <p>{{ project.ownerIds }}</p>
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
            <div v-for="technologyText in _.map(project.useTechnology, (value, key) => `${key + ': ' + value}`)">
              <p>{{ technologyText }}</p>
            </div>
          </div>
        </div>
        <div>
          <h2>募集メンバー</h2>
          <div class="recruitingMemberJobContent">
            <div v-for="recruitingMemberJobText in _.map(project.recruitingMemberJob, (value, key) => `${key + ': ' + value + '人'}`)">
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
  justify-content: space-between;
}

.projectContent {
  display: flex;
  justify-content: space-around;
  }
</style>
