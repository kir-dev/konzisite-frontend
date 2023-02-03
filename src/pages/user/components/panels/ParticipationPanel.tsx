import { TabPanel, Text, VStack } from '@chakra-ui/react'
import { ConsultationModel } from '../../../../api/model/consultation.model'
import { SubjectModel } from '../../../../api/model/subject.model'
import { ConsultationListItem } from '../../../../components/commons/ConsultationListItem'

type Props = {
  participations: (ConsultationModel & {
    subject: SubjectModel
  })[]
}
export const ParticipationPanel = ({ participations }: Props) => {
  return (
    <TabPanel>
      <VStack spacing={4} alignItems="stretch">
        {participations.length > 0 ? (
          participations
            .sort((c1, c2) => new Date(c2.startDate).getTime() - new Date(c1.startDate).getTime())
            .map((p) => <ConsultationListItem key={p.id} consultation={p} />)
        ) : (
          <Text fontStyle="italic">A felhasználó még nem vett részt konzultáción.</Text>
        )}
      </VStack>
    </TabPanel>
  )
}
