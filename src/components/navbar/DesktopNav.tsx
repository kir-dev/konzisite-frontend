import { Button, Stack } from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'
import { NAV_ITEMS } from '../../util/nav-items'

const DesktopNav: FC = () => {
  const { isLoggedIn, loggedInUser } = useAuthContext()
  const [navItems, setNavItems] = useState(NAV_ITEMS)
  const { t } = useTranslation()
  useEffect(() => {
    setNavItems(NAV_ITEMS.filter((item) => item.shouldBeShown(isLoggedIn, loggedInUser)))
  }, [isLoggedIn, loggedInUser])

  return (
    <Stack direction="row" spacing={4}>
      {navItems.map((item) => (
        <Button
          flexDir="column"
          alignItems="center"
          key={item.label}
          as={item.external ? undefined : Link}
          to={item.external ? '' : item.path}
          onClick={item.onClick}
          px={2}
          py={4}
          variant="ghost"
          colorScheme="brand"
        >
          {t(item.label)}
        </Button>
      ))}
    </Stack>
  )
}

export default DesktopNav
