import { Heading, SimpleGrid, TabPanel, Text, VStack } from '@chakra-ui/react'
import { ConsultationModel } from '../../../../api/model/consultation.model'
import { RatingModel } from '../../../../api/model/rating.model'
import { SubjectModel } from '../../../../api/model/subject.model'
import { ConsultationListItem } from '../../../../components/commons/ConsultationListItem'
import { PublicUser } from '../../types/PublicUser'
import { RatingListItem } from '../RatingListItem'

type Props = {
  presentations: (ConsultationModel & {
    subject: SubjectModel
    ratings: (RatingModel & {
      rater: PublicUser
    })[]
    participants: number
  })[]
}
export const PresentationPanel = ({ presentations }: Props) => {
  return (
    <TabPanel px={0}>
      <VStack spacing={4} alignItems="stretch">
        {presentations.length > 0 ? (
          presentations
            .sort((c1, c2) => new Date(c2.startDate).getTime() - new Date(c1.startDate).getTime())
            .map((p) => (
              <ConsultationListItem key={p.id} consultation={p} rightSmallText={`${p.participants} résztvevő`}>
                <VStack p={4} pt={0} align="flex-start">
                  {p.ratings.length > 0 ? (
                    <>
                      <Heading size="md">Értékelések</Heading>
                      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2} w="100%">
                        {p.ratings.map((r) => (
                          <RatingListItem key={r.id} rating={r} />
                        ))}
                      </SimpleGrid>
                    </>
                  ) : (
                    <Text fontStyle="italic">Ezt a konzit még nem értékelte senki.</Text>
                  )}
                </VStack>
              </ConsultationListItem>
            ))
        ) : (
          <Text fontStyle="italic" textAlign="center">
            A felhasználó még nem tartott konzultációt.
          </Text>
        )}
      </VStack>
    </TabPanel>
  )
}
