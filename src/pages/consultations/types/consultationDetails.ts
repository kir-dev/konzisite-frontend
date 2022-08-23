import { ConsultationModel } from '../../../api/model/consultation.model'
import { ConsultationRequestModel } from '../../../api/model/consultationrequest.model'
import { GroupModel } from '../../../api/model/group.model'
import { SubjectModel } from '../../../api/model/subject.model'
import { UserModel } from '../../../api/model/user.model'

export type Presentation = UserModel & {
  averageRating: number
}

export type ConsultationDetails = ConsultationModel & {
  presentations: Presentation[]
  participants: UserModel[]
  owner: UserModel
  targetGroups: GroupModel[]
  subject: SubjectModel
  request?: ConsultationRequestModel
}
