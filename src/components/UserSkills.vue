<template>
    <main>
        <h2>経験スキル</h2>
        <p>コーディングスキル</p>
        <ul>
        <li v-for="skillId in userStore.currentUser?.skillIds" :key="skillId">
            {{ getSkillName(skillId) }}
        </li>
        </ul>
        <p>ロール経験</p>
        <ul>
        <li v-for="roleId in userStore.currentUser?.roleIds" :key="roleId">
            {{ getRoleName(roleId) }}
        </li>
        </ul>
    </main>
</template>
  
<script setup lang="ts">
import { useRoleStore } from '@/stores/roleStore';
import { useSkillStore } from '@/stores/skillStore';
import { useUserStore } from '@/stores/userStore';
import { onMounted } from 'vue';
  
  const userStore = useUserStore();
  const skillStore = useSkillStore();
  const roleStore = useRoleStore();
  
  onMounted(() => {
    skillStore.fetchSkills();
    roleStore.fetchRoles();
  });
  
  function getSkillName(skillId: number): string {
    const skill = skillStore.getSkillById(skillId);
    return skill ? skill.name : 'Unknown Skill';
  }

  function getRoleName(roleId: number): string {
    const role = roleStore.getRoleById(roleId);
    return role ? role.name : 'Unknown Role';
  }
  
  </script>