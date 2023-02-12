import { ConsultationModel } from '../../../api/model/consultation.model'
import { ConsultationRequestModel } from '../../../api/model/consultationrequest.model'
import { GroupModel } from '../../../api/model/group.model'
import { RatingModel } from '../../../api/model/rating.model'
import { SubjectModel } from '../../../api/model/subject.model'
import { PublicUser } from '../../user/types/PublicUser'

export type Presentation = PublicUser & {
  averageRating: number
  averageRatingForConsultation?: number
}

export type ConsultationDetails = ConsultationModel & {
  presentations: (Presentation & {
    rating?: RatingModel
  })[]
  participants: PublicUser[]
  owner: PublicUser
  targetGroups: GroupModel[]
  subject: SubjectModel
  request?: ConsultationRequestModel
}
