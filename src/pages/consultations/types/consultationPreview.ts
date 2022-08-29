import { ConsultationModel } from '../../../api/model/consultation.model'
import { SubjectModel } from '../../../api/model/subject.model'
import { UserModel } from '../../../api/model/user.model'

export type ConsultationPreview = ConsultationModel & {
  subject: SubjectModel
  presentations: (UserModel & {
    averageRating: number
  })[]
}
