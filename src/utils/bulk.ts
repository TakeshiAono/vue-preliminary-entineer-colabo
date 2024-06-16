import { useProjectStore } from "@/stores/projectStore"
import { useTaskStore } from "@/stores/taskStore"
import { useUserStore } from "@/stores/userStore"
import VueCookies from "vue-cookies"

export const bulkFetch = async () => {
  const projectStore = useProjectStore()
  const userStore = useUserStore()
  const taskStore = useTaskStore()

  await userStore.login(VueCookies.get("email"), VueCookies.get("password"))
  const haveProjectIds = userStore.haveProjectIds
  haveProjectIds?.forEach(async (projectId) => {
    userStore.addUsersByProject(await projectStore.fetchProject(projectId))
  })
  await projectStore.setProjects(haveProjectIds)

  const user = userStore.getCurrentUser()
  const belongingProjectIds = projectStore.getBelongingProjectIds()
  if (!user) return
  await taskStore.initialize(belongingProjectIds, user.id)
}
