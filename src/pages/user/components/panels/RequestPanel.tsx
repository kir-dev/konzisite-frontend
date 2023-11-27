import { TabPanel, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()
  return (
    <TabPanel px={0}>
      <VStack spacing={4} alignItems="stretch">
        {requests.length > 0 ? (
          requests.map((r) => <RequestListItem request={r} key={r.id} />)
        ) : (
          <Text fontStyle="italic" textAlign="center">
            {t('profilePage.noReq')}
          </Text>
        )}
      </VStack>
    </TabPanel>
  )
}
