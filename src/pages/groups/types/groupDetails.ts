import { GroupModel, GroupRoles } from '../../../api/model/group.model'
import { UserModel } from '../../../api/model/user.model'

export type GroupDetails = GroupModel & {
  members: (UserModel & {
    joinedAt: string
    role: GroupRoles
  })[]
  owner: UserModel
  currentUserRole: GroupRoles
}
