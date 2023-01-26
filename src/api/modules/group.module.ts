import axios from 'axios'
import { GroupPreview } from '../../pages/groups/types/groupPreview'
import { UserToGroup } from '../model/userToGroup.model'

class GroupModule {
  async fetchGroups() {
    const response = await axios.get<GroupPreview[]>('/groups')
    return response.data
  }

  async joinGroup(groupId: number) {
    const response = await axios.post<UserToGroup>(`/groups/${groupId}/join`)
    return response.data
  }
}

export const groupModule = new GroupModule()
