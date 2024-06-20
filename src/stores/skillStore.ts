import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSkillStore = defineStore('skill', () => {
  const API_URL = import.meta.env.VITE_API_SERVER_URI
  const skills = ref<Skill[]>([])

  async function fetchSkills(): Promise<void> {
    const response = await axios.get<Skill[]>(`${API_URL}/skills`)
    skills.value = response.data
  }

  function getSkillById(id: number): Skill | undefined {
    return skills.value.find(skill => skill.id === id)
  }

  return {
    skills,
    fetchSkills,
    getSkillById
  }
})
