import { Box, Collapse, Flex, Heading, HStack, IconButton, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import { FC } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { PATHS } from '../../util/paths'
import { ColorModeSwitcher } from './ColorModeSwitcher'
import DesktopNav from './DesktopNav'
import MobileNav from './MobileNav'

export const Navbar: FC = () => {
  const { isOpen, onToggle } = useDisclosure()
  const onNavigate = () => onToggle()

  return (
    <Flex justifyContent="center" w="full" style={{ boxShadow: useColorModeValue('0 0.25rem 0.6rem #062a4c', '0 0.25rem 0.6rem #000') }}>
      <Box mx="auto" maxW="6xl" w="full" color={useColorModeValue('brand.500', 'white')}>
        <Flex h="4rem" w="full" px={4} py={2} align="center" justifyContent={'space-between'}>
          <Flex display={{ base: 'flex', md: 'none' }}>
            <IconButton
              onClick={onToggle}
              icon={isOpen ? <FaTimes size="1.5rem" /> : <FaBars size="1.5rem" />}
              variant="ghost"
              aria-label="Open navigation"
            />
          </Flex>
          <Heading fontFamily="title" as={Link} to={PATHS.INDEX} _hover={{ textDecoration: 'none' }}>
            Konzisite
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
