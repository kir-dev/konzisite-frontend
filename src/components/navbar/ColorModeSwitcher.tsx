import { IconButton, IconButtonProps, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { FC } from 'react'
import { FaMoon } from 'react-icons/fa'
import { FiSun } from 'react-icons/fi'

type ColorModeSwitcherProps = Omit<IconButtonProps, 'aria-label'>

export const ColorModeSwitcher: FC<ColorModeSwitcherProps> = (props) => {
  const { toggleColorMode } = useColorMode()
  const text = useColorModeValue('dark', 'light')
  const SwitchIcon = useColorModeValue(FaMoon, FiSun)

  return (
    <IconButton
      size="md"
      fontSize={{ base: 'xl', md: '2xl' }}
      variant="ghost"
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      aria-label={`Switch to ${text} mode`}
      {...props}
    />
  )
}
