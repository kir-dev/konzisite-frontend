import { HStack, Text } from '@chakra-ui/react'
import { FaStar } from 'react-icons/fa'

type Props = {
  rating?: number
}

export const Rating = ({ rating }: Props) => {
  return (
    <HStack width="100%">
      <Text>Értékelés:</Text>
      {rating ? (
        <>
          <Text>{rating.toFixed(2)}</Text>
          <FaStar />
        </>
      ) : (
        <Text>-</Text>
      )}
    </HStack>
  )
}
