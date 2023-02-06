import { UseToastOptions } from '@chakra-ui/react'
import { KonziError } from '../api/model/error.model'

export const generateToastParams = (e: KonziError): UseToastOptions => {
  switch (e.statusCode) {
    case 401:
      return { title: 'Nem vagy bejelentkezve', status: 'error' }
    case 403:
      return { title: 'Nincs jogosultságod a művelethez', status: 'error' }
    case 500:
      return { title: 'Ismeretlen hiba', description: 'Kérlek jelezd a fejlesztők felé', status: 'error' }
    default:
      return { title: e.message, status: 'error' }
  }
}
