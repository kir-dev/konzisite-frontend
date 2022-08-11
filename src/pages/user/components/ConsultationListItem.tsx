import { HStack, Text } from '@chakra-ui/react'
import { ConsultationModel } from '../../../api/model/consultation.model'
import { RatingModel } from '../../../api/model/rating.model'
import { SubjectModel } from '../../../api/model/subject.model'

type ConsultationListItemProps = {
  c: ConsultationModel & {
    subject: SubjectModel
    ratings?: RatingModel[]
  }
}
export const ConsultationListItem = ({ c }: ConsultationListItemProps) => {
  return (
    <HStack key={c.id}>
      <Text>{c.descMarkdown}</Text>
      <Text>
        {c.startDate.toDateString()}-{c.endDate.toDateString()}
      </Text>
      <Text>{c.subject.name}</Text>
    </HStack>
  )
}
