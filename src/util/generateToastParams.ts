import { UseToastOptions } from '@chakra-ui/react'
import { TFunction } from 'i18next'
import { KonziError } from '../api/model/error.model'

export const generateToastParams = (e: KonziError, t: TFunction): UseToastOptions => {
  switch (e.statusCode) {
    case 401:
      return { title: t('errors.401'), status: 'error' }
    case 403:
      return { title: t('errors.403'), status: 'error' }
    case 500:
      return { title: t('errors.500'), description: t('errors.desc500'), status: 'error' }
    default:
      return { title: e.message, status: 'error' }
  }
}
