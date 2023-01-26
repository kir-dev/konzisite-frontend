import axios from 'axios'
import { useMutation } from 'react-query'
import { CreateGroup } from '../../pages/groups/types/createGroup'
import { KonziError } from '../model/error.model'
import { GroupModel } from '../model/group.model'
import { UserToGroup } from '../model/userToGroup.model'

interface GroupMutationParams {
  groupId: number
  userId: number
}

export const useCreateGroupMutation = (onSuccess: () => void, onError: (e: KonziError) => void) => {
  return useMutation<GroupModel, KonziError, CreateGroup>(async (formData) => (await axios.post('/groups/', formData)).data, {
    onSuccess,
    onError
  })
}

export const useDeleteGroupMutation = (onSuccess: () => void, onError: (e: KonziError) => void) => {
  return useMutation<GroupModel, KonziError, number>(async (groupId) => (await axios.delete(`/groups/${groupId}`)).data, {
    onSuccess,
    onError
  })
}

export const useJoinGroupMutation = (onSuccess: () => void, onError: (e: KonziError) => void) => {
  return useMutation<UserToGroup, KonziError, number>(async (groupId) => (await axios.post(`/groups/${groupId}/join/`)).data, {
    onSuccess,
    onError
  })
}

export const useLeaveGroupMutation = (onError: (e: KonziError) => void) => {
  return useMutation<UserToGroup, KonziError, number>(async (groupId) => (await axios.post(`/groups/${groupId}/leave/`)).data, {
    onError
  })
}

export const useApproveUserMutation = (onSuccess: () => void, onError: (e: KonziError) => void) => {
  return useMutation<UserToGroup, KonziError, GroupMutationParams>(
    async ({ groupId, userId }) => (await axios.post(`/groups/${groupId}/approve/${userId}`)).data,
    { onSuccess, onError }
  )
}

export const useDeclineUserMutation = (onSuccess: () => void, onError: (e: KonziError) => void) => {
  return useMutation<UserToGroup, KonziError, GroupMutationParams>(
    async ({ groupId, userId }) => (await axios.post(`/groups/${groupId}/decline/${userId}`)).data,
    { onSuccess, onError }
  )
}

export const usePromoteUserInGroupMutation = (onSuccess: () => void, onError: (e: KonziError) => void) => {
  return useMutation<UserToGroup, KonziError, GroupMutationParams>(
    async ({ groupId, userId }) => (await axios.post(`/groups/${groupId}/promote/${userId}`)).data,
    { onSuccess, onError }
  )
}

export const useDemoteUserInGroupMutation = (onSuccess: () => void, onError: (e: KonziError) => void) => {
  return useMutation<UserToGroup, KonziError, GroupMutationParams>(
    async ({ groupId, userId }) => (await axios.post(`/groups/${groupId}/demote/${userId}`)).data,
    { onSuccess, onError }
  )
}

export const useRemoveUserFromGroupMutation = (onSuccess: () => void, onError: (e: KonziError) => void) => {
  return useMutation<UserToGroup, KonziError, GroupMutationParams>(
    async ({ groupId, userId }) => (await axios.post(`/groups/${groupId}/remove/${userId}`)).data,
    { onSuccess, onError }
  )
}
