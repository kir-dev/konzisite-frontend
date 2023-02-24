import { ConsultationRequestModel } from '../../../api/model/consultationrequest.model'
import { SubjectModel } from '../../../api/model/subject.model'
import { PublicUser } from '../../user/types/PublicUser'

export type RequestPreview = ConsultationRequestModel & {
  subject: SubjectModel
  initializer?: PublicUser
  supporterCount?: number
  consultationCount?: number
  currentUserSupports?: boolean
}
