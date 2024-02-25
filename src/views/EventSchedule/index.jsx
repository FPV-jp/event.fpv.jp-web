import EventForm, { EventFormInput } from '@/views/EventSchedule/EventForm'
import bootstrap5Plugin from '@fullcalendar/bootstrap5'
import { formatDate } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.css'
import { useState } from 'react'
import { INITIAL_EVENTS } from './event-utils'
import './index.css'

function EventContent(eventInfo) {
  console.log(eventInfo)
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

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
  const [currentEvents, setCurrentEvents] = useState([])

  function handleWeekendsToggle() {
    setWeekendsVisible(!weekendsVisible)
  }

  // function handleDateSelect(selectInfo) {
  //   let title = prompt('Please enter a new title for your event')
  //   let calendarApi = selectInfo.view.calendar

  //   calendarApi.unselect() // clear date selection

  //   if (title) {
  //     calendarApi.addEvent({
  //       id: createEventId(),
  //       title,
  //       start: selectInfo.startStr,
  //       end: selectInfo.endStr,
  //       allDay: selectInfo.allDay,
  //       backgroundColor: 'green',
  //     })
  //   }
  // }

  function handleEventClick(clickInfo) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }

  function handleEvents(events) {
    setCurrentEvents(events)
  }

  const [openEventForm, setOpenEventForm] = useState(false)

  return (
    <div className='text-sm flex h-full font-sans'>
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
        <div className='event-schedule-sidebar-section'>
          <h2>All Events ({currentEvents.length})</h2>
          <ul>{currentEvents.map(SidebarEvent)}</ul>
        </div>
      </div>
      <div className='event-schedule-main flex-grow'>
        <EventForm openEventForm={openEventForm} setOpenEventForm={setOpenEventForm}>
          <EventFormInput setOpenEventForm={setOpenEventForm} />
        </EventForm>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrap5Plugin]}
          themeSystem='bootstrap5'
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          initialView='dayGridMonth'
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
          // select={handleDateSelect}
          select={() => setOpenEventForm(true)}
          eventContent={EventContent} // custom render function
          eventClick={handleEventClick}
          eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          /* you can update a remote database when these fire:
          eventAdd={function(){}}
          eventChange={function(){}}
          eventRemove={function(){}}
          */
        />
      </div>
    </div>
  )
}
