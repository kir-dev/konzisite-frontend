import { Box, Collapse, Flex, HStack, IconButton, useBreakpointValue, useDisclosure } from '@chakra-ui/react'
import { FC } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { ColorModeSwitcher } from './ColorModeSwitcher'
import DesktopNav from './DesktopNav'
import MobileNav from './MobileNav'

export const Navbar: FC = () => {
  const { isOpen, onToggle } = useDisclosure()
  const onNavigate = () => onToggle()

  return (
    <Box mx="auto" maxW="6xl" w="full" fontFamily="heading">
      <Flex h={{ base: '4rem', md: '6rem' }} w="full" px={4} py={2} align="center">
        <Flex display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <FaTimes size="1.5rem" /> : <FaBars size="1.5rem" />}
            variant="ghost"
            aria-label="Open navigation"
          />
        </Flex>
        <Flex flex={{ base: 1, md: 0 }} justifyContent="center" pl={{ base: 10, md: 0 }}>
          <Box style={{ height: useBreakpointValue({ base: '1.75rem', sm: '2.5rem', md: '3rem' }) }} bgColor="blue.500" />
        </Flex>
        <Flex display={{ base: 'none', md: 'flex' }} flex={1} justifyContent="flex-end">
          <DesktopNav />
        </Flex>
        <HStack ml={{ base: 0, md: 6 }}>
          <ColorModeSwitcher />
        </HStack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav onNavigate={onNavigate} />
      </Collapse>
    </Box>
  )
}
