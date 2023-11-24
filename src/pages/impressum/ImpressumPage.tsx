import { Heading, Link, Text, Wrap } from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import customTheme from '../../assets/theme'
import { PageHeading } from '../../components/commons/PageHeading'
import { DeveloperWrapItem } from './components/DeveloperWrapItem'
import { developers } from './util/developers'

export const ImpressumPage = () => {
  const { i18n } = useTranslation()
  return i18n.language === 'hu' ? (
    <>
      <Helmet title="Impresszum" />
      <PageHeading title="Impresszum" />
      <Text textAlign="justify">
        Az alkalmazást a HK felkérésére a Kir-Dev webfejlesztő kör készítette. Mint ahogy az összes többi projektünk, ez is nyílt
        forráskódú. A projekt alapja egy NodeJS REST API, mely egy PostgreSQL adatbázisban tárolja az adatokat. A webes kommunikációt a
        NestJS, az adatbázissal való kapcsolatot pedig a Prisma keretrendszer egyszerűsíti. A backend kódbázisa{' '}
        <Link color={customTheme.colors.kirDev} href="https://github.com/kir-dev/konzisite-api" isExternal>
          itt böngészhető
        </Link>
        . A felhasználói felület pedig React-tal készült, az egységes megjelenés a Chakra UI-nak köszönhető. A frontend kódbázisát{' '}
        <Link color={customTheme.colors.kirDev} href="https://github.com/kir-dev/konzisite-frontend" isExternal>
          itt tudod megnézni
        </Link>
        .
      </Text>

      <Text mt={4} textAlign="justify">
        Ha érdekel a webfejlesztés és szeretnél többet megtudni rólunk, látogass el a{' '}
        <Link color={customTheme.colors.kirDev} href="https://kir-dev.hu" isExternal>
          weboldalunkra
        </Link>
        , vagy olvass bele a{' '}
        <Link color={customTheme.colors.kirDev} href="https://kir-dev.hu/blog" isExternal>
          blogunkba
        </Link>
        , ahol{' '}
        <Link color={customTheme.colors.kirDev} href="https://kir-dev.hu/ly/RBoIJ" isExternal>
          külön posztot írtunk a Konzisite fejlesztésének folyamatáról
        </Link>
        . Amennyiben hibát találtál az alkalmazás működésében, vagy lenne egy ötleted, hogy mit lehetne fejleszteni rajta, vedd fel velünk a
        kapcsolatot{' '}
        <Link color={customTheme.colors.kirDev} href="mailto:hello@kir-dev.hu" isExternal>
          emailen
        </Link>
        .
      </Text>
      <Heading as="h2" size="lg" my="5" textAlign="center">
        Fejlesztők
      </Heading>
      <Wrap mb={5} justify="center">
        {developers.map((dev) => (
          <DeveloperWrapItem key={dev.name} dev={dev} />
        ))}
      </Wrap>
    </>
  ) : (
    <>
      <Helmet title="Impressum" />
      <PageHeading title="Impressum" />
      <Text textAlign="justify">
        The application was developed by the Kir-Dev team. As all our other projects, this one is also open-source. A NodeJS REST API is the
        foundation of the project, which stores the data in a PostgreSQL database. The NestJS framework is used for HTTP communication,
        while the Prisma framework helps with database communication.{' '}
        <Link color={customTheme.colors.kirDev} href="https://github.com/kir-dev/konzisite-api" isExternal>
          The codebase of the backend can be browsed here.
        </Link>{' '}
        The User Interface is made with React. The unified look was achieved with Chakra UI.{' '}
        <Link color={customTheme.colors.kirDev} href="https://github.com/kir-dev/konzisite-frontend" isExternal>
          You can check out the frontend codebase here.
        </Link>
      </Text>

      <Text mt={4} textAlign="justify">
        If you're interested in web development or want to learn more, visit our{' '}
        <Link color={customTheme.colors.kirDev} href="https://kir-dev.hu" isExternal>
          website
        </Link>
        , our read some of our{' '}
        <Link color={customTheme.colors.kirDev} href="https://kir-dev.hu/blog" isExternal>
          blogposts
        </Link>
        , where{' '}
        <Link color={customTheme.colors.kirDev} href="https://kir-dev.hu/ly/RBoIJ" isExternal>
          we wrote a dedicated article about the development of Konzisite
        </Link>
        . If you find any bugs with the application or have suggestions for improvments, don't hesitate to contact us through{' '}
        <Link color={customTheme.colors.kirDev} href="mailto:hello@kir-dev.hu" isExternal>
          email
        </Link>
        .
      </Text>
      <Heading as="h2" size="lg" my="5" textAlign="center">
        Developers
      </Heading>
      <Wrap mb={5} justify="center">
        {developers.map((dev) => (
          <DeveloperWrapItem key={dev.name} dev={dev} />
        ))}
      </Wrap>
    </>
  )
}
