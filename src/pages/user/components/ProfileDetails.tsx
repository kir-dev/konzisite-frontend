import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useBreakpointValue,
  useColorModeValue,
  VStack
} from '@chakra-ui/react'
import { FaAt, FaChevronDown, FaRegFileImage, FaSignOutAlt } from 'react-icons/fa'
import { UserModel } from '../../../api/model/user.model'

type Props = {
  user: UserModel
  profileOptions?: {
    onChangeProfileImagePressed: () => void
    onLogoutPressed: () => void
  }
}

export const ProfileDetails = ({ user: { firstName, lastName, email }, profileOptions }: Props) => {
  const dangerColor = useColorModeValue('red.600', 'red.400')
  const { onChangeProfileImagePressed, onLogoutPressed } = profileOptions || {}

  return (
    <Box>
      <HStack flexWrap="wrap" justifyContent="space-between" alignItems="center" mb={5}>
        <HStack flexWrap="wrap" spacing={4}>
          <Avatar size={useBreakpointValue({ base: 'lg', md: 'xl' })} name={`${lastName} ${firstName}`} src={''} />
          <HStack>
            <Box fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={700} wordBreak="break-all">
              {lastName} {firstName}
            </Box>
          </HStack>
        </HStack>
        {profileOptions && (
          <Flex flex={1} justifyContent="end">
            <Menu>
              <MenuButton as={Button} colorScheme="brand" rightIcon={<FaChevronDown />}>
                Actions
              </MenuButton>
              <MenuList>
                <MenuItem icon={<FaRegFileImage />} onClick={onChangeProfileImagePressed}>
                  Change profile image
                </MenuItem>
                <MenuDivider />
                <MenuItem color={dangerColor} icon={<FaSignOutAlt />} onClick={onLogoutPressed}>
                  Log out
                </MenuItem>
              </MenuList>
            </Menu>
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
