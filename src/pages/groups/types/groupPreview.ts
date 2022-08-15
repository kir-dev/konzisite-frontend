import { GroupModel, GroupRoles } from '../../../api/model/group.model'
import { UserModel } from '../../../api/model/user.model'

export type GroupPreview = GroupModel & {
  memberCount: number
  owner: UserModel
  role: GroupRoles
}
