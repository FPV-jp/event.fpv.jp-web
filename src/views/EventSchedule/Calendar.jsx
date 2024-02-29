import InnerCalendar from '@//views/EventSchedule/InnerCalendar'
import jaLocale from '@fullcalendar/core/locales/ja'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.css'
import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'

Calendar.propTypes = {
  setOpenEventForm: PropTypes.func.isRequired,
  currentView: PropTypes.string.isRequired,
  setCurrentView: PropTypes.func.isRequired,
  eventSchedules: PropTypes.array.isRequired,
}

function EventContent(eventInfo, createElement) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

export default function Calendar({ setOpenEventForm, currentView, setCurrentView, eventSchedules }) {
  const [listView, setListView] = useState(true)

  function handleEventClick(clickInfo) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }

  const [calendarApi, setCalendarApi] = useState(null)
  const FullCalendarRef = useRef(null)
  useEffect(() => setCalendarApi(FullCalendarRef.current.calendar), [FullCalendarRef])

  const $ = (query) => document.querySelector(query)

  const innerCalendarRef = useRef(null)
  useEffect(() => {
    let parent
    let brother

    if (currentView === 'timeGridDay' || currentView === 'timeGridWeek') {
      parent = $(`div.fc-${currentView}-view.fc-view.fc-timegrid`)
      brother = $('table.fc-scrollgrid.fc-scrollgrid-liquid')
    }

    if (currentView === 'listWeek' || currentView === 'listDay') {
      parent = $(`div.fc-${currentView}-view.fc-view.fc-list.fc-list-sticky`)
      brother = $('div.fc-scroller.fc-scroller-liquid')
    }

    if (parent && brother) {
      if ($('div.innerCalendar')) $('div.innerCalendar').parentNode.removeChild($('div.innerCalendar'))
      const innerCalendar = document.createElement('div')
      innerCalendar.classList.add('innerCalendar')
      createRoot(innerCalendar).render(
        <InnerCalendar //
          innerCalendarRef={innerCalendarRef}
          listView={listView}
          setListView={setListView}
          currentView={currentView}
          setCurrentView={setCurrentView}
          calendarApi={calendarApi}
        />,
      )
      currentView === 'timeGridWeek' ? parent.insertBefore(innerCalendar, parent.firstChild) : parent.appendChild(innerCalendar)

      if (currentView === 'timeGridWeek') {
        parent.classList.remove('flex')
        brother.classList.remove('flex-1')
        $('div.innerCalendar').classList.remove('flex-1')
      } else {
        parent.classList.add('flex')
        brother.classList.add('flex-1')
        $('div.innerCalendar').classList.add('flex-1')
      }
      return
    }
  }, [currentView, calendarApi, listView, setCurrentView])

  return (
    <FullCalendar
      ref={FullCalendarRef}
      aspectRatio={1.618}
      height={850}
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
      locales={[jaLocale]}
      locale='ja'
      customButtons={{
        dayGridYear: {
          text: '年表示',
          click: () => {
            calendarApi.changeView('dayGridYear')
            setCurrentView(calendarApi.view.type)
          },
        },
        dayGridMonth: {
          text: '月表示',
          click: () => {
            calendarApi.changeView('dayGridMonth')
            setCurrentView(calendarApi.view.type)
          },
        },
        today: {
          text: '今日を表示',
          click: () => calendarApi.today(),
        },
        addEvent: {
          text: 'イベントを追加',
          click: () => setOpenEventForm(true),
        },
        timeGridWeek: {
          text: '今週',
          click: () => {
            listView ? calendarApi.changeView('listWeek') : calendarApi.changeView('timeGridWeek')
            setCurrentView(calendarApi.view.type)
          },
        },
        timeGridDay: {
          text: '本日',
          click: () => {
            listView ? calendarApi.changeView('listDay') : calendarApi.changeView('timeGridDay')
            setCurrentView(calendarApi.view.type)
          },
        },
      }}
      headerToolbar={{
        left: 'dayGridYear,dayGridMonth prev,next today',
        center: 'title',
        right: 'addEvent timeGridWeek timeGridDay',
      }}
      initialView={currentView}
      editable={true}
      selectable={true}
      selectMirror={true}
      dayMaxEvents={true}
      weekends={true}
      initialEvents={eventSchedules.map((eventSchedule) =>
        eventSchedule.all_day
          ? {
              id: eventSchedule.id,
              title: eventSchedule.event_title,
              color: eventSchedule.event_color,
              start: new Date(eventSchedule.start_datetime).toISOString().replace(/T.*$/, ''),
            }
          : {
              id: eventSchedule.id,
              title: eventSchedule.event_title,
              color: eventSchedule.event_color,
              start: eventSchedule.start_datetime,
              end: eventSchedule.end_datetime,
            },
      )} // alternatively, use the `events` setting to fetch from a feed
      // select={handleDateSelect}
      // select={() => setOpenEventForm(true)}
      eventContent={EventContent} // custom render function
      eventClick={handleEventClick}
      //eventsSet={(events) => setCurrentEvents(events)} // called after events are initialized/added/changed/removed
      /* you can update a remote database when these fire:
      eventAdd={function(){}}
      eventChange={function(){}}
      eventRemove={function(){}}
      */
    />
  )
}
