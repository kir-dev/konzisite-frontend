import { ConsultationRequestModel } from '../../../api/model/consultationrequest.model'
import { SubjectModel } from '../../../api/model/subject.model'
import { ConsultationPreview } from '../../consultations/types/consultationPreview'
import { PublicUser } from '../../user/types/PublicUser'

export type RequestDetails = ConsultationRequestModel & {
  initializer: PublicUser
  subject: SubjectModel
  supporters: PublicUser[]
  consultations: ConsultationPreview[]
}
