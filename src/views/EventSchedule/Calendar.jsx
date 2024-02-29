import InnerCalendar from '@/views/EventSchedule/InnerCalendar'
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

  const [innerCalendarApi, setInnerCalendarApi] = useState(null)
  const innerCalendarRef = useRef(null)
  useEffect(() => {
    let parent
    let brother

    if (currentView === 'timeGridDay') {
      parent = document.querySelector('div.fc-timeGridDay-view.fc-view.fc-timegrid')
      brother = document.querySelector('table.fc-scrollgrid.fc-scrollgrid-liquid')
    }

    if (currentView === 'listWeek' || currentView === 'listDay') {
      parent = document.querySelector(`div.fc-${currentView}-view.fc-view.fc-list.fc-list-sticky`)
      brother = document.querySelector('div.fc-scroller.fc-scroller-liquid')
    }

    if (parent && brother) {
      parent.classList.add('flex')
      brother.classList.add('flex-1')
      parent.appendChild(innerCalendarRef.current)
      innerCalendarRef.current.classList.remove('hidden')

      calendarApi && calendarApi.updateSize()
      calendarApi && innerCalendarApi.updateSize()
      return
    }

    innerCalendarRef.current.classList.add('hidden')
    calendarApi && calendarApi.updateSize()
    calendarApi && innerCalendarApi.updateSize()
  }, [currentView, calendarApi, innerCalendarApi])

  return (
    <>
      <InnerCalendar innerCalendarRef={innerCalendarRef} setInnerCalendarApi={setInnerCalendarApi} />
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
          listView: {
            text: listView ? 'リスト' : 'タイム',
            click: () => {
              if (listView) {
                if (currentView === 'listWeek') calendarApi.changeView('timeGridWeek')
                if (currentView === 'listDay') calendarApi.changeView('timeGridDay')
              } else {
                if (currentView === 'timeGridWeek') calendarApi.changeView('listWeek')
                if (currentView === 'timeGridDay') calendarApi.changeView('listDay')
              }
              setListView(!listView)
              setCurrentView(calendarApi.view.type)
            },
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
          right: 'addEvent timeGridWeek timeGridDay listView',
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
    </>
  )
}
