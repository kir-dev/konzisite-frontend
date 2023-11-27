import { Box, Heading, HStack, Stack, Text, VStack } from '@chakra-ui/react'
import { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ConsultationModel } from '../../api/model/consultation.model'
import { RatingModel } from '../../api/model/rating.model'
import { SubjectModel } from '../../api/model/subject.model'
import { PublicUser } from '../../pages/user/types/PublicUser'
import { generateDateText, generateTimeSpanText } from '../../util/dateHelper'
import { PATHS } from '../../util/paths'
import { MajorAvatar } from './MajorAvatar'
import { SubjectName } from './SubjectName'

type Props = {
  consultation: ConsultationModel & {
    subject: SubjectModel
    ratings?: (RatingModel & {
      rater: PublicUser
    })[]
    presentations?: (PublicUser & {
      averageRating: number
    })[]
  }
  rightSmallText?: string
  children?: ReactElement
}

export const ConsultationListItem = ({ consultation, children, rightSmallText }: Props) => {
  const { i18n } = useTranslation()
  return (
    <Box shadow="md" borderRadius={8} borderWidth={1}>
      <HStack flexGrow={1} as={Link} to={`${PATHS.CONSULTATIONS}/${consultation.id}`} p={4} align="flex-start">
        <MajorAvatar subject={consultation.subject} />
        <VStack flexGrow={1}>
          <Stack direction={['column', 'row']} justifyContent="space-between" width="100%">
            <Heading isTruncated maxWidth={{ base: '15rem', sm: '9rem', m: '15rem', md: '22rem', lg: '35rem' }} size="md">
              {consultation.name}
            </Heading>
            <Heading size={{ base: 'sm', md: 'md' }}>
              {generateDateText(consultation.startDate, i18n)} {generateTimeSpanText(consultation.startDate, consultation.endDate, i18n)}
            </Heading>
          </Stack>
          <Stack direction={['column', 'row']} justifyContent="space-between" width="100%">
            <Text>
              <SubjectName subject={consultation.subject} />
            </Text>
            {rightSmallText && <Text>{rightSmallText}</Text>}
          </Stack>
        </VStack>
      </HStack>
      {children}
    </Box>
  )
}
