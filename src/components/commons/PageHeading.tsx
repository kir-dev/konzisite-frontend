import { Heading } from '@chakra-ui/react'

type Props = {
  title: string
}

export const PageHeading = ({ title }: Props) => {
  return (
    <Heading textAlign="center" my={3}>
      {title}
    </Heading>
  )
}
