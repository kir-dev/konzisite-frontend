import { Heading, Link, Text, Wrap } from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import customTheme from '../../assets/theme'
import { PageHeading } from '../../components/commons/PageHeading'
import { DeveloperWrapItem } from './components/DeveloperWrapItem'
import { developers } from './util/developers'

export const ImpressumPage = () => {
  const { t } = useTranslation()
  return (
    <>
      <Helmet title={t('misc.impressum')} />
      <PageHeading title={t('misc.impressum')} />
      <Text textAlign="justify">
        {t('misc.impressum1')}{' '}
        <Link color={customTheme.colors.kirDev} href="https://github.com/kir-dev/konzisite-api" isExternal>
          {t('misc.impressum2')}
        </Link>{' '}
        {t('misc.impressum3')}{' '}
        <Link color={customTheme.colors.kirDev} href="https://github.com/kir-dev/konzisite-frontend" isExternal>
          {t('misc.impressum4')}
        </Link>
      </Text>

      <Text mt={4} textAlign="justify">
        {t('misc.impressum5')}{' '}
        <Link color={customTheme.colors.kirDev} href="https://kir-dev.hu" isExternal>
          {t('misc.impressum6')}
        </Link>
        {t('misc.impressum7')}{' '}
        <Link color={customTheme.colors.kirDev} href="https://kir-dev.hu/blog" isExternal>
          {t('misc.impressum8')}
        </Link>
        {t('misc.impressum9')}{' '}
        <Link color={customTheme.colors.kirDev} href="https://kir-dev.hu/ly/RBoIJ" isExternal>
          {t('misc.impressum10')}
        </Link>{' '}
        {t('misc.impressum11')}{' '}
        <Link color={customTheme.colors.kirDev} href="mailto:hello@kir-dev.hu" isExternal>
          {t('misc.impressum12')}
        </Link>
      </Text>
      <Heading as="h2" size="lg" my="5" textAlign="center">
        {t('misc.developers')}
      </Heading>
      <Wrap mb={5} justify="center">
        {developers.map((dev) => (
          <DeveloperWrapItem key={dev.name} dev={dev} />
        ))}
      </Wrap>
    </>
  )
}
