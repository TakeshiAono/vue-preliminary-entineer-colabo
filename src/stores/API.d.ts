// / <reference types="vite/client" />
type GetResponseUser =
{
  id: string,
  name: string,
  email: string,
  password: string,
  iconUrl: string,
  introduce: string,
  followerIds: string[],
  skillIds: string[],
  rollIds: string[],
  channelIds: string[],
  messageIds: string[],
  offerIds: string[],
  userNoticeIds: string[],
  projectIds: string[],
}
