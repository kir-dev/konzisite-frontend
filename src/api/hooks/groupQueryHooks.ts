import axios from 'axios'
import { useQuery } from 'react-query'
import { GroupDetails } from '../../pages/groups/types/groupDetails'
import { GroupPreview } from '../../pages/groups/types/groupPreview'
import { PATHS } from '../../util/paths'
import { KonziError } from '../model/error.model'

export const useFecthGroupListQuery = () => {
  return useQuery<GroupPreview[], KonziError>('fetchGroups', async () => (await axios.get(PATHS.GROUPS)).data, { retry: false })
}

export const useFecthGroupDetailsQuery = (groupId: number) => {
  return useQuery<GroupDetails, KonziError>(
    ['fetchGroupDetails', groupId],
    async () => (await axios.get(`${PATHS.GROUPS}/${groupId}`)).data,
    {
      retry: false
    }
  )
}
