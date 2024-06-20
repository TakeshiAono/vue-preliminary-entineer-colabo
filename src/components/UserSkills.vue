<template>
    <main>
        <h2>経験スキル</h2>
        <p>コーディングスキル</p>
        <ul>
        <li v-for="skillId in userStore.currentUser?.skillIds" :key="skillId">
            {{ getSkillName(skillId) }}
        </li>
        </ul>
    </main>
</template>
  
<script setup lang="ts">
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