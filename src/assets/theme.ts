import { extendTheme } from '@chakra-ui/react'
import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools'

// See more: https://chakra-ui.com/docs/theming/customize-theme
const customTheme = extendTheme({
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
  }
})

export default customTheme
