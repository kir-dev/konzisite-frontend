import { UserModel } from '../../../api/model/user.model'

export type UserPreview = UserModel & {
  presentations: number
  averageRating: number
  attendances: number
}
