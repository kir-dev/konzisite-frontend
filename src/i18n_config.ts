import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { resources } from './i18n_data'

i18n.use(initReactI18next).init({
  resources,
  lng: 'hu',
  fallbackLng: 'hu',
  interpolation: {
    escapeValue: false
  }
})

export default i18n
