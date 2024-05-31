// / <reference types="vite/client" />
type ResponseUser = {
  id: number
  name: string | null
  email: string
  password: string
  iconUrl: string | null
  introduce: string | null
  isOwner: boolean | null
  createdAt: string
  updatedAt: string
  userNoticeIds: number[]
  messageIds: number[]
  skillIds: number[]
  roleIds: number[]
  channelIds: number[]
  offerIds: number[]
  taskIds: number[]
  scoutedOfferIds: number[]
  followerIds: number[]
  projectIds: number[]
}
type User = ResponseUser

type ResponseChannel = {
  id: number
  name: string
  userId: number | null
  chatRoomId: number | null
  createdAt: string
  updatedAt: string
  messageIds: number[]
}

type ResponseChatRoom = {
  id: number
  name: string
  projectId: number | null
  createdAt: string
  updatedAt: string
  channelIds: number[]
}

type ResponseDirectory = {
  id: number
  name: string
  projectId: number | null
  createdAt: string
  updatedAt: string
  fileIds: number[]
}

type ResponseFile = {
  id: number
  name: string
  fileUrl: string
  directoryId: number | null
  createdAt: string
  updatedAt: string
}

type ResponseMessage = {
  id: number
  text: string
  content: string
  userId: number | null
  channelId: number | null
  createdAt: string
  updatedAt: string
}

type ResponseProject = {
  id: number
  name: string
  iconUrl: string | null
  description: string | null
  deadline: string | null
  createdAt: string
  updatedAt: string
  useTechnology: Object
  recruitingMemberJob: Object
  recruitingText: string
  ownerId: number
  projectNoticeIds: number[]
  directoryIds: number[]
  chatRoomIds: number[]
  operationIds: number[]
  taskIds: number[]
  userIds: number[]
}

type ResponseTask = {
  id: number
  name: string
  doneAt: staring | null
  deadline: staring | null
  description: string | null
  projectId: number | null
  inChargeUserId: number | null
  createdAt: staring
  updatedAt: staring
}

type ResponseUserNotice = {
  id: number
  log: string
  userId: number
  createdAt: staring
  updatedAt: staring
}

type ResponseOperation = {
  id: number
  projectId: number
  log: string
  createdAt: staring
  updatedAt: staring
}

type Task = ResponseTask

type TasksOfProject = {
  projectId: number
  tasks: Task[]
}

type TasksMap = TasksOfProject

type TasksByUserMap = {
  userId: number
  tasks: Task[]
}
