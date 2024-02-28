import Calendar from '@/views/EventSchedule/Calendar'
import EventForm, { EventFormInput } from '@/views/EventSchedule/EventForm'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.css'
import { useState } from 'react'

export default function EventSchedule() {
  const [currentView, setCurrentView] = useState('dayGridMonth')
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
        setOpenEventForm={setOpenEventForm}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />
    </div>
  )
}
