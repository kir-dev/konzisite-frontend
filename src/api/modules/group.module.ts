import axios from 'axios'
import { GroupPreview } from '../../pages/groups/types/groupPreview'

class GroupModule {
  async fetchGroups() {
    const response = await axios.get<GroupPreview[]>('/groups')
    return response.data
  }
}

export const groupModule = new GroupModule()
