import {
  Code,
  Divider,
  Heading,
  Image,
  Link,
  ListItem,
  OrderedList,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  UnorderedList
} from '@chakra-ui/react'
import Markdown, { Components } from 'react-markdown'
import { chakra } from '@chakra-ui/system'
import remarkGfm from 'remark-gfm'
import remarkGemoji from 'remark-gemoji'

type GetCoreProps = {
  children?: React.ReactNode
  'data-sourcepos'?: any
}

function getCoreProps(props: GetCoreProps): any {
  return props['data-sourcepos'] ? { 'data-sourcepos': props['data-sourcepos'] } : {}
}

export const defaults: Components = {
  p: (props) => {
    const { children } = props
    return <Text mb={2}>{children}</Text>
  },
  em: (props) => {
    const { children } = props
    return <Text as="em">{children}</Text>
  },
  blockquote: (props) => {
    const { children } = props
    return (
      <Code as="blockquote" p={2}>
        {children}
      </Code>
    )
  },
  code: (props) => {
    const { children, className } = props

    return <Code className={className} whiteSpace="break-spaces" display="block" w="full" p={2} children={children} />
  },
  del: (props) => {
    const { children } = props
    return <Text as="del">{children}</Text>
  },
  hr: (props) => {
    return <Divider />
  },
  a: (props) => {
    const { href, children } = props
    return (
      <Link textColor="brand.200" textDecoration="underline" isExternal href={href}>
        {children}
      </Link>
    )
  },
  img: Image,
  text: (props) => {
    const { children } = props
    return <Text as="span">{children}</Text>
  },
  ul: (props) => {
    const { children } = props
    const attrs = getCoreProps(props)
    return (
      <UnorderedList spacing={2} as={'ul'} styleType={'disc'} pl={4} {...attrs}>
        {children}
      </UnorderedList>
    )
  },
  ol: (props) => {
    const { children } = props
    const attrs = getCoreProps(props)
    return (
      <OrderedList spacing={2} as={'ol'} styleType={'decimal'} pl={4} {...attrs}>
        {children}
      </OrderedList>
    )
  },
  li: (props) => {
    const { children } = props

    return (
      <ListItem {...getCoreProps(props)} listStyleType={'inherit'}>
        {children}
      </ListItem>
    )
  },
  h1: (props) => (
    <Heading my={4} as="h1" size="2xl" {...getCoreProps(props)}>
      {props.children}
    </Heading>
  ),

  h2: (props) => (
    <Heading my={4} as="h2" size="xl" {...getCoreProps(props)}>
      {props.children}
    </Heading>
  ),
  h3: (props) => (
    <Heading my={4} as="h3" size="lg" {...getCoreProps(props)}>
      {props.children}
    </Heading>
  ),
  h4: (props) => (
    <Heading my={4} as="h4" size="md" {...getCoreProps(props)}>
      {props.children}
    </Heading>
  ),
  h5: (props) => (
    <Heading my={4} as="h5" size="sm" {...getCoreProps(props)}>
      {props.children}
    </Heading>
  ),
  h6: (props) => (
    <Heading my={4} as="h6" size="xs" {...getCoreProps(props)}>
      {props.children}
    </Heading>
  ),
  pre: (props) => {
    const { children } = props
    return <chakra.pre {...getCoreProps(props)}>{children}</chakra.pre>
  },
  table: Table,
  thead: Thead,
  tbody: Tbody,
  tr: (props) => <Tr>{props.children}</Tr>,
  td: (props) => <Td>{props.children}</Td>,
  th: (props) => <Th>{props.children}</Th>
}

export default ({ markdown }: { markdown?: string }) => {
  return <Markdown components={defaults} children={markdown} remarkPlugins={[remarkGfm, remarkGemoji]} />
}
