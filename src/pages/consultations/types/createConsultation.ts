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
