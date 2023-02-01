import { ConsultationModel } from '../../../api/model/consultation.model'
import { ConsultationRequestModel } from '../../../api/model/consultationrequest.model'
import { RatingModel } from '../../../api/model/rating.model'
import { SubjectModel } from '../../../api/model/subject.model'
import { PublicUser } from './PublicUser'

export type UserDetails = PublicUser & {
  isAdmin: boolean
  presentations: (ConsultationModel & {
    subject: SubjectModel
    ratings: (RatingModel & { rater: PublicUser })[]
  })[]
  participations: (ConsultationModel & {
    subject: SubjectModel
  })[]
  consultaionRequests: (ConsultationRequestModel & {
    subject: SubjectModel
  })[]
  averageRating: number
}
