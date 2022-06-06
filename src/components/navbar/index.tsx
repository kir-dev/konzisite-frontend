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
    <Box mx="auto" maxW="6xl" w="full" fontFamily="heading">
      <Flex h={{ base: '4rem', md: '6rem' }} w="full" px={4} py={2} align="center" justifyContent={'space-between'}>
        <Flex display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <FaTimes size="1.5rem" /> : <FaBars size="1.5rem" />}
            variant="ghost"
            aria-label="Open navigation"
            color={useColorModeValue('brand.700', 'white')}
          />
        </Flex>
        <Heading
          fontFamily={`'Aclonica', sans-serif`}
          color={useColorModeValue('brand.700', 'white')}
          as={Link}
          to="/"
          _hover={{ textDecoration: 'none' }}
        >
          konzisite
        </Heading>
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
