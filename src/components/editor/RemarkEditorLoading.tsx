import { Flex, Skeleton, VStack } from '@chakra-ui/react'
import { FC } from 'react'

type Props = {
  textAreaHeight?: string | number
}

export const RemarkEditorLoading: FC<Props> = ({ textAreaHeight = '22rem' }) => {
  return (
    <VStack width="full" align="stretch">
      <Skeleton width="10rem" height="2rem" />
      <Skeleton width="70%" height="1.5rem" />
      <Skeleton borderRadius="md" width="100%" height={textAreaHeight} />
      <Flex justifyContent="flex-end">
        <Skeleton width="10rem" height="2rem" />
      </Flex>
    </VStack>
  )
}
