<template>
  <main>
    <h2>オファーメッセージ</h2>
    <div id="offer-input">
      <n-select v-model:value="selectedProject" :options="projectOptions" placeholder="プロジェクトを選択" @update:value="logSelectedProject" />
      <textarea v-model="offerStore.offerMessage" placeholder="オファーメッセージを入力してください" rows="30" class="offer-textarea"></textarea>
      <n-button type="primary" @click="submitOffer" class="offer-submit-btn">オファーを出す</n-button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useOfferStore } from "@/stores/offerStore";
import { useProjectStore } from "@/stores/projectStore";
import { useUserStore } from "@/stores/userStore";
import { onMounted, ref } from 'vue';

const props = defineProps<{ scoutedUserId: number }>();

const userStore = useUserStore();
const projectStore = useProjectStore();
const offerStore = useOfferStore();

const selectedProject = ref<number | null>(null);
const projectOptions = ref<{ label: string, value: number }[]>([]);

onMounted(() => {
  const projects = projectStore.belongingProjects;
  projectOptions.value = projects.map(project => ({ label: project.name, value: project.id }));
});

const logSelectedProject = (value: number) => {
  console.log('Selected project:', value);
  selectedProject.value = value;
};

const submitOffer = async () => {
  if (selectedProject.value === null) {
    console.error('プロジェクトを選択してください');
    return;
  }

  try {
    const offerData = {
      message: offerStore.offerMessage,
      userId: userStore.currentUser.id,
      scoutedUserId: props.scoutedUserId,
      projectId: selectedProject.value,
    };
    console.log('Submitting offer data:', offerData);
    await offerStore.submitOffer(offerData.userId, offerData.scoutedUserId, offerData.projectId);
  } catch (error) {
    console.error('Error submitting offer:', error);
  }
};
</script>

<style scoped>
.offer-textarea {
  width: 100%;
  outline: none;
  resize: none;
}

#offer-input {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.offer-submit-btn{
  margin-top: 10px;
}

.n-dialog__content{
  margin-bottom: 0;
}
</style>
