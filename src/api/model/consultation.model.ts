export interface ConsultationModel {
  id: number
  location: string
  startDate: string
  endDate: string
  name: string
  descMarkdown?: string
  fileName?: string
  archived: boolean
  createdAt?: string
  updatedAt?: string
}
