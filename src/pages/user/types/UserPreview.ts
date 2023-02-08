import { PublicUser } from './PublicUser'

export type UserPreview = PublicUser & {
  presentations: number
  averageRating: number
  attendances: number
}

export interface UserList {
  userList: UserPreview[]
  userCount: number
}
