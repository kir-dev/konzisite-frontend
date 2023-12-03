import { Avatar, Badge, Box, Heading, HStack, SimpleGrid, Stack, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../../api/contexts/auth/useAuthContext'
import { RatingModel } from '../../../api/model/rating.model'
import { PATHS } from '../../../util/paths'
import { ErrorPage } from '../../error/ErrorPage'
import { PublicUser } from '../../user/types/PublicUser'
import { Rating } from './Rating'
import { UserRating } from './UserRating'

type Props = {
  users: (PublicUser & {
    averageRating?: number
    averageRatingForConsultation?: number
    rating?: RatingModel
  })[]
  showRating?: boolean
  showRatingButton?: boolean
  columns: number
  isParticipant: boolean
  refetch: () => {}
}

export const UserList = ({ users, isParticipant, columns, showRating = true, showRatingButton = false, refetch }: Props) => {
  const { loggedInUser } = useAuthContext()
  const { t } = useTranslation()

  if (!loggedInUser) {
    return <ErrorPage status={401} />
  }

  return (
    <>
      <SimpleGrid columns={{ sm: 1, md: columns }} gap={4} mb={6}>
        {users.map((u) => (
          <Box key={u.id} shadow="md" borderRadius={8} borderWidth={1}>
            <Stack direction={['column', 'row']} width="100%">
              <HStack flexGrow={1} as={Link} to={`${PATHS.USERS}/${u.id}`} p={4}>
                <Avatar size="md" name={u.fullName + u.id} src="" />
                <VStack flexGrow={1}>
                  <Heading size="md" width="100%">
                    {u.fullName}
                    {u.id === loggedInUser.id && (
                      <Badge colorScheme="brand" ml={1} mb={1}>
                        {t('selectors.you')}
                      </Badge>
                    )}
                  </Heading>
                  {showRating && (
                    <Stack spacing={[0, 4]} justify="flex-start" width="100%" direction={['column', 'row']}>
                      <Rating label={t('userList.allRating')} rating={u.averageRating} />
                      <Rating label={t('userList.ratingsForKonzi')} rating={u.averageRatingForConsultation} />
                    </Stack>
                  )}
                </VStack>
              </HStack>
              {showRatingButton && (
                <UserRating showRatingButton={showRatingButton} isParticipant={isParticipant} refetch={refetch} user={u} />
              )}
            </Stack>
          </Box>
        ))}
      </SimpleGrid>
    </>
  )
}
