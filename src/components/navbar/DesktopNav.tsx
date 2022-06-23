import { Button, Stack } from '@chakra-ui/react'
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
        <Button
          flexDir="column"
          alignItems="center"
          key={item.label}
          as={Link}
          to={item.path}
          px={2}
          py={4}
          variant="ghost"
          colorScheme="brand"
        >
          {item.label}
        </Button>
      ))}
    </Stack>
  )
}

export default DesktopNav
