import { Heading, Text, Wrap } from '@chakra-ui/react'
import { DeveloperWrapItem } from './components/DeveloperWrapItem'

const ImpressumPage = () => {
  const developers = [
    {
      name: 'Samu',
      img: 'https://warp.sch.bme.hu/images/feketesamu1.jpg',
      tags: ['Project Leader', 'Backend', 'Frontend']
    },
    {
      name: 'Dani',
      img: 'https://warp.sch.bme.hu/images/szaraz_daniel_funny1.jpg',
      tags: ['Backend', 'Frontend']
    },
    {
      name: 'Kolos',
      img: '',
      tags: ['Backend', 'Frontend']
    }
  ]

  return (
    <>
      <Heading size="xl" textAlign="center" mb={3}>
        Impressum
      </Heading>
      {/*<Markdown text="Konzisite " /> //TODO*/}
      <Text>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
        ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived
        not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the
        1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
        Aldus PageMaker including versions of Lorem Ipsum.
      </Text>
      <Heading as="h2" size="lg" my="5" textAlign="center">
        Fejlesztők
      </Heading>
      <Wrap justify="center">
        {developers.map((dev) => (
          <DeveloperWrapItem key={dev.name} dev={dev} />
        ))}
      </Wrap>
      {/*<Markdown text={impressumConfig?.developersBottomMessage} />*/}
    </>
  )
}

export default ImpressumPage
