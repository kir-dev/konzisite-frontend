import { Heading, Wrap } from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'
import ReactMarkdown from 'react-markdown'
import { DeveloperWrapItem } from './components/DeveloperWrapItem'
import { developers } from './util/developers'

export const ImpressumPage = () => {
  return (
    <>
      <Helmet title="Impressum" />
      <Heading size="xl" textAlign="center" mb={3}>
        Impressum
      </Heading>
      <ReactMarkdown>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
        ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived
        not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the
        1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
        Aldus PageMaker including versions of Lorem Ipsum.
      </ReactMarkdown>
      <Heading as="h2" size="lg" my="5" textAlign="center">
        Fejlesztők
      </Heading>
      <Wrap mb={5} justify="center">
        {developers.map((dev) => (
          <DeveloperWrapItem key={dev.name} dev={dev} />
        ))}
      </Wrap>
      <ReactMarkdown>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
        ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived
        not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the
        1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
        Aldus PageMaker including versions of Lorem Ipsum.
      </ReactMarkdown>
    </>
  )
}
