<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import dayjs from 'dayjs'

const props = defineProps<{ users: User[], project: Project, user: User, tasks: Task[] | [] }>()
const data = ref([
  {
    data: []
  }
]);
const graphStartDay = ref<dayjs.Dayjs>(dayjs().subtract(4, 'year'))
const options = ref({})

const setDateList = (sectionNumber: number, period: number, unit: "year" | "month" | "day") => {
  const dayList: dayjs.Dayjs[] = []
  let baseDate = graphStartDay.value
  for (let index = 0; index <= sectionNumber; index++) {
    const nextDate = dayjs(baseDate).add(period, unit)
    dayList.push(nextDate)
    baseDate = nextDate
  }

  const stringDayList = dayList.map(dayjs => dayjs.format("YY/MM/DD"))

  const dataByPeriod = dayList.map((day, index) => {
    const nextIndex = index + 1
    if (nextIndex <= dayList.length - 1) {
      return props.tasks.filter(task => dayList[index] <= dayjs(task.doneAt) && dayjs(task.doneAt) < dayList[nextIndex]).length
    } else {
      return props.tasks.filter(task => dayList[index] <= dayjs(task.doneAt) && dayjs(task.doneAt) < dayList[index].add(1, "month")).length
    }
  })

  data.value = [{
    name: "Series 1",
    data: dataByPeriod
  }]
  console.log(dataByPeriod, stringDayList)

  options.value = {
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
      categories: stringDayList
    }
  }
}

onMounted(async () => {
  updateDateList()
})

watch(() => props.tasks, () => {
  updateDateList()
})

watch(() => props.user, () => {
  updateDateList()
})

const updateDateList = () => {
  setDateList(12, 6, "month")
}


</script>

<template>
  <apexchart width="350" type="area" :options="options" :series="data" />
</template>

<style scoped></style>
