const RETRY_COUNT = 1
const RETRY_INTERVAL = 1500

export const GET = async (path: string): Promise<Response> => {
  return retry(RETRY_COUNT, path, 'GET')
}

export const POST = async (path: string, body: object) => {
  return retry(RETRY_COUNT, path, 'POST', JSON.stringify(body))
}

export const PUT = async (path: string, body: object) => {
  return retry(RETRY_COUNT, path, 'PUT', JSON.stringify(body))
}

export const DELETE = async (path: string) => {
  return retry(RETRY_COUNT, path, 'DELETE')
}

const header = async (): Promise<HeadersInit> => {
  return {
    'Content-Type': 'application/json',
  }
}

function delay(time: number) {
  console.warn(`retry again after ${time}ms`)
  return new Promise((resolve) => setTimeout(resolve, time))
}

const retry = async (count: number, path: string, method: string, body?: BodyInit | null): Promise<Response> => {
  try {
    const url: URL = new URL(window.location.protocol + '//' + window.location.host.split(':')[0] + path)
    const request: RequestInit = { method: method, headers: await header(), body: body }
    return await fetch(url, request).then((response) => {
      if (!response.ok) throw response
      return response
    })
  } catch (err: any) {
    if (count === 1) return err
    await delay(RETRY_INTERVAL)
    return await retry(count - 1, path, method, body)
  }
}
