import { Heading } from '@chakra-ui/react'

type Props = {
  title: string
}

export const PageHeading = ({ title }: Props) => {
  return (
    <Heading textAlign="center" mb={3}>
      {title}
    </Heading>
  )
}
