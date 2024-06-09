type Project = Pick<
  ResponseProject,
  | 'id'
  | 'name'
  | 'iconUrl'
  | 'ownerId'
  | 'description'
  | 'useTechnology'
  | 'chatRoomIds'
  | 'recruitingText'
  | 'recruitingMemberJob'
>

type Task = Pick<
  ResponseTask,
  | 'id'
  | 'name'
  | 'doneAt'
  | 'projectId'
  | 'inChargeUserId'
  | 'deadline'
  | 'description'
  | 'createdAt'
  | 'updatedAt'
  | 'project'
  | 'user'
>

type User = Pick<
  ResponseUser,
  | 'id'
  | 'name'
  | 'isOwner'
  | 'email'
  | 'password'
  | 'iconUrl'
  | 'introduce'
  | 'createdAt'
  | 'updatedAt'
>
