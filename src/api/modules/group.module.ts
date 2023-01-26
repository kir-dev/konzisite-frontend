import axios from 'axios'
import { GroupDetails } from '../../pages/groups/types/groupDetails'
import { GroupPreview } from '../../pages/groups/types/groupPreview'
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

  async joinGroup(groupId: number) {
    const response = await axios.post<UserToGroup>(`/groups/${groupId}/join`)
    return response.data
  }

  async leaveGroup(groupId: number) {
    const response = await axios.post<UserToGroup>(`/groups/${groupId}/leave`)
  }
}

export const groupModule = new GroupModule()
