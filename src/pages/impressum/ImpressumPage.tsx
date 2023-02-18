import { Heading, Link, Text, Wrap } from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'
import customTheme from '../../assets/theme'
import { DeveloperWrapItem } from './components/DeveloperWrapItem'
import { developers } from './util/developers'

export const ImpressumPage = () => {
  return (
    <>
      <Helmet title="Impressum" />
      <Heading size="xl" textAlign="center" mb={3}>
        Impresszum
      </Heading>
      <Text textAlign="justify">
        Az alkalmazást a HK felkérésére Kir-Dev webfejlesztő kör készítette. Mint ahogy az összes többi projektünk, ez is nyílt forráskódú.
        A projekt alapja egy NodeJS REST API, mely egy PostgreSQL adatbázisban tárolja az adatokat. A webes kommunikációt a NestJS, az
        adatbázissal való kapcsolatot pedig a Prisma keretrendszer egyszerűsíti. A backend kódbázisa{' '}
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
  )
}
