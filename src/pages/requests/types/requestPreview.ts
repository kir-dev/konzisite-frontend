import { ConsultationRequestModel } from '../../../api/model/consultationrequest.model'
import { SubjectModel } from '../../../api/model/subject.model'
import { PublicUser } from '../../user/types/PublicUser'

export type RequestPreview = ConsultationRequestModel & {
  initializer: PublicUser
  subject: SubjectModel
  supporterCount: number
  consulattionCount: number
  currentUserSupports: boolean
}
