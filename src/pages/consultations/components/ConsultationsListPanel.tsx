import { TabPanel, Text, VStack } from '@chakra-ui/react'
import { ConsultationListItem } from '../../../components/commons/ConsultationListItem'
import { ConsultationPreview } from '../types/consultationPreview'
import { LoadingConsultationList } from './LoadingConsultationList'

type Props = {
  isLoading: boolean
  consultaions: ConsultationPreview[] | undefined
}

export const ConsultationsListPanel = ({ isLoading, consultaions }: Props) => {
  return (
    <TabPanel px={0}>
      {consultaions && consultaions.length === 0 ? (
        <Text mt={3} textAlign="center">
          Nincsenek konzultációk!
        </Text>
      ) : (
        <VStack alignItems="stretch" mt={3}>
          {isLoading ? (
            <LoadingConsultationList />
          ) : (
            <>
              {consultaions?.map((c) => (
                <ConsultationListItem
                  consultation={c}
                  key={c.id}
                  rightSmallText={
                    c.presentations.length <= 3
                      ? `Konzitartó${c.presentations.length > 1 ? 'k' : ''}:
              ${c.presentations.map((p) => p.fullName).join(', ')}`
                      : `${c.presentations.length} konzitartó`
                  }
                />
              ))}
            </>
          )}
        </VStack>
      )}
    </TabPanel>
  )
}
