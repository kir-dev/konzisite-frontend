import axios from 'axios'
import { UserModel } from '../model/user.model'

class UserModule {
  async fetchCurrentUser() {
    const response = await axios.get<UserModel>('/users/profile')
    return response.data
  }

  async fetchUser(id: number) {
    const response = await axios.get<UserModel>(`/users/${id}`)
    return response.data
  }

  async loginUser(accessToken: string) {
    return axios.post<{ jwt: string }>(`/auth/login`, { accessToken })
  }

  /**
   * Don't use it yet!
   */
  async uploadProfileImage({ imageFile }: { imageFile: File }) {
    const formData = new FormData()
    formData.append('file', imageFile)
    return // todo: remove this line
    return axios.post<UserModel>(`/users/profile/image?filename=${imageFile.name}`, formData)
  }
}

export const userModule = new UserModule()
