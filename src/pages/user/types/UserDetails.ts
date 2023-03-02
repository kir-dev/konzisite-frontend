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
    participants: number
  })[]
  participations: (ConsultationModel & {
    subject: SubjectModel
  })[]
  consultationRequests?: (ConsultationRequestModel & {
    subject: SubjectModel
    supporters: number
  })[]
  stats?: UserStats
}

export type UserStats = {
  presentationCount: number
  allParticipants: number
  ratingCount: number
  averageRating: number
  participationCount: number
}
