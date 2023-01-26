import axios from 'axios'
import { CreateGroup } from '../../pages/groups/types/createGroup'
import { GroupDetails } from '../../pages/groups/types/groupDetails'
import { GroupPreview } from '../../pages/groups/types/groupPreview'
import { GroupModel } from '../model/group.model'
import { UserToGroup } from '../model/userToGroup.model'

class GroupModule {
  async fetchGroups() {
    const response = await axios.get<GroupPreview[]>('/groups')
    return response.data
  }

  async fetchGroup(groupId: number) {
    const response = await axios.get<GroupDetails>(`/groups/${groupId}`)
    return response.data
  }

  async createGroup(data: CreateGroup) {
    const response = await axios.post<GroupModel>('/groups', data)
    return response.data
  }

  async deleteGroup(groupId: number) {
    const response = await axios.delete<GroupModel>(`/groups/${groupId}`)
    return response.data
  }

  async joinGroup(groupId: number) {
    const response = await axios.post<UserToGroup>(`/groups/${groupId}/join`)
    return response.data
  }

  async leaveGroup(groupId: number) {
    const response = await axios.post<UserToGroup>(`/groups/${groupId}/leave`)
    return response.data
  }

  async removeFromGroup(groupId: number, userId: number) {
    const response = await axios.post<UserToGroup>(`/groups/${groupId}/remove/${userId}`)
    return response.data
  }

  async approveUserToGroup(groupId: number, userId: number) {
    return (await axios.post(`/groups/${groupId}/approve/${userId}`)).data
  }

  async declineUserToGroup(groupId: number, userId: number) {
    const response = await axios.post<UserToGroup>(`/groups/${groupId}/decline/${userId}`)
    return response.data
  }

  async promoteUserInGroup(groupId: number, userId: number) {
    const response = await axios.post<UserToGroup>(`/groups/${groupId}/promote/${userId}`)
    return response.data
  }

  async demoteUserInGroup(groupId: number, userId: number) {
    const response = await axios.post<UserToGroup>(`/groups/${groupId}/demote/${userId}`)
    return response.data
  }
}

export const groupModule = new GroupModule()
