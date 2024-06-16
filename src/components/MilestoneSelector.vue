<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue"
import { useMilestoneStore } from "@/stores/milestoneStore"

const props = defineProps<{
  projectId: number
}>()

const milestoneStore = useMilestoneStore()

const emit = defineEmits(["select"])

const milestones = ref<Milestone[]>([])
const selectedMilestone = ref<number | undefined>(undefined)

const fetchMilestones = async () => {
  milestones.value = await milestoneStore.fetchMilestones(props.projectId)
  selectedMilestone.value = undefined
}

watch(
  () => props.projectId,
  () => {
    fetchMilestones()
  },
)

watch(selectedMilestone, (milestoneId) => {
  const milestone = milestones.value.find((milestone) => milestone.id === milestoneId)
  emit("select", milestone)
})

onMounted(() => {
  fetchMilestones()
})

const milestoneOptions = computed(() => [
  { label: "プロジェクト全体", value: undefined },
  ...milestones.value.map((milestone) => ({
    label: milestone.name,
    value: milestone.id,
  })),
])
</script>

<template>
  <div id="milestone-select-content">
    <p>マイルストーン</p>
    <n-select
      id="milestone-selector"
      :key="props.projectId"
      v-model:value="selectedMilestone"
      :options="milestoneOptions"
    />
  </div>
</template>

<style scoped>
#milestone-select-content {
  display: flex;
  justify-content: start;
  align-items: center;
}

#milestone-selector {
  width: 200px;
}
</style>
