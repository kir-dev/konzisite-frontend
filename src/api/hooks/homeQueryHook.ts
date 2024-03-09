import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { HomeDto } from '../../pages/index/types/Home'
import { PATHS } from '../../util/paths'
import { KonziError } from '../model/error.model'

export const useFetchHomeDataQuery = () => {
  return useQuery<HomeDto, KonziError>({
    queryKey: ['fetchHomeData'],
    queryFn: async () => (await axios.get(`${PATHS.CONSULTATIONS}/home`)).data,
    retry: false
  })
}
