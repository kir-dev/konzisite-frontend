import { Flex, HStack, Image, Tag, Text, useColorModeValue, WrapItem } from '@chakra-ui/react'
import customTheme from '../../../assets/theme'
import { Dev } from '../util/developers'

type Props = {
  dev: Dev
}

export const DeveloperWrapItem = ({ dev: { name, img, tags } }: Props) => {
  return (
    <WrapItem border="2px" borderRadius="md">
      <Flex direction="column" align="center" w="20rem" h="20rem">
        <Text colorScheme="brand" fontSize="2xl">
          {name}
        </Text>
        <Image src={img} h="15rem" fallbackSrc={useColorModeValue('/img/kirdev.svg', '/img/kirdev-white-alt.svg')} />
        <HStack spacing={2} my={2}>
          {tags.map((tag) => (
            <Tag bg={customTheme.colors.kirDev} color="white" size="md" variant="solid" fontWeight="bold" key={tag}>
              {tag}
            </Tag>
          ))}
        </HStack>
      </Flex>
    </WrapItem>
  )
}
