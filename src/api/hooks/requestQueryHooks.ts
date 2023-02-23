import axios from 'axios'
import { useQuery } from 'react-query'
import { RequestDetails } from '../../pages/requests/types/requestDetails'
import { RequestPreview } from '../../pages/requests/types/requestPreview'
import { isValidId } from '../../util/core-util-functions'
import { PATHS } from '../../util/paths'
import { KonziError } from '../model/error.model'

export const useFetchRequestListQuery = () => {
  return useQuery<RequestPreview[], KonziError>('fetchRequests', async () => (await axios.get(PATHS.REQUESTS)).data, { retry: false })
}

export const useFecthRequestDetailsQuery = (requestId: number) => {
  return useQuery<RequestDetails, KonziError>(
    ['fetchRequestDetails', requestId],
    async () => (await axios.get(`${PATHS.REQUESTS}/${requestId}`)).data,
    {
      retry: false,
      enabled: isValidId(requestId)
    }
  )
}
