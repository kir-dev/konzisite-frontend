import { HStack, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'
import { NAV_ITEMS } from '../../util/nav-items'

type Props = {
  onNavigate: () => void
}

const MobileNav: FC<Props> = ({ onNavigate }) => {
  const { isLoggedIn, loggedInUser } = useAuthContext()
  const [navItems, setNavItems] = useState(NAV_ITEMS)
  const { t } = useTranslation()
  const textColor = useColorModeValue('brand.700', 'white')

  useEffect(() => {
    setNavItems(NAV_ITEMS.filter((item) => item.shouldBeShown(isLoggedIn, loggedInUser)))
  }, [isLoggedIn, loggedInUser])

  return (
    <Stack display={{ lg: 'none' }} fontWeight={700} fontSize="xl" ml={6} mb={6}>
      {navItems.map((item) => (
        <HStack
          key={item.label}
          as={item.external ? undefined : Link}
          to={item.external ? '' : item.path}
          onClick={() => {
            item.onClick()
            onNavigate()
          }}
        >
          <Text textAlign="center" color={textColor}>
            {t(item.label)}
          </Text>
        </HStack>
      ))}
    </Stack>
  )
}

export default MobileNav
