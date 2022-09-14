export interface ConsultationModel {
  id: number
  location: string
  startDate: Date
  endDate: Date
  name: string
  descMarkdown: string
  createdAt?: Date
  updatedAt?: Date
}
