import { api, type AxiosPromise } from "@/api/axios"
import _ from "lodash"

export const fetchMessagesByChannels = async (
  channels: ResponseChannel[],
): Promise<ResponseMessage[]> => {
  return (
    await Promise.all(channels.map(async (channel) => await fetchMessagesByChannel(channel)))
  ).flat()
}

export const fetchMessagesByChannel = async (
  channel: ResponseChannel,
): Promise<ResponseMessage[]> => {
  return await Promise.all(
    channel.messageIds.map(async (messageId) => (await fetchMessage(messageId)).data),
  )
}

export const fetchMessage = async (messageId: number): AxiosPromise<ResponseMessage> => {
  return api.get(`/messages/${messageId}`)
}

export async function fetchUserNotices(user: ResponseUser): Promise<ResponseUserNotice[]> {
  const userNoticeIds = user.userNoticeIds
  return await Promise.all(
    userNoticeIds.map(async (id) => {
      const userNotice = await api.get(`/userNotices/${id}`)
      return userNotice.data
    }),
  )
}

export async function fetchOperationLog(project: ResponseProject): Promise<ResponseOperation[]> {
  const operationIds = project.operationIds
  return await Promise.all(
    operationIds.map(async (id) => {
      const operation = await api.get(`/operations/${id}`)
      return operation.data
    }),
  )
}

export async function fetchTasks(project: ResponseProject): Promise<ResponseTask[]> {
  const taskIds = project.taskIds
  return await Promise.all(
    taskIds.map(async (id) => {
      const task = (await api.get<Task>(`/tasks/${id}`)).data
      task.createdAt = new Date(task.createdAt)
      task.updatedAt = new Date(task.updatedAt)
      task.deadline = new Date(task.deadline)
      task.doneAt = task.doneAt && new Date(task.doneAt)
      return task
    }),
  )
}

export const fetchChannelIds = async (project: ResponseProject) => {
  const chatRoomIds = project.chatRoomIds
  const chatChannelIds = await Promise.all(
    chatRoomIds.map(async (id) => {
      const chatRoom = await api.get(`/chatRooms/${id}`)
      return chatRoom.data.channelIds
    }),
  )
  return _.flatten(chatChannelIds)
}

export async function fetchChannels(project: ResponseProject): Promise<ResponseChannel[]> {
  const channelIds = await fetchChannelIds(project)
  return await Promise.all(
    channelIds.map(async (id) => {
      const channel = await api.get(`/channels/${id}`)
      return channel.data
    }),
  )
}
