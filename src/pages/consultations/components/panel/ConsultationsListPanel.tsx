import { TabPanel, Text, VStack } from '@chakra-ui/react'
import { ConsultationListItem } from '../../../../components/commons/ConsultationListItem'
import { ConsultationPreview } from '../../types/consultationPreview'

import { useTranslation } from 'react-i18next'
import { LoadingConsultationList } from '../loading/LoadingConsultationList'

type Props = {
  isLoading: boolean
  consultaions: ConsultationPreview[] | undefined
}

export const ConsultationsListPanel = ({ isLoading, consultaions }: Props) => {
  const { t } = useTranslation()
  return (
    <TabPanel px={0}>
      {consultaions && consultaions.length === 0 ? (
        <Text mt={3} textAlign="center" fontStyle="italic">
          {t('consultationListPage.noKonzi')}
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
                  rightSmallText={t('home.presenters', {
                    count: c.presentations.length,
                    names: c.presentations.map((p) => p.fullName).join(', ')
                  })}
                />
              ))}
            </>
          )}
        </VStack>
      )}
    </TabPanel>
  )
}
