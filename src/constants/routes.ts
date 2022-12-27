export const BASE_URL = process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_BASE_URL : 'http://localhost:8080'

export const API_URL = {
  BASE_USER_FILES: `${BASE_URL}/user-files`,
  BASE_AUTH: `${BASE_URL}/auth`,
  BASE_USERS: `${BASE_URL}/users`,
  REGISTER: `${BASE_URL}/auth/register`,
  LOGIN: `${BASE_URL}/auth/login`,
  LOGOUT: `${BASE_URL}/auth/logout`,
  AUTHENTICATE: `${BASE_URL}/auth`,
  REFRESH_TOKEN: `${BASE_URL}/auth/refresh-token`,
  USERS_PUBLIC_PROFILE: `${BASE_URL}/users/public-profiles`,
  USERS_FILES_AVATAR:`${BASE_URL}/user-files/avatar`,
  USERS_FILES_PUBLIC_FILE: `${BASE_URL}/user-files/public-file`,
}