import { SubjectModel } from '../../../api/model/subject.model'

export interface CreateRequest {
  name: string
  subjectId: number
  descMarkdown?: string
  expiryDate: Date
}

export type CreateRequestForm = {
  name: string
  subject: SubjectModel
  descMarkdown?: string
  expiryDate: Date
}
