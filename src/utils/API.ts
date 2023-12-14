import { NavigateFunction } from 'react-router-dom'
import { GET } from 'utils/Http'

export const fetchData_dashboard = async (setData: Function, accessToken: string, history: NavigateFunction) => {
  const response = await GET(accessToken, '/api/dashboard')
  if (response.ok) {
    const data = await response.json()
    setData(data)
    console.log(data)
  } else {
    history('/auth/error-503')
  }
}

export const fetchData_calendar = async (setData: Function, accessToken: string, history: NavigateFunction) => {
  const response = await GET(accessToken, '/api/apps/calendar')
  if (response.ok) {
    const data = await response.json()
    setData(data)
    console.log(data)
  } else {
    history('/auth/error-503')
  }
}

export const fetchData_gallery = async (setData: Function, accessToken: string, history: NavigateFunction) => {
  const response = await GET(accessToken, '/api/apps/gallery')
  if (response.ok) {
    const data = await response.json()
    setData(data)
    console.log(data)
  } else {
    history('/auth/error-503')
  }
}
