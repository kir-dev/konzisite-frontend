import { Box, Collapse, Flex, Heading, HStack, IconButton, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import { FC } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { ColorModeSwitcher } from './ColorModeSwitcher'
import DesktopNav from './DesktopNav'
import MobileNav from './MobileNav'

export const Navbar: FC = () => {
  const { isOpen, onToggle } = useDisclosure()
  const onNavigate = () => onToggle()

  return (
    <Flex justifyContent="center" w="full" style={{ boxShadow: useColorModeValue('0 0.2rem 0.6rem #0A185C', 'none') }}>
      <Box mx="auto" maxW="6xl" w="full" color={useColorModeValue('brand.700', 'white')}>
        <Flex h="4rem" w="full" px={4} py={2} align="center" justifyContent={'space-between'}>
          <Flex display={{ base: 'flex', md: 'none' }}>
            <IconButton
              onClick={onToggle}
              icon={isOpen ? <FaTimes size="1.5rem" /> : <FaBars size="1.5rem" />}
              variant="ghost"
              aria-label="Open navigation"
            />
          </Flex>
          <Heading fontFamily="title" as={Link} to="/" _hover={{ textDecoration: 'none' }}>
            konzisite
          </Heading>
          <Flex display={{ base: 'none', md: 'flex' }} flex={1} justifyContent="center">
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
    </Flex>
  )
}
