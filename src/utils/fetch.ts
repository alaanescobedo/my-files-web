
export const post = async <T>(url: string, body: any, config?: Omit<RequestInit, 'method'>): Promise<T> => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: config?.headers ? config.headers : {
        'Content-Type': 'application/json',
      },
      credentials: config?.credentials ? config.credentials : 'include',
      body: config?.body ? config.body : JSON.stringify(body),
      ...config,
    })

    return await handleResponse(response)
  } catch (error) {
    throw error
  }
}

export const get = async <T>(url: string, config?: Omit<RequestInit, 'body' | 'method'>): Promise<T> => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: config?.headers ? config.headers : {
        'Content-Type': 'application/json',
      },
      ...config,
    })
    return await handleResponse(response)
  } catch (error) {
    throw error
  }
}

export const remove = async <T>(url: string, config?: Omit<RequestInit, 'body' | 'method'>): Promise<T> => {
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: config?.headers ? config.headers : {
        'Content-Type': 'application/json',
      },
      credentials: config?.credentials ? config.credentials : 'include',
      ...config,
    })
    return await handleResponse(response)
  } catch (error) {
    throw error
  }
}

const handleResponse = (response: Response) => {
  return response.text().then((text: any) => {
    const data = text && JSON.parse(text)
    if (!response.ok) {
      const error = (data && data.message) || response.statusText
      throw new Error(error)
    }
    return data
  })
}

export default {
  post,
  get,
  remove,
}