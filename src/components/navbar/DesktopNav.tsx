import { Box, Button, Flex, Stack } from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'
import { NAV_ITEMS } from '../../util/nav-items'

const DesktopNav: FC = () => {
  const { isLoggedIn } = useAuthContext()
  const [navItems, setNavItems] = useState(NAV_ITEMS)

  useEffect(() => {
    setNavItems(NAV_ITEMS.filter((item) => item.shouldBeShown(isLoggedIn)))
  }, [isLoggedIn])

  return (
    <Stack direction="row" spacing={4}>
      {navItems.map((item) => (
        <Button flexDir="column" alignItems="center" key={item.label} as={Link} to={item.path} px={1} py={6} variant="ghost">
          <Flex fontSize="sm" justifyContent="center">
            <item.icon size="1.5rem" />
          </Flex>
          <Box fontSize="sm">{item.label}</Box>
        </Button>
      ))}
    </Stack>
  )
}

export default DesktopNav
