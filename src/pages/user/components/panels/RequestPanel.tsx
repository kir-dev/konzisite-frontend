import { TabPanel, Text, VStack } from '@chakra-ui/react'
import { ConsultationRequestModel } from '../../../../api/model/consultationrequest.model'
import { SubjectModel } from '../../../../api/model/subject.model'
import { RequestListItem } from '../../../requests/components/RequestListItem'

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
          requests.map((r) => <RequestListItem request={r} key={r.id} />)
        ) : (
          <Text fontStyle="italic" textAlign="center">
            A felhasználó még nem kért konzultációt.
          </Text>
        )}
      </VStack>
    </TabPanel>
  )
}
