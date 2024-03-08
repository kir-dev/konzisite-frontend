import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { GroupDetails } from '../../pages/groups/types/groupDetails'
import { GroupPreview } from '../../pages/groups/types/groupPreview'
import { PATHS } from '../../util/paths'
import { KonziError } from '../model/error.model'

export const useFecthGroupListQuery = () => {
  return useQuery<GroupPreview[], KonziError>({
    queryKey: ['fetchGroups'],
    queryFn: async () => (await axios.get(PATHS.GROUPS)).data,
    retry: false
  })
}

export const useFecthGroupDetailsQuery = (groupId: number) => {
  return useQuery<GroupDetails, KonziError>({
    queryKey: ['fetchGroupDetails', groupId],
    queryFn: async () => (await axios.get(`${PATHS.GROUPS}/${groupId}`)).data,
    retry: false
  })
}
