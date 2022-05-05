import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import { ReactNode } from 'react-markdown/lib/react-markdown'
import { KLink } from '../components/commons/KLink'

const sliceHref = (href: string, pattern: string): string => {
  if (href.indexOf(pattern) === 0) {
    return href.slice(pattern.length, href.length)
  }
  return href
}

const remarkTheme: any = {
  a: (props: { href: string; children: ReactNode }) => {
    const { href, children } = props
    let slicedHref = href
    slicedHref = sliceHref(slicedHref, 'https://remark.triszt4n.xyz')
    slicedHref = sliceHref(slicedHref, 'remark.triszt4n.xyz')
    if (slicedHref.length === 0) slicedHref = '/'
    const isInternal = slicedHref.startsWith('/')
    return (
      <KLink isExternal={!isInternal} to={slicedHref}>
        {children}
      </KLink>
    )
  }
}

export const RemarkUIRenderer = () => ChakraUIRenderer(remarkTheme)
