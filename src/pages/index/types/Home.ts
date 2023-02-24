import { AlertModel } from '../../../api/model/alert.model'
import { ConsultationPreview } from '../../consultations/types/consultationPreview'
import { RequestPreview } from '../../requests/types/requestPreview'

export interface HomeDto {
  consultations: ConsultationPreview[]
  requests: RequestPreview[]
  unratedConsultations: ConsultationPreview[]
  alert?: AlertModel
}
