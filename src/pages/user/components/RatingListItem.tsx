import { Avatar, Box, Flex, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import { FaStar, FaUserSecret } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { RatingModel } from '../../../api/model/rating.model'
import { PublicUser } from '../types/PublicUser'

type Props = {
  rating: RatingModel & {
    rater: PublicUser
  }
}

export const RatingListItem = ({ rating }: Props) => {
  const anonymous = rating.rater.id === -1
  return (
    <Box ml={5}>
      <HStack flexGrow={1} as={!anonymous ? Link : undefined} to={`/users/${rating.rater.id}`} p={4}>
        <Avatar
          bg={anonymous ? 'brand.500' : undefined}
          icon={anonymous ? <FaUserSecret /> : undefined}
          size="md"
          name={anonymous ? undefined : rating.rater.fullName}
        />
        <VStack flexGrow={1} alignItems="flex-start">
          <Flex w="100%" justify="space-between">
            <Heading size="md">{rating.rater.fullName}</Heading>
            <HStack spacing={0}>
              <Heading size="md">{rating.value}</Heading>
              <FaStar />
            </HStack>
          </Flex>
          <HStack justifyContent="space-between" width="100%">
            <Text>{rating.text}</Text>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  )
}
