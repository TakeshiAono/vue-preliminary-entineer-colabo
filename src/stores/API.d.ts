// / <reference types="vite/client" />
type ResponseUser = {
  id: number | null
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

type ResponseChannel = {
  id: number | null
  name: string
  userId: number | null
  chatRoomId: number | null
  createdAt: Date | null
  updatedAt: Date | null
  messages: Message[]
}

type ResponseChatRoom = {
  id: number | null
  name: string
  projectId: number | null
  createdAt: Date | null
  updatedAt: Date | null
  channels: Channel[]
}

type ResponseDirectory = {
  id: number | null
  name: string
  projectId: number | null
  createdAt: Date | null
  updatedAt: Date | null
  files: File[]
}

type ResponseFile = {
  id: number | null
  name: string
  fileUrl: string
  directoryId: number | null
  createdAt: Date | null
  updatedAt: Date | null
}

type ResponseMessage = {
  id: number | null
  text: string
  content: string
  userId: number | null
  channelId: number | null
  createdAt: Date | null
  updatedAt: Date | null
}

type ResponseProject = {
  id: number | null
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
  id: number | null
  name: string
  doneAt: Date | null
  deadline: Date | null
  description: string | null
  projectId: number | null
  inChargeUserId: number | null
  createdAt: Date | null
  updatedAt: Date | null
}
