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

  const darkHoverBg = transparentize(`${c}.200`, 0.12)(theme)
  const darkActiveBg = transparentize(`${c}.200`, 0.24)(theme)

  return {
    color: mode(`${c}.600`, `whiteAlpha.900`)(props),
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

  const bg = `${c}.500`
  const color = 'white'
  const hoverBg = `${c}.400`
  const activeBg = `${c}.400`

  const background = mode(bg, `${c}.200`)(props)

  return {
    bg: background,
    color: mode(color, `${c}.900`)(props),
    _hover: {
      bg: mode(hoverBg, `${c}.300`)(props),
      _disabled: {
        bg: background
      }
    },
    _active: { bg: mode(activeBg, `${c}.300`)(props) }
  }
}

const buttonVariantOutline: SystemStyleFunction = (props) => {
  const { colorScheme: c } = props
  const borderColor = mode(`gray.200`, `whiteAlpha.300`)(props)
  return {
    ...buttonVariantGhost(props),
    color: mode(`${c}.600`, `${c}.200`)(props),
    border: '2px solid',
    borderColor: c === 'gray' ? borderColor : 'currentColor',
    '.chakra-button__group[data-attached] > &:not(:last-of-type)': {
      marginEnd: '-1px'
    }
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
      50: '#e1e9fe',
      100: '#8fbdfb',
      200: '#2b95e3',
      300: '#1d69a7',
      400: '#0f4775',
      500: '#062c4c',
      600: '#05263f',
      700: '#042135',
      800: '#031b2b',
      900: '#021422'
    },
    kirDev: '#f15a29',
    hk: '#2581c5'
  },
  components: {
    Button: {
      variants: {
        solid: buttonVariantSolid,
        ghost: buttonVariantGhost,
        outline: buttonVariantOutline
      }
    },
    Heading: {
      baseStyle: (props: StyleFunctionProps) => ({
        color: mode('brand.500', 'white')(props)
      })
    }
  },
  breakpoints: {
    // sm-2xl are the chakra defaults, added an extra breakpoint for 16+ inch full HD screens
    sm: '30em',
    m: '39em',
    md: '48em',
    lg: '62em',
    xl: '80em',
    '2xl': '96em',
    '3xl': '112em'
  }
})

export default customTheme
