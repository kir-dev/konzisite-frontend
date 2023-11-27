import { Flex, TabPanel, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { ConsultationModel } from '../../../../api/model/consultation.model'
import { RatingModel } from '../../../../api/model/rating.model'
import { SubjectModel } from '../../../../api/model/subject.model'
import { ConsultationListItem } from '../../../../components/commons/ConsultationListItem'
import { PublicUser } from '../../types/PublicUser'
import { PresentationRatings } from './PresentationRatings'

type Props = {
  presentations: (ConsultationModel & {
    subject: SubjectModel
    ratings: (RatingModel & {
      rater: PublicUser
    })[]
    participants: number
  })[]
  allPresentationCount: number
}

export const PresentationPanel = ({ presentations, allPresentationCount }: Props) => {
  const { t } = useTranslation()
  return (
    <TabPanel px={0}>
      {presentations.length !== allPresentationCount && (
        <Text mb={4} align="center" fontStyle="italic">
          {t('profilePage.privatePresDisclaimer')}
        </Text>
      )}
      <VStack spacing={4} alignItems="stretch">
        {presentations.length > 0 ? (
          presentations
            .sort((c1, c2) => new Date(c2.startDate).getTime() - new Date(c1.startDate).getTime())
            .map((p, idx) => (
              <ConsultationListItem
                key={p.id}
                consultation={p}
                rightSmallText={t('profilePage.presentationText', {
                  count: p.participants,
                  rating: p.ratings.length === 0 ? '-' : (p.ratings.reduce((acc, val) => acc + val.value, 0) / p.ratings.length).toFixed(2)
                })}
              >
                <Flex w="100%" p={4} pt={0} justify="center">
                  {p.ratings.length > 0 ? (
                    <PresentationRatings ratings={p.ratings} first={idx === 0} />
                  ) : (
                    <Text fontStyle="italic">{t('profilePage.notRated')}</Text>
                  )}
                </Flex>
              </ConsultationListItem>
            ))
        ) : (
          <Text fontStyle="italic" textAlign="center">
            {t('profilePage.noPres')}
          </Text>
        )}
      </VStack>
    </TabPanel>
  )
}
