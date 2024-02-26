import Calendar from '@/views/EventSchedule/Calendar'
import EventForm, { EventFormInput } from '@/views/EventSchedule/EventForm'
import { formatDate } from '@fullcalendar/core'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.css'
import { useState } from 'react'
import './index.css'

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
    <div className='text-sm flex h-full font-sans'>
      {(currentView === 'listWeek' || currentView === 'timeGridDay' || currentView === 'listDay') && (
        <div className='event-schedule-sidebar w-72 rounded-lg leading-6'>
          <div className='event-schedule-sidebar-section'>
            <h2>Instructions</h2>
            <ul>
              <li>Select dates and you will be prompted to create a new event</li>
              <li>Drag, drop, and resize events</li>
              <li>Click an event to delete it</li>
            </ul>
          </div>
          <div className='event-schedule-sidebar-section'>
            <label>
              <input type='checkbox' checked={weekendsVisible} onChange={handleWeekendsToggle}></input>
              toggle weekends
            </label>
          </div>
          {/* <div className='event-schedule-sidebar-section'>
            <h2>All Events ({currentEvents.length})</h2>
            <ul>{currentEvents.map(SidebarEvent)}</ul>
          </div> */}
        </div>
      )}
      <EventForm openEventForm={openEventForm} setOpenEventForm={setOpenEventForm}>
        <EventFormInput setOpenEventForm={setOpenEventForm} />
      </EventForm>
      <div className='event-schedule-main flex-grow'>
        <Calendar //
          weekendsVisible={weekendsVisible}
          setOpenEventForm={setOpenEventForm}
          currentView={currentView}
          setCurrentView={setCurrentView}
        />
      </div>
    </div>
  )
}
