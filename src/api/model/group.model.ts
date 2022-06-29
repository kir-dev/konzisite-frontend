import { ConsultationModel } from './consultation.model'
import { UserModel } from './user.model'

export interface GroupModel {
  id: number
  name: string
  owner: UserModel
  members: GroupMemberModel[]
  consultations: ConsultationModel[]

  createdAt: Date
}

export enum GroupRoles {
  PENDING = 'Függőben',
  MEMBER = 'Tag',
  ADMIN = 'Admin'
}

export interface GroupMemberModel extends UserModel {
  joinedAt: Date
  role: GroupRoles
}
