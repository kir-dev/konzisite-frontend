import { PublicUser } from './PublicUser'

export type UserPreview = PublicUser & {
  presentations: number
  averageRating: number
  attendances: number
}
