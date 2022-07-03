export interface GroupModel {
  id: number
  name: string
  createdAt: Date
}

export enum GroupRoles {
  PENDING = 'Függőben',
  MEMBER = 'Tag',
  ADMIN = 'Admin'
}
