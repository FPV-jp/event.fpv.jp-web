/* eslint-disable no-useless-concat */
import FullCalendar from '@fullcalendar/react'

import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useWindowHeight } from '@react-hook/window-size'
import 'assets/dist/css/FullCalendar.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchData_calendar } from 'utils/API'
import { CalendarEvents } from './Events'

const getToken = (state) => state.auth0Reducer.idToken

const EventCalendar = ({ calendarRef, date, setShowEventInfo, setEventTitle, setTargetEvent }) => {
  const history = useNavigate()
  const token = useSelector(getToken)
  const [data, setData] = useState()
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchData_calendar(setData, token, history)
      setData(result)
    }
    fetchData()
  }, [token, history])

  const Calender_height = useWindowHeight()

  return (
    <FullCalendar
      ref={calendarRef}
      plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
      initialView='dayGridMonth'
      initialDate={date}
      headerToolbar={false}
      themeSystem='bootstrap'
      height={Calender_height - 130}
      windowResizeDelay={500}
      droppable={true}
      editable={true}
      events={CalendarEvents}
      eventContent={function (arg) {
        if (arg.event.extendedProps.toHtml) {
          return { html: arg.event.title }
        }
      }}
      eventClick={function (info) {
        setTargetEvent(info.event)
        setEventTitle(info.event._def.title)
        setShowEventInfo(true)
      }}
    />
  )
}

export default EventCalendar
