export enum Language {
  en = 'en',
  hu = 'hu'
}

export interface ConsultationModel {
  id: number
  location: string
  startDate: string
  endDate: string
  name: string
  descMarkdown?: string
  fileName?: string
  archived: boolean
  language: Language
  createdAt?: string
  updatedAt?: string
}
