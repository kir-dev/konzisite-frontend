import { ConsultationModel } from '../../../api/model/consultation.model'
import { ConsultationRequestModel } from '../../../api/model/consultationrequest.model'
import { RatingModel } from '../../../api/model/rating.model'
import { SubjectModel } from '../../../api/model/subject.model'
import { UserModel } from '../../../api/model/user.model'

export type UserDetails = UserModel & {
  presentations: (ConsultationModel & {
    subject: SubjectModel
    ratings: (RatingModel & { rater: UserModel })[]
  })[]
  participations: (ConsultationModel & {
    subject: SubjectModel
  })[]
  consultaionRequests: (ConsultationRequestModel & {
    subject: SubjectModel
  })[]
  averageRating: number
}
