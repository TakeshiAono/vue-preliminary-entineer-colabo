<template>
  <main>
    <h1 >{{ userStore.currentUser.name }}さんのプロフィール</h1>
    <UserIntroduction />
    <UserProjects />
    <UserFollowers />
    <h2>経験スキル</h2>
    <ul>
      <li v-for="skillId in userStore.currentUser?.skillIds" :key="skillId">
        {{ getSkillName(skillId) }}
      </li>
    </ul>
    <p>コーディングスキル{{ userStore.currentUser.skillIds }}</p>
    <p>ロール経験{{ userStore.currentUser.roleIds }}</p>
  </main>
</template>

<script setup lang="ts">
import UserFollowers from '@/components/UserFollowers.vue';
import UserIntroduction from '@/components/UserIntroduction.vue';
import UserProjects from '@/components/UserProjects.vue';
import { useSkillStore } from '@/stores/skillStore';
import { useUserStore } from '@/stores/userStore';
import { onMounted } from 'vue';

const userStore = useUserStore();
const skillStore = useSkillStore();

onMounted(() => {
  skillStore.fetchSkills();
});

function getSkillName(skillId: number): string {
  const skill = skillStore.getSkillById(skillId);
  return skill ? skill.name : 'Unknown Skill';
}

</script>