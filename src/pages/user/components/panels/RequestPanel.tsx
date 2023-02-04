import { TabPanel, Text, VStack } from '@chakra-ui/react'
import { ConsultationRequestModel } from '../../../../api/model/consultationrequest.model'
import { SubjectModel } from '../../../../api/model/subject.model'

type Props = {
  requests: (ConsultationRequestModel & {
    subject: SubjectModel
    supporters: number
  })[]
}
export const RequestPanel = ({ requests }: Props) => {
  return (
    <TabPanel px={0}>
      <VStack spacing={4} alignItems="stretch">
        {requests.length > 0 ? (
          requests.map((p) => (
            <Text key={p.id}>
              {p.subject.name} - {p.supporters} támogató
            </Text>
          ))
        ) : (
          <Text fontStyle="italic" textAlign="center">
            Még nem kértél konzultációt.
          </Text>
        )}
      </VStack>
    </TabPanel>
  )
}
