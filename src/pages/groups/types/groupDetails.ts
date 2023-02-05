import { GroupModel, GroupRoles } from '../../../api/model/group.model'
import { PublicUser } from '../../user/types/PublicUser'

export type GroupDetails = GroupModel & {
  members: (PublicUser & {
    joinedAt: string
    role: GroupRoles
  })[]
  owner: PublicUser
  currentUserRole: GroupRoles
}
