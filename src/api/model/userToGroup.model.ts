import { GroupRoles } from './group.model'

export interface UserToGroup {
  userId: number
  groupId: number
  role: GroupRoles
  joinedAt: string
}
