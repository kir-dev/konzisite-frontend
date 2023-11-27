import { Button, useColorModeValue } from '@chakra-ui/react'
import { changeLanguage } from 'i18next'
import { useTranslation } from 'react-i18next'

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation()
  const nextLang = i18n.language === 'hu' ? 'en' : 'hu'
  const changeLang = () => {
    const localLang = localStorage.getItem('language')
    if (!localLang || localLang === 'hu') {
      changeLanguage('en')
      localStorage.setItem('language', 'en')
      return
    }

    changeLanguage('hu')
    localStorage.setItem('language', 'hu')
  }

  return (
    <Button
      size="md"
      p={0}
      fontSize={{ base: 'lg', md: 'xl' }}
      variant="ghost"
      onClick={changeLang}
      aria-label={`Switch language`}
      color={useColorModeValue('brand.500', 'white')}
    >
      {nextLang}
    </Button>
  )
}
