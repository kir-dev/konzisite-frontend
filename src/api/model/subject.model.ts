import { ConsultationModel } from './consultation.model'
import { ConsultationRequestModel } from './consultationrequest.model'

export enum Major {
  CE_BSC,
  EE_BSC,
  BPROF,
  CE_MSC,
  EE_MSC,
  BI_MSC,
  HI_MSC
}

export interface SubjectModel {
  id: number
  code: String
  name: String
  majors: Major[]
  consultations: ConsultationModel[]
  requests: ConsultationRequestModel[]
}
