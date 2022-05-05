import { HStack, Stack, Text } from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'
import { NAV_ITEMS } from '../../util/nav-items'

type Props = {
  onNavigate: () => void
}

const MobileNav: FC<Props> = ({ onNavigate }) => {
  const { isLoggedIn } = useAuthContext()
  const [navItems, setNavItems] = useState(NAV_ITEMS)

  useEffect(() => {
    setNavItems(NAV_ITEMS.filter((item) => item.shouldBeShown(isLoggedIn)))
  }, [isLoggedIn])

  return (
    <Stack display={{ md: 'none' }} fontWeight={700} fontSize="xl" ml={6} mb={6}>
      {navItems.map((item) => (
        <HStack key={item.label} as={Link} to={item.path} onClick={onNavigate}>
          <item.icon />
          <Text textAlign="center">{item.label}</Text>
        </HStack>
      ))}
    </Stack>
  )
}

export default MobileNav
