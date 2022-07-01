import { ConsultationModel } from './consultation.model'
import { SubjectModel } from './subject.model'
import { UserModel } from './user.model'

export interface ConsultationRequestModel {
  id: number
  initializer: UserModel
  subject: SubjectModel
  supporters: UserModel[]
  consultation?: ConsultationModel
  descMarkdown: String
  expiryDate: Date
}
