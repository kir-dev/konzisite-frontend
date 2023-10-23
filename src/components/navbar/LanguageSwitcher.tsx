import { IconButton, useColorModeValue } from "@chakra-ui/react"
import { changeLanguage } from "i18next"
import { FaLanguage } from "react-icons/fa"


export const LanguageSwitcher = () => {

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
    <IconButton
      size="md"
      fontSize={{ base: 'xl', md: '2xl' }}
      variant="ghost"
      onClick={changeLang}
      icon={<FaLanguage />}
      aria-label={`Switch language`}
      color={useColorModeValue('brand.500', 'white')}
    />
  )
}
