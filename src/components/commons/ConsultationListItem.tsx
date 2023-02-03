import { Avatar, Box, Heading, HStack, Stack, Text, VStack } from '@chakra-ui/react'
import { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { ConsultationModel } from '../../api/model/consultation.model'
import { RatingModel } from '../../api/model/rating.model'
import { SubjectModel } from '../../api/model/subject.model'
import { UserModel } from '../../api/model/user.model'
import { PublicUser } from '../../pages/user/types/PublicUser'
import { generateDateText, generateTimeSpanText } from '../../util/dateHelper'

type Props = {
  consultation: ConsultationModel & {
    subject: SubjectModel
    ratings?: (RatingModel & {
      rater: PublicUser
    })[]
    presentations?: (UserModel & {
      averageRating: number
    })[]
  }
  rightSmallText?: string
  children?: ReactElement
}

export const ConsultationListItem = ({ consultation, children, rightSmallText }: Props) => {
  return (
    <Box shadow="md" borderRadius={8} borderWidth={1}>
      <HStack flexGrow={1} as={Link} to={`/consultations/${consultation.id}`} p={4} align="flex-start">
        <Avatar size="md" name={consultation.subject.name.toString()} src={''} />
        <VStack flexGrow={1}>
          <Stack direction={['column', 'row']} justifyContent="space-between" width="100%">
            <Heading size="md">{consultation.name}</Heading>
            <Heading size={{ base: 'sm', md: 'md' }}>
              {generateDateText(consultation.startDate)} {generateTimeSpanText(consultation.startDate, consultation.endDate)}
            </Heading>
          </Stack>
          <Stack direction={['column', 'row']} justifyContent="space-between" width="100%">
            <Text>
              {consultation.subject.name} ({consultation.subject.code})
            </Text>
            {rightSmallText && <Text>{rightSmallText}</Text>}
          </Stack>
        </VStack>
      </HStack>
      {children}
    </Box>
  )
}
