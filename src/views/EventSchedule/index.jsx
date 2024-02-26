import Calendar from '@/views/EventSchedule/Calendar'
import EventForm, { EventFormInput } from '@/views/EventSchedule/EventForm'
import { formatDate } from '@fullcalendar/core'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.css'
import { useState } from 'react'

function SidebarEvent(event) {
  return (
    <li key={event.id}>
      <b>{formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
      <i>{event.title}</i>
    </li>
  )
}

export default function EventSchedule() {
  const [weekendsVisible, setWeekendsVisible] = useState(true)
  const [currentView, setCurrentView] = useState('dayGridMonth')
  // const [currentEvents, setCurrentEvents] = useState([])

  function handleWeekendsToggle() {
    setWeekendsVisible(!weekendsVisible)
  }

  const [openEventForm, setOpenEventForm] = useState(false)

  return (
    <div>
      <EventForm //
        openEventForm={openEventForm}
        setOpenEventForm={setOpenEventForm}
      >
        <EventFormInput setOpenEventForm={setOpenEventForm} />
      </EventForm>
      <Calendar //
        weekendsVisible={weekendsVisible}
        setOpenEventForm={setOpenEventForm}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />
    </div>
  )
}
