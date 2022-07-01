import { ConsultationModel } from './consultation.model'
import { RatingModel } from './rating.model'
import { UserModel } from './user.model'

export interface ParticipationModel {
  id: number
  consultation: ConsultationModel
  user: UserModel
  ratings: RatingModel[]
}
