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

export type ResponseChannel = {
  id: number
  name: string
  userId: number | null
  chatRoomId: number | null
  createdAt: string
  updatedAt: string
  messageIds: number[]
}

export type Channel = ResponseChannel

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
  doneAt: string | null
  deadline: string | null
  description: string | null
  projectId: number | null
  inChargeUserId: number | null
  milestoneId: number | null
  createdAt: string
  updatedAt: string
}

type ResponseUserNotice = {
  id: number
  log: string
  userId: number
  createdAt: string
  updatedAt: string
}

type ResponseOperation = {
  id: number
  projectId: number
  log: string
  createdAt: string
  updatedAt: string
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

type ResponseMilestone = {
  id: number
  name: string
  deadline: string | null
  taskIds: number[]
  createdAt?: string
  updatedAt?: string
}

type ResponseSearchTasks = {
  projectId: number
  userId: number
  tasks: ResponseTask[]
}

type ResponseSkill = {
  id: number
  name: string
  countLog: number
  UserId: number
  createdAt?: string
  updatedAt?: string
}

type ResponseRole = {
  id: number
  name: string
  countLog: number
  UserId: number
  createdAt?: string
  updatedAt?: string
}
