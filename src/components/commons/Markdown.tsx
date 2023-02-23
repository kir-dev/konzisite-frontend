import { Link, useColorModeValue } from '@chakra-ui/react'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import { ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGemoji from 'remark-gemoji'
import remarkGfm from 'remark-gfm'

const theme: any = {
  a: (props: { href: string; children: ReactNode }) => {
    const { href, children } = props
    const color = useColorModeValue('brand.200', 'brand.300')
    return (
      <Link textColor={color} isExternal href={href}>
        {children}
      </Link>
    )
  }
}

const Markdown = ({ markdown }: { markdown?: string }) => {
  return <ReactMarkdown components={ChakraUIRenderer(theme)} children={markdown || ''} remarkPlugins={[remarkGfm, remarkGemoji]} />
}

export default Markdown
