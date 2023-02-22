import { AlertModel } from '../../../api/model/alert.model'
import { ConsultationRequestModel } from '../../../api/model/consultationrequest.model'
import { ConsultationPreview } from '../../consultations/types/consultationPreview'

export interface HomeDto {
  consultations: ConsultationPreview[]
  requests: ConsultationRequestModel[] // TODO change to dto after #124 is merged
  unratedConsultations: ConsultationPreview[]
  alert?: AlertModel
}
