import { API_URL } from "../constants/routes"
import { User } from "../store"
import fetch from "../utils/fetch"

export const getUsersPublicProfile = async () => {
  try {
    const data = await fetch.get<User[]>(API_URL.USERS_PUBLIC_PROFILE)
    return data
  } catch (error) {
    throw error
  }
}

export default {
  getUsersPublicProfile
}