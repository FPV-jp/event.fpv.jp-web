import { NavigateFunction } from 'react-router-dom'
import { GET } from 'utils/Http'

export const fetchData_dashboard = async (setData: Function, token: string, history: NavigateFunction) => {
  const response = await GET(token, '/api/dashboard')
  if (response.ok) {
    const data = await response.json()
    setData(data)
    console.log(data)
  } else {
    history('/auth/error-503')
  }
}

export const fetchData_calendar = async (setData: Function, token: string, history: NavigateFunction) => {
  const response = await GET(token, '/api/apps/calendar')
  if (response.ok) {
    const data = await response.json()
    setData(data)
    console.log(data)
  } else {
    history('/auth/error-503')
  }
}

export const fetchData_gallery = async (setData: Function, token: string, history: NavigateFunction) => {
  const response = await GET(token, '/api/apps/gallery')
  if (response.ok) {
    const data = await response.json()
    setData(data)
    console.log(data)
  } else {
    history('/auth/error-503')
  }
}

export const fetchData_task_list = async (setData: Function, token: string, history: NavigateFunction) => {
  const response = await GET(token, '/apps/todo/task_list')
  if (response.ok) {
    const data = await response.json()
    setData(data)
    console.log(data)
  } else {
    history('/auth/error-503')
  }
}

export const fetchData_gantt = async (setData: Function, token: string, history: NavigateFunction) => {
  const response = await GET(token, '/apps/todo/gantt')
  if (response.ok) {
    const data = await response.json()
    setData(data)
    console.log(data)
  } else {
    history('/auth/error-503')
  }
}
