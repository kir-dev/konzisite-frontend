import { ConsultationModel } from './consultation.model'
import { RatingModel } from './rating.model'
import { UserModel } from './user.model'

export interface PresentationModel {
  id: number
  consultation?: ConsultationModel
  user: UserModel
  ratings?: RatingModel[]
}
