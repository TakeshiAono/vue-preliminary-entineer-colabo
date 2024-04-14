type Project = {
  id: string;
  name: string;
  iconUrl: string;
  description: string;
  ownerIds: string[];
  membersIds: string[];
  projectNoticeIds: string[];
  directoryIds: string[];
  fileIds: string[];
  chatRoomIds: string[];
  userIds: string[];
}

type Task = {
  id: string;
  name: string;
  deadline: Date;
  isDone: boolean;
  projectId: string;
  inChargeUserId: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}