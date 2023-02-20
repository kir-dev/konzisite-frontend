import { Link } from '@chakra-ui/react'
import { HasChildren } from '../../util/react-types.util'

type Props = {
  url: string
  hoverColor: string
  centered?: boolean
} & HasChildren

export const ColorfulExternalLink = ({ url, hoverColor, children, centered = false }: Props) => {
  return (
    <Link isExternal href={url} _hover={{ color: hoverColor }} textAlign={centered ? 'center' : undefined}>
      {children}
    </Link>
  )
}
