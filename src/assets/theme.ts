import { extendTheme } from '@chakra-ui/react'
import { mode, StyleFunctionProps, SystemStyleFunction, transparentize } from '@chakra-ui/theme-tools'

const buttonVariantGhost: SystemStyleFunction = (props) => {
  const { colorScheme: c, theme } = props

  if (c === 'gray') {
    return {
      color: mode(`inherit`, `whiteAlpha.900`)(props),
      _hover: {
        bg: mode(`gray.100`, `whiteAlpha.200`)(props)
      },
      _active: { bg: mode(`gray.200`, `whiteAlpha.300`)(props) }
    }
  }

  const darkHoverBg = transparentize(`${c}.500`, 0.12)(theme)
  const darkActiveBg = transparentize(`${c}.500`, 0.24)(theme)

  return {
    color: mode(`${c}.700`, `whiteAlpha.900`)(props),
    bg: 'transparent',
    _hover: {
      bg: mode(`${c}.50`, darkHoverBg)(props)
    },
    _active: {
      bg: mode(`${c}.100`, darkActiveBg)(props)
    }
  }
}

const buttonVariantSolid: SystemStyleFunction = (props) => {
  const { colorScheme: c } = props
  if (c === 'gray') {
    const bg = mode(`gray.100`, `whiteAlpha.200`)(props)
    return {
      bg,
      _hover: {
        bg: mode(`gray.200`, `whiteAlpha.300`)(props),
        _disabled: {
          bg
        }
      },
      _active: { bg: mode(`gray.300`, `whiteAlpha.400`)(props) }
    }
  }
  const yellowOrCyan = c === 'yellow' || c === 'cyan'
  const bg = yellowOrCyan ? `${c}.400` : `${c}.700`
  const color = yellowOrCyan ? 'black' : 'white'
  const hoverBg = yellowOrCyan ? `${c}.500` : `${c}.600`
  const activeBg = yellowOrCyan ? `${c}.500` : `${c}.600`

  const background = mode(bg, `${c}.300`)(props)
  return {
    bg: background,
    color: mode(color, `${c}.900`)(props),
    _hover: {
      bg: mode(hoverBg, `${c}.200`)(props),
      _disabled: {
        bg: background
      }
    },
    _active: { bg: mode(activeBg, `${c}.400`)(props) }
  }
}

const buttonVariantOutline: SystemStyleFunction = (props) => {
  const { colorScheme: c } = props
  const borderColor = mode(`gray.200`, `whiteAlpha.300`)(props)
  return {
    border: '2px solid',
    borderColor: c === 'gray' ? borderColor : mode(`${c}.700`, `${c}.300`)(props),
    ...buttonVariantGhost(props)
  }
}

// See more: https://chakra-ui.com/docs/theming/customize-theme
const customTheme = extendTheme({
  fonts: {
    title: `'Aclonica', sans-serif`
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        color: mode('black', 'whiteAlpha.900')(props),
        bg: mode('white', 'brand.900')(props)
      }
    })
  },
  colors: {
    brand: {
      50: '#E8EBFC',
      100: '#BFC8F8',
      200: '#96A5F3',
      300: '#6C81EF',
      400: '#435EEA',
      500: '#1A3BE5',
      600: '#152FB7',
      700: '#0F238A',
      800: '#0A185C',
      900: '#050C2E'
    }
  },
  components: {
    Button: {
      variants: {
        solid: buttonVariantSolid,
        ghost: buttonVariantGhost,
        outline: buttonVariantOutline
      }
    }
  }
})

export default customTheme
