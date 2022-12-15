import { API_URL } from "../constants/routes"
import { FilePublic } from "../store"
import fetch from "../utils/fetch"

export const updateAvatar = async (formData: FormData) => {
  try {
    const res = await fetch.post(`${API_URL.USERS_FILES_AVATAR}`, null, {
      body: formData,
      headers: {}
    })

    return res
  } catch (error) {
    throw error
  }
}

export const uploadPublicFile = async (formData: FormData) => {
  try {
    const res = await fetch.post<FilePublic>(`${API_URL.USERS_FILES_PUBLIC_FILE}`, null, {
      body: formData,
      headers: {}
    })
    return res
  } catch (error) {
    throw error
  }
}

export const getAllPublicFiles = async (username: string) => {
  try {
    const res = await fetch.get<FilePublic[]>(`${API_URL.BASE_USER_FILES}/${username}/public-files`)
    return res
  } catch (error) {
    console.log({ error })
    throw error
  }
}

export const deletePublicFile = async (fileId: string) => {
  try {
    const res = await fetch.remove(`${API_URL.USERS_FILES_PUBLIC_FILE}/${fileId}`,{
    })
    return res
  } catch (error) {
    console.log({ error })
    throw error
  }
}


export default {
  updateAvatar,
  uploadPublicFile,
  getAllPublicFiles,
  deletePublicFile
}