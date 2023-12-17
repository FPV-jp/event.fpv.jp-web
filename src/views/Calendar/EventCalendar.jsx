/* eslint-disable no-useless-concat */
import FullCalendar from '@fullcalendar/react'

import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import timeGridPlugin from '@fullcalendar/timegrid'

import { useWindowHeight } from '@react-hook/window-size'
import 'assets/dist/css/FullCalendar.css'

const EventCalendar = ({ CalendarEvents, calendarRef, date, setShowEventInfo, setEventTitle, setTargetEvent }) => {
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
