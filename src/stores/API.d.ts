// / <reference types="vite/client" />
type ResponseUser = {
  id: number
  name: string | null
  email: string
  password: string
  iconUrl: string | null
  introduce: string | null
  isOwner: boolean | null
  createdAt: Date | null
  updatedAt: Date | null
  userNotices: UserNotice[]
  messages: Message[]
  skills: Skill[]
  roles: Role[]
  channels: Channel[]
  offers: Offer[]
  tasks: Task[]
  scoutedOffers: Offer[]
  followers: Follower[]
  projects: Project[]
}
type User = ResponseUser

type ResponseChannel = {
  id: number
  name: string
  userId: number | null
  chatRoomId: number | null
  createdAt: Date | null
  updatedAt: Date | null
  messages: Message[]
}

type ResponseChatRoom = {
  id: number
  name: string
  projectId: number | null
  createdAt: Date | null
  updatedAt: Date | null
  channels: Channel[]
}

type ResponseDirectory = {
  id: number
  name: string
  projectId: number | null
  createdAt: Date | null
  updatedAt: Date | null
  files: File[]
}

type ResponseFile = {
  id: number
  name: string
  fileUrl: string
  directoryId: number | null
  createdAt: Date | null
  updatedAt: Date | null
}

type ResponseMessage = {
  id: number
  text: string
  content: string
  userId: number | null
  channelId: number | null
  createdAt: Date | null
  updatedAt: Date | null
}

type ResponseProject = {
  id: number
  name: string
  iconUrl: string | null
  description: string | null
  deadline: Date | null
  createdAt: Date | null
  updatedAt: Date | null
  owners: Owner[]
  projectNotices: ProjectNotice[]
  directories: Directory[]
  chatRooms: ChatRoom[]
  operations: Operation[]
  tasks: Task[]
  users: User[]
}

type ResponseTask = {
  id: number
  name: string
  doneAt: Date | null
  deadline: Date | null //
  description: string | null //
  projectId: number | null
  inChargeUserId: number | null
  createdAt: Date | null //
  updatedAt: Date | null
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
