import { UserModel } from './user.model'

export interface ConsultationModel {
  id: number
  /*presantations: Presentation[]
  participants: Participation[]*/
  owner: UserModel
  /*targetGroups: Group[]
  subject: Subject
  request?: ConsultationRequest*/
  location: String
  startDate: Date
  endDate: Date
  descMarkdown: String
}
