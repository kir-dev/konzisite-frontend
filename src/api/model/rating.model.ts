export interface RatingModel {
  id: number
  value: number
  text: string
//  ratedBy           Participation @relation(fields: [participationId], references: [id])
  participationId:number
//  ratedPresentation Presentation  @relation(fields: [presentationId], references: [id])
  presentationId:number
}
