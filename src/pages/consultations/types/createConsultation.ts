import { GroupModel } from '../../../api/model/group.model'
import { SubjectModel } from '../../../api/model/subject.model'
import { RequestPreview } from '../../requests/types/requestPreview'
import { Presentation } from './consultationDetails'

export interface CreateConsultation {
  name: string
  location: string
  startDate: Date
  endDate: Date
  descMarkdown?: string
  subjectId: number
  presenterIds: number[]
  targetGroupIds: number[]
  requestId?: number | null
}

export type CreateConsultationForm = {
  name: string
  location: string
  startDate: Date
  endDate: Date
  descMarkdown?: string
  subject: SubjectModel
  presenters: Presentation[]
  targetGroups: GroupModel[]
  request?: RequestPreview
  fulfillRequest: boolean
}
