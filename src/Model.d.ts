type Project = Pick<ResponseProject, 'id' | 'name' | 'iconUrl' | 'description'>

type Task = Pick<
  ResponseTask,
  | 'id'
  | 'name'
  | 'deadline'
  | 'doneAt'
  | 'projectId'
  | 'inChargeUserId'
  | 'description'
  | 'createdAt'
  | 'updatedAt'
>

type Task = Pick<
  Task,
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
