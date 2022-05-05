import { extendTheme } from '@chakra-ui/react'
import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools'

// See more: https://chakra-ui.com/docs/theming/customize-theme
const customTheme = extendTheme({
  fonts: {
    heading: 'Ubuntu',
    body: 'Ubuntu'
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        color: mode('black', 'whiteAlpha.900')(props),
        bg: mode('white', 'themeHelper.900')(props)
      }
    })
  },
  colors: {
    theme: {
      50: '#ffead3',
      100: '#ffd4a7',
      200: '#ffbf7c',
      300: '#ffaa50',
      400: '#ff9524',
      500: '#F77F00',
      600: '#ce6a00',
      700: '#7c3f00',
      800: '#522a00',
      900: '#291500'
    },
    themeHelper: {
      50: '#d3e8ff',
      100: '#a7d2ff',
      200: '#7cbbff',
      300: '#50a5ff',
      400: '#248eff',
      500: '#0078f7',
      600: '#0064ce',
      700: '#0050a5',
      800: '#002852',
      900: '#001429'
    },
    primary: {
      50: '#ead3ff',
      100: '#d4a7ff',
      200: '#bf7cff',
      300: '#aa50ff',
      400: '#9524ff',
      500: '#7f00f7',
      600: '#6a00ce',
      700: '#5500a5',
      800: '#2a0052',
      900: '#150029'
    },
    secondary: {
      50: '#ffd3e8',
      100: '#ffa7d2',
      200: '#ff7cbb',
      300: '#ff50a5',
      400: '#ff248e',
      500: '#F70078',
      600: '#ce0064',
      700: '#a50050',
      800: '#520028',
      900: '#290014'
    }
  }
})

export default customTheme
