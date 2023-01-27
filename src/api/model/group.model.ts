export interface GroupModel {
  id: number
  name: string
  createdAt: string
}

export enum GroupRoles {
  PENDING = 'PENDING',
  MEMBER = 'MEMBER',
  ADMIN = 'ADMIN',
  OWNER = 'OWNER',
  NONE = 'NONE'
}
