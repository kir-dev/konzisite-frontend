import axios from 'axios'
import { UserModel } from '../model/user.model'

class UserModule {
  async fetchCurrentUser() {
    const response = await axios.get<UserModel & { jwt?: string }>('/users/profile')
    return response.data
  }

  async fetchUser(id: number) {
    const response = await axios.get<UserModel>(`/users/${id}`)
    return response.data
  }

  async loginUser(accessToken: string) {
    return axios.post<{ jwt: string }>(`/auth/login`, { accessToken })
  }
}

export const userModule = new UserModule()
