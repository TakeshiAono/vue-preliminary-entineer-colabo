<script setup lang="ts">
import { onMounted, ref } from 'vue';
import VueApexCharts from 'vue3-apexcharts'
import UserTaskSelector from './UserTaskSelector.vue';
import _ from 'lodash';

const {users, tasks} = defineProps<{users: User[], tasks: Task[]}>()

const sortedTasksByDate = _.sortBy(tasks.filter(task => task.doneAt != null), (task) => {return task.doneAt})
const leastTask = _.last(sortedTasksByDate)
const headTask = _.head(sortedTasksByDate)

var options = {
  yaxis: {
    min: 0,
    max: 100
  },
  theme: {
    mode: "light"
  },
  title: {
    text: "完了タスク"
  },
  xaxis: {
    categories: [headTask?.deadline, 1992,1993,1994,1995,1996,1997, 1998, 1999, 1999, 1999, leastTask?.deadline]
  }
}

const series = [
    {
        name: "Series 1",
        data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
    }
];
</script>

<template>
  <UserTaskSelector :users="users"/>
  <apexchart width="350" type="area" :options="options" :series="series"/>
</template>

<style scoped>
</style>
