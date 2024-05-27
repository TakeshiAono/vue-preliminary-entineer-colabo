<script setup lang="ts">
import { computed, ref } from 'vue';

const keyword = ref("")
const fromDate = ref<Date | null>(null)
const toDate = ref<Date | null>(null)
const projectMemberCount = ref<number | null>(null)
const selectedSkills = ref<string[]>([])
const selectedMeetingFrequency = ref<string[]>([])

const selectableSkills = [
  [null, null],
  ["AWS", 4],
  ["Java", 3],
  ["Vue.js", 2],
  ["React", 1],
  ["JavaScript", 0]
]

const meetingFrequencies: {label: string, value: number, disabled: boolean}[] = [
  {label: "週3回以上", value: 4, disabled: false},
  {label: "週1回~2回", value: 3, disabled: false},
  {label: "月2回~3回", value: 2, disabled: false},
  {label: "月1回~2回", value: 1, disabled: false},
  {label: "月1回以下", value: 0, disabled: false},
]

const selectSkill = (event) => {
  const skillName = selectableSkills.find(skill => skill[1] == event.target.value)[0]
  selectedSkills.value.push(skillName)
  event.target.value = null
}

const formValue = computed(() => {
  return {
    keyword: keyword.value,
  }
})

const rules = {
}

const submit = () => {
  console.log(keyword.value, fromDate.value, selectedMeetingFrequency.value, projectMemberCount.value)
}

</script>

<template>
  <div id="searchContent">
    <n-form
      ref="formRef"
      inline
      :label-width="80"
      :model="formValue"
      :rules="rules"
    >
    </n-form>
    <span>検索キーワード</span>
    <n-input
      id = "keyword"
      v-model:value="keyword"
      type="text"
      placeholder=""
    />
    <span>目標完了日</span>
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
    <div>
      <span>関連技術</span>
      <span>
        <div id="tagSearchBox">
          <div v-for="skill in selectedSkills">
            <div :key="skill">{{skill}}</div>
          </div>
          <select id="tagPicker" @change="selectSkill($event)">
            <option :key="skill[1]" v-for="skill in selectableSkills" :value="skill[1]">{{skill[0]}}</option>
          </select>
        </div>
      </span>
    </div>
    <span>プロジェクトメンバ数</span>
    <n-input
      class="input"
      v-model:value="projectMemberCount"
      type="number"
      min="0"
      pattern="^[0-9]+$"
      placeholder=""
    />
    <span>ミーティング頻度</span>
    <n-select class="input" v-model:value="selectedMeetingFrequency" :options="meetingFrequencies" placeholder="" />
    <div>
      <n-button type="primary" id="searchSubmit" @click="submit()">
      検索
      </n-button>
    </div>
    {{ keyword }}
  </div>
</template>

<style scoped>
#keyword {
  width: 200px;
}

.datePicker {
  width: 150px;
}

#tagPicker {
  border: none;
  outline: none;
}

#searchContent {
  border: solid;
  border-radius: 20px;
  padding: 30px;
}

#tagSearchBox {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid;
  height: 1.8rem;
  width: 300px;
  border-radius: 3px;
  border-color:rgb(214, 212, 212)
}

#tagPicker {
  margin-left: auto;
  margin-right: 5px;
}

#searchSubmit {
  display: block;
  margin-left: auto;
}

.tag {
  background-color: green;
  border-radius: 20px;
  padding: 0px 10px;
  margin: 5px 2px;
}

.input {
  width: 200px;
}
</style>
