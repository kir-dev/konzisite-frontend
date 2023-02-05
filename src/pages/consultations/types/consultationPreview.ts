import { ConsultationModel } from '../../../api/model/consultation.model'
import { SubjectModel } from '../../../api/model/subject.model'
import { PublicUser } from '../../user/types/PublicUser'

export type ConsultationPreview = ConsultationModel & {
  subject: SubjectModel
  presentations: (PublicUser & {
    averageRating: number
  })[]
}
