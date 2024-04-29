<script setup lang="ts">
import { ref } from 'vue';
import UserTaskSelector from './UserTaskSelector.vue';
import _ from 'lodash';

const {users, tasks} = defineProps<{users: User[], tasks: Task[]}>()

const sortedTasksByDate = _.sortBy(tasks.filter(task => task.doneAt != null), (task) => {return task.doneAt})
const initUser = users[0]
const leastTask = _.last(sortedTasksByDate)
const headTask = _.head(sortedTasksByDate)

const selectedUser = ref(users[0])
const selectHandler = (selectedUserId: number) => {selectedUser.value = users.find(user => user.id == selectedUserId) as User}

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
  <UserTaskSelector :users="users" :initUser="initUser" @select="selectHandler"/>
  <apexchart width="350" type="area" :options="options" :series="series"/>
</template>

<style scoped>
</style>
