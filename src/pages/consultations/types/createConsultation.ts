import { GroupModel } from '../../../api/model/group.model'
import { SubjectModel } from '../../../api/model/subject.model'
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
}