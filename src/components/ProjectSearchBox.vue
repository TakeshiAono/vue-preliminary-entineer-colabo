<script setup lang="ts">
import router from '@/router';
import { nextTick, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useProjectStore } from '@/stores/projectStore';

const emits = defineEmits<{e: "searchedProjects", value: Project}>()
const route = useRoute()
const projectStore = useProjectStore();

const keyword = ref(null)
const fromDate = ref<Date | null>(null)
const toDate = ref<Date | null>(null)
const projectMemberCount = ref<number | null>(null)
const selectedSkills = ref<string[]>([])
const selectedMeetingFrequency = ref<string>(null)

const selectableSkills = [
  [null, null],
  ["FastAPI", 8, "blue", "white"],
  ["Rails", 7, "red", "black"],
  ["Python", 6, "skyblue", "black"],
  ["Ruby", 5, "red", "black"],
  ["AWS", 4, "red", "black"],
  ["Java", 3, "blue", "white"],
  ["Vue.js", 2, "green", "white"],
  ["React", 1, "yellow", "black"],
  ["JavaScript", 0, "pink", "black"]
]

const meetingFrequencies: {label: string, value: string, disabled: boolean}[] = [
  {label: "週3回以上", value: "4", disabled: false},
  {label: "週1回~2回", value: "3", disabled: false},
  {label: "月2回~3回", value: "2", disabled: false},
  {label: "月1回~2回", value: "1", disabled: false},
  {label: "月1回以下", value: "0", disabled: false},
]

const selectSkill = (event) => {
  const skill = selectableSkills.find(skill => skill[1] == event.target.value)
  selectedSkills.value.push(skill)
  selectedSkills.value = Array.from(new Set(selectedSkills.value))
  event.target.value = null
}

const submit = async () => {
  const keywordParams = !keyword.value ? null : `keyword=${keyword.value}`
  const fromDateParams = !fromDate.value ? null : `fromDate=${fromDate.value}`
  const toDateParams = !toDate.value ? null : `toDate=${toDate.value}`
  const projectMemberCountParams = projectMemberCount.value == null ? null : `projectMemberCount=${projectMemberCount.value}`
  const selectedMeetingFrequencyParams = !selectedMeetingFrequency.value ? null : `selectedMeetingFrequency=${selectedMeetingFrequency.value}`

  const arrayToQueryString = (key, array) => {
    return array.map(value => `${key}=${encodeURIComponent(value)}`).join("&");
  };

  const selectedSkillsParams = selectedSkills.value.length === 0 ? null : arrayToQueryString('selectedSkills', selectedSkills.value.map(skillArray => skillArray[0]))
  const paramsArray = [keywordParams, fromDateParams, toDateParams, projectMemberCountParams, selectedSkillsParams, selectedMeetingFrequencyParams]
  const queryString = paramsArray.filter(value => value).join("&")
  const response = await projectStore.searchProjects(queryString)
  emits("searchedProjects", response)
}
</script>

<template>
  <div id="searchContent">
    <div id="row1SearchGridContainer">
      <div>
        <span>検索キーワード: </span>
        <n-input
          id = "keyword"
          v-model:value="keyword"
          type="text"
          placeholder=""
        />
      </div>
      <div>
        <span>目標完了日: </span>
        <n-input
          class="datePicker"
          v-model:value="fromDate"
          type="date"
          placeholder=""
        /> ~
        <n-input
          class="datePicker"
          v-model:value="toDate"
          type="date"
          placeholder=""
        />
      </div>
    </div>
    <div id="row2SearchGridContainer">
      <div>
        <span>プロジェクトメンバ数: </span>
        <n-input
          class="input"
          v-model:value="projectMemberCount"
          type="number"
          min="0"
          pattern="^[0-9]+$"
          placeholder=""
        />
      </div>
      <div class="flex-container">
        <span>ミーティング頻度: </span>
        <span>
          <n-select id="meetingFrequency" class="input" v-model:value="selectedMeetingFrequency" :options="meetingFrequencies" placeholder="" />
        </span>
      </div>
    </div>
    <div>
      <span>関連技術(and条件): </span>
      <span>
        <div id="tagSearchBox">
          <div v-for="skill in selectedSkills">
            <div class="tag" :key="skill[1]" :style="{ backgroundColor: skill[2], color: skill[3] }">{{skill[0]}}</div>
          </div>
          <select id="tagPicker" @change="selectSkill($event)">
            <option :key="skill[1]" v-for="skill in selectableSkills" :value="skill[1]">{{skill[0]}}</option>
          </select>
        </div>
      </span>
    </div>
    <div>
      <n-button type="primary" id="searchSubmit" @click="submit()">
      検索
      </n-button>
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

#meetingFrequency {
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
  border-color:rgb(214, 212, 212)
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
