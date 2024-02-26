import bootstrap5Plugin from '@fullcalendar/bootstrap5'
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
import { INITIAL_EVENTS } from './event-utils'
import './index.css'

function EventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

Calendar.propTypes = {
  weekendsVisible: PropTypes.bool.isRequired,
  setOpenEventForm: PropTypes.func.isRequired,
  currentView: PropTypes.string.isRequired,
  setCurrentView: PropTypes.func.isRequired,
}

export default function Calendar({ weekendsVisible, setOpenEventForm, currentView, setCurrentView }) {
  const [listView, setListView] = useState(false)

  function handleEventClick(clickInfo) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }

  // function handleEvents(events) {
  //   setCurrentEvents(events)
  // }

  const [calendarApi, setCalendarApi] = useState(false)
  const FullCalendarRef = useRef(null)
  useEffect(() => setCalendarApi(FullCalendarRef.current.calendar), [FullCalendarRef])

  // function handleDateSelect(selectInfo) {
  //   calendarApi.unselect() // clear date selection

  //   calendarApi.addEvent({
  //     id: 666666,
  //     title: 'xxxxxxx',
  //     start: selectInfo.startStr,
  //     end: selectInfo.endStr,
  //     allDay: selectInfo.allDay,
  //     backgroundColor: 'green',
  //   })
  // }

  return (
    <FullCalendar
      ref={FullCalendarRef}
      aspectRatio={1.618}
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrap5Plugin, listPlugin]}
      themeSystem='bootstrap5'
      locales={[jaLocale]}
      locale='ja'
      customButtons={{
        dayGridYear: {
          text: '年表示',
          click: () => calendarApi.changeView('dayGridYear'),
        },
        dayGridMonth: {
          text: '月表示',
          click: () => calendarApi.changeView('dayGridMonth'),
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
      weekends={weekendsVisible}
      initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
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
