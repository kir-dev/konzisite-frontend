import { ParticipationModel } from './participation.model'
import { PresentationModel } from './presentation.model'

export interface RatingModel {
  id: number
  value: number
  text: string
  ratedBy?: ParticipationModel
  ratedPresentation?: PresentationModel
}
