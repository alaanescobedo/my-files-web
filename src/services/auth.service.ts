import { API_URL } from "../constants/routes"
import { User } from "../store"
import fetch from "../utils/fetch"

interface RegisterPayload {
  username: string
  email: string
  password: string
}
export const register = async (payload: RegisterPayload) => {
  try {
    const data = await fetch.post(API_URL.REGISTER, payload)
    return data
  } catch (error) {
    throw error
  }
}

interface LoginPayload {
  username: string
  password: string
}
export const login = async (payload: LoginPayload) => {
  try {
    const data = await fetch.post(API_URL.LOGIN, payload)
    return data
  } catch (error) {
    throw error
  }
}

export const logout = async () => {
  try {
    const data = await fetch.get(API_URL.LOGOUT)
    return data
  } catch (error) {
    throw error
  }
}

export const authenticate = async (cookie?: any) => {
  try {
    const data = await fetch.get<User>(API_URL.AUTHENTICATE, {
      headers: {
        "Content-Type": "application/json",
        'Cookie': cookie ? cookie : ''
      },
    })
    return data
  } catch (error: any) {
    throw error
  }
}

export const refreshToken = async () => {
  try {
    const data = await fetch.get(API_URL.REFRESH_TOKEN)
    return data
  } catch (error) {
    throw error
  }
}

export default {
  register,
  login,
  logout,
  authenticate,
  refreshToken
}