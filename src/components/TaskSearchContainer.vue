<script setup lang="ts">
import { ref } from "vue"
import type { searchTasksParams } from "@/stores/taskStore"

const emits = defineEmits<{ (e: "searchTasks", params: searchTasksParams): void }>()

const keyword = ref<string | undefined>(undefined)
const projectId = ref<number | undefined>(undefined)
const milestoneId = ref<number | undefined>(undefined)
const userId = ref<number | undefined>(undefined)
const deadlineFromDate = ref<Date | undefined>(undefined)
const deadlineToDate = ref<Date | undefined>(undefined)

const submit = async () => {
  const params: searchTasksParams = {
    name: keyword.value,
    description: keyword.value,
    projectId: projectId.value,
    userId: userId.value,
    milestoneId: milestoneId.value,
    deadlineFromDate: deadlineFromDate.value?.toLocaleString(),
    deadlineToDate: deadlineToDate.value?.toLocaleString(),
    // isDone: "", // TODO ｢完了済みを含める｣みたいなチェックボックスを設置
  }
  emits("searchTasks", params)
}
</script>

<template>
  <div id="searchContent">
    <div id="row1SearchGridContainer">
      <div>
        <span>検索キーワード: </span>
        <n-input id="keyword" v-model:value="keyword" type="text" placeholder="" />
      </div>
      <div>
        <span>期限: </span>
        <n-input class="datePicker" v-model:value="deadlineFromDate" type="date" placeholder="" /> ~
        <n-input class="datePicker" v-model:value="deadlineToDate" type="date" placeholder="" />
      </div>
    </div>
    <div id="row2SearchGridContainer">
      <div>
        <span>プロジェクトID: </span>
        <!-- TODO セレクトボックスから選択 -->
        <n-input
          class="input"
          v-model:value="projectId"
          type="number"
          pattern="^[0-9]+$"
          placeholder=""
        />
      </div>
      <div class="flex-container">
        <!-- TODO セレクトボックスから選択 -->
        <span>マイルストーンID: </span>
        <n-input
          class="input"
          v-model:value="milestoneId"
          type="number"
          pattern="^[0-9]+$"
          placeholder=""
        />
      </div>
      <!-- <div> -->
        <!-- <span>担当者ID: </span> -->
        <!-- TODO セレクトボックスから選択 -->
        <!-- <n-input
          class="input"
          v-model:value="userId"
          type="number"
          pattern="^[0-9]+$"
          placeholder=""
        /> -->
      <!-- </div> -->
    </div>
    <div>
      <n-button type="primary" id="searchSubmit" @click="submit()"> 検索 </n-button>
    </div>
  </div>
</template>

<style scoped>
#keyword {
  width: 200px;
}

.flex-container {
  display: flex;
  align-items: center;
}

#row1SearchGridContainer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 20px;
}

#row2SearchGridContainer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 20px;
}

.datePicker {
  width: 150px;
}

#tagPicker {
  border: none;
  outline: none;
}

#milestone {
  display: block;
}

#searchContent {
  border: solid;
  border-radius: 20px;
  padding: 30px;
  margin: 20px;
}

#tagSearchBox {
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid;
  height: 2rem;
  border-radius: 3px;
  border-color: rgb(214, 212, 212);
}

#tagPicker {
  margin-left: auto;
  margin-right: 5px;
  width: 50px;
}

#searchSubmit {
  display: block;
  margin-left: auto;
}

.tag {
  border-radius: 20px;
  padding: 0px 10px;
  margin: 5px 2px;
}

.input {
  width: 200px;
}
</style>
