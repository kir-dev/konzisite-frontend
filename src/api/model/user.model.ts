import { ConsultationModel } from './consultation.model'
import { RatingModel } from './rating.model'
export interface UserModel {
  id: number
  authSchId: string
  firstName: string
  lastName: string
  email: string
  ownedConsultations: ConsultationModel[]
  // memberships: ids
  ratings: RatingModel[]
}
