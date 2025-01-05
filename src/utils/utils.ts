import type { ProjectStore } from "@/stores/projectStore"
import type { UserStore } from "@/stores/userStore"
import _ from "lodash"

export const sortByUpdatedAt = <T extends { updatedAt: string }>(objects: T[]): T[] => {
  return _.sortBy(objects, (object) => new Date(object.updatedAt)).reverse()
}

export const getUsersByProject = (
  projectStore: ProjectStore,
  userStore: UserStore,
  projectId: number,
): User[] => {
  const userIds = projectStore.getUserIdsByProject(projectId) // NOTE: プロジェクト1つにつき最低一人はユーザーが存在するため
  return userIds.map((userId) => userStore.users.find((user) => userId == user.id)) as User[] // NOTE: プロジェクト1つにつき最低一人はユーザーが存在するため
}
