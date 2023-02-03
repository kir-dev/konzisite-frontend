import axios from 'axios'
import { useMutation } from 'react-query'
import { CreateGroup } from '../../pages/groups/types/createGroup'
import { GroupPreview } from '../../pages/groups/types/groupPreview'
import { API_HOST } from '../../util/environment'
import { PATHS } from '../../util/paths'
import { KonziError } from '../model/error.model'
import { GroupModel } from '../model/group.model'
import { UserToGroup } from '../model/userToGroup.model'

interface GroupMutationParams {
  groupId: number
  userId: number
}

export const useFecthGroupListMutation = (onError: (e: KonziError) => void) => {
  return useMutation<GroupPreview[], KonziError, string>(
    'fetchGroupsMuatation',
    async (search: string) => {
      const url = new URL(PATHS.GROUPS, API_HOST)
      url.searchParams.append('search', search)
      return (await axios.get(url.toString())).data
    },
    { onError }
  )
}

export const useCreateGroupMutation = () => {
  return useMutation<GroupModel, KonziError, CreateGroup>(async (formData) => (await axios.post(PATHS.GROUPS, formData)).data)
}

export const useEditGroupMutation = (groupId: number) => {
  return useMutation<GroupModel, KonziError, CreateGroup>(
    async (formData) => (await axios.patch(`${PATHS.GROUPS}/${groupId}`, formData)).data
  )
}

export const useDeleteGroupMutation = (onSuccess: () => void, onError: (e: KonziError) => void) => {
  return useMutation<GroupModel, KonziError, number>(async (groupId) => (await axios.delete(`${PATHS.GROUPS}/${groupId}`)).data, {
    onSuccess,
    onError
  })
}

export const useJoinGroupMutation = (onSuccess: () => void, onError: (e: KonziError) => void) => {
  return useMutation<UserToGroup, KonziError, number>(async (groupId) => (await axios.post(`${PATHS.GROUPS}/${groupId}/join/`)).data, {
    onSuccess,
    onError
  })
}

export const useLeaveGroupMutation = (onError: (e: KonziError) => void) => {
  return useMutation<UserToGroup, KonziError, number>(async (groupId) => (await axios.post(`${PATHS.GROUPS}/${groupId}/leave/`)).data, {
    onError
  })
}

export const useApproveUserMutation = (onSuccess: () => void, onError: (e: KonziError) => void) => {
  return useMutation<UserToGroup, KonziError, GroupMutationParams>(
    async ({ groupId, userId }) => (await axios.post(`${PATHS.GROUPS}/${groupId}/approve/${userId}`)).data,
    { onSuccess, onError }
  )
}

export const useDeclineUserMutation = (onSuccess: () => void, onError: (e: KonziError) => void) => {
  return useMutation<UserToGroup, KonziError, GroupMutationParams>(
    async ({ groupId, userId }) => (await axios.post(`${PATHS.GROUPS}/${groupId}/decline/${userId}`)).data,
    { onSuccess, onError }
  )
}

export const usePromoteUserInGroupMutation = (onSuccess: () => void, onError: (e: KonziError) => void) => {
  return useMutation<UserToGroup, KonziError, GroupMutationParams>(
    async ({ groupId, userId }) => (await axios.post(`${PATHS.GROUPS}/${groupId}/promote/${userId}`)).data,
    { onSuccess, onError }
  )
}

export const useDemoteUserInGroupMutation = (onSuccess: () => void, onError: (e: KonziError) => void) => {
  return useMutation<UserToGroup, KonziError, GroupMutationParams>(
    async ({ groupId, userId }) => (await axios.post(`${PATHS.GROUPS}/${groupId}/demote/${userId}`)).data,
    { onSuccess, onError }
  )
}

export const useRemoveUserFromGroupMutation = (onSuccess: () => void, onError: (e: KonziError) => void) => {
  return useMutation<UserToGroup, KonziError, GroupMutationParams>(
    async ({ groupId, userId }) => (await axios.post(`${PATHS.GROUPS}/${groupId}/remove/${userId}`)).data,
    { onSuccess, onError }
  )
}
