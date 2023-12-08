const RETRY_COUNT = 1
const RETRY_INTERVAL = 1500

export const GET = async (accessToken: string, path: string): Promise<Response> => {
  return retry(accessToken, RETRY_COUNT, path, 'GET')
}

export const POST = async (accessToken: string, path: string, body: object) => {
  return retry(accessToken, RETRY_COUNT, path, 'POST', JSON.stringify(body))
}

export const PUT = async (accessToken: string, path: string, body: object) => {
  return retry(accessToken, RETRY_COUNT, path, 'PUT', JSON.stringify(body))
}

export const DELETE = async (accessToken: string, path: string) => {
  return retry(accessToken, RETRY_COUNT, path, 'DELETE')
}

function delay(time: number) {
  console.warn(`retry again after ${time}ms`)
  return new Promise((resolve) => setTimeout(resolve, time))
}

const retry = async (accessToken: string, count: number, path: string, method: string, body?: BodyInit | null): Promise<Response> => {
  try {
    const url: URL = new URL(window.location.protocol + '//' + window.location.host.replace(':3000', ':8000') + path)

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    }

    const request: RequestInit = { method: method, headers: headers, body: body }

    return await fetch(url, request).then((response) => {
      if (!response.ok) throw response
      return response
    })
  } catch (err: any) {
    if (count === 1) return err

    await delay(RETRY_INTERVAL)

    return await retry(accessToken, count - 1, path, method, body)
  }
}

export const everything = async (q: string): Promise<any> => {
  const apiUrl = 'https://newsapi.org/v2/everything'
  const queryParams = {
    apiKey: process.env.REACT_APP_NEWS_API_KEY as string,
    q: q,
    // from: '2023-12-08',
    // sortBy: 'popularity',
  }
  const queryString = new URLSearchParams(queryParams).toString()
  fetch(`${apiUrl}?${queryString}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      return response.json()
    })
    .then((data) => {
      console.log('Response data:', data)
    })
    .catch((error) => {
      console.error('Fetch error:', error)
    })
}

export const topHeadlines = async (country: string = 'jp'): Promise<any> => {
  const apiUrl = 'https://newsapi.org/v2/everything'
  const queryParams = {
    apiKey: process.env.REACT_APP_NEWS_API_KEY as string,
    country: country,
  }
  const queryString = new URLSearchParams(queryParams).toString()
  fetch(`${apiUrl}?${queryString}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      return response.json()
    })
    .then((data) => {
      console.log('Response data:', data)
    })
    .catch((error) => {
      console.error('Fetch error:', error)
    })
}
