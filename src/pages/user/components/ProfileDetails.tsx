import { Avatar, Box, Button, Flex, HStack, useBreakpointValue, VStack } from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'
import { FaAt, FaSignOutAlt } from 'react-icons/fa'
import { UserModel } from '../../../api/model/user.model'

type Props = {
  user: UserModel
  profileOptions?: {
    onLogoutPressed: (path?: string) => void
  }
}

export const ProfileDetails = ({ user: { fullName, email }, profileOptions }: Props) => {
  const { onLogoutPressed } = profileOptions || { onLogoutPressed: () => {} }

  return (
    <Box>
      <Helmet title={fullName} />
      <HStack flexWrap="wrap" justifyContent="space-between" alignItems="center" mb={5}>
        <HStack flexWrap="wrap" spacing={4}>
          <Avatar size={useBreakpointValue({ base: 'lg', md: 'xl' })} name={fullName} src={''} />
          <HStack>
            <Box fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={700} wordBreak="break-all">
              {fullName}
            </Box>
          </HStack>
        </HStack>
        {profileOptions && (
          <Flex flex={1} justifyContent="end">
            <Button colorScheme="brand" rightIcon={<FaSignOutAlt />} onClick={() => onLogoutPressed()}>
              Kijelentkezés
            </Button>
          </Flex>
        )}
      </HStack>
      <VStack align="stretch">
        <Box>
          <HStack>
            <FaAt />
            <Box>{email}</Box>
          </HStack>
        </Box>
      </VStack>
    </Box>
  )
}
