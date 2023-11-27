import { HStack, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { FaStar } from 'react-icons/fa'

type Props = {
  rating?: number
  label?: string
}

export const Rating = ({ rating, label }: Props) => {
  const { t } = useTranslation()
  if (!label) {
    label = t('userList.rating')
  }
  return (
    <HStack spacing={1}>
      <Text>{label}</Text>
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
