import axios from 'axios'
import { useQuery } from 'react-query'
import { HomeDto } from '../../pages/index/types/Home'
import { PATHS } from '../../util/paths'
import { KonziError } from '../model/error.model'

export const useFetchHomeDataQuery = () => {
  return useQuery<HomeDto, KonziError>('fetchHomeData', async () => (await axios.get(`${PATHS.CONSULTATIONS}/home`)).data, {
    retry: false
  })
}
