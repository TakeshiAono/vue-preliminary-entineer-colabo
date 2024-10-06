<script setup lang="ts">
import { ref, watch } from "vue"
import dayjs from "dayjs"

const props = defineProps<{ tasks: Task[] | [] }>()
const data = ref<{ data: number[] }[]>([])
const graphStartDay = ref<dayjs.Dayjs>(dayjs().subtract(4, "year"))
const options = ref({})

watch([() => props.tasks], () => {
  updateGraph()
})

const updateGraph = () => {
  const dayList = createDayList(12, 6, "month")
  updateData(getTaskNumberListByPeriod(dayList))
  updateGraphSetting(dayList)
}

const updateGraphSetting = (dayList: dayjs.Dayjs[]) => {
  const stringDayList = dayList.map((dayjs) => dayjs.format("YY/MM/DD"))

  options.value = {
    yaxis: {
      min: 0,
      max: 100,
    },
    theme: {
      mode: "light",
    },
    title: {
      text: "完了タスク",
    },
    xaxis: {
      categories: stringDayList,
    },
  }
}

const createDayList = (sectionNumber: number, period: number, unit: "year" | "month" | "day") => {
  const dayList: dayjs.Dayjs[] = []
  let baseDate = graphStartDay.value
  for (let index = 0; index <= sectionNumber; index++) {
    const nextDate = dayjs(baseDate).add(period, unit)
    dayList.push(nextDate)
    baseDate = nextDate
  }

  return dayList
}

const getTaskNumberListByPeriod = (dayList: dayjs.Dayjs[]): number[] => {
  const taskNumberList: number[] = []
  dayList.map((day, index) => {
    const nextIndex = index + 1
    if (nextIndex <= dayList.length - 1) {
      taskNumberList.push(
        props.tasks.filter(
          (task) => dayList[index] <= dayjs(task.doneAt) && dayjs(task.doneAt) < dayList[nextIndex],
        ).length,
      )
    } else {
      taskNumberList.push(
        props.tasks.filter(
          (task) =>
            dayList[index] <= dayjs(task.doneAt) &&
            dayjs(task.doneAt) < dayList[index].add(1, "month"),
        ).length,
      )
    }
  })

  return taskNumberList
}

const updateData = (dataList: number[]) => {
  data.value = [
    {
      data: dataList,
    },
  ]
}
</script>

<template>
  <apexchart width="350" type="area" :options="options" :series="data" />
</template>

<style scoped></style>
