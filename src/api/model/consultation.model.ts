export interface ConsultationModel {
  id: number
  location: string
  startDate: Date
  endDate: Date
  name: string
  descMarkdown?: string
  fileName?: string
  archived: boolean
  createdAt?: string
  updatedAt?: string
}
