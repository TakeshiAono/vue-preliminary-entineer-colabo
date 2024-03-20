import { useProjectStore } from '@/stores/projectStore'
import { useUserStore } from '@/stores/userStore'
import VueCookies from 'vue-cookies'

export const bulkFetch = async () => {
  const projectStore = useProjectStore()
  const userStore = useUserStore()
  await userStore.login(VueCookies.get('email'), VueCookies.get('password'))
  projectStore.setProjects(userStore.haveProjectIds)
}
