import { GroupModel, GroupRoles } from '../../../api/model/group.model'
import { PublicUser } from '../../user/types/PublicUser'

export type GroupPreview = GroupModel & {
  memberCount: number
  owner: PublicUser
  currentUserRole: GroupRoles
}
