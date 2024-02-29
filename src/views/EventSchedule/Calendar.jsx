import InnerCalendar, { recombination } from '@//views/EventSchedule/InnerCalendar'
import jaLocale from '@fullcalendar/core/locales/ja'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'

Calendar.propTypes = {
  setOpenEventForm: PropTypes.func.isRequired,
  calendarApi: PropTypes.object,
  setCalendarApi: PropTypes.func.isRequired,
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

export default function Calendar({ setOpenEventForm, calendarApi, setCalendarApi, eventSchedules }) {
  const [listView, setListView] = useState(true)
  const [currentView, setCurrentView] = useState()

  function handleEventClick(clickInfo) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }

  const FullCalendarRef = useRef(null)
  useEffect(() => {
    setCurrentView(FullCalendarRef.current.calendar.type)
    setCalendarApi(FullCalendarRef.current.calendar)
  }, [FullCalendarRef, setCurrentView, setCalendarApi])

  const innerCalendarRef = useRef(null)
  useEffect(
    () =>
      recombination(
        currentView,
        <InnerCalendar //
          innerCalendarRef={innerCalendarRef}
          listView={listView}
          setListView={setListView}
          currentView={currentView}
          setCurrentView={setCurrentView}
          calendarApi={calendarApi}
        />,
      ),
    [currentView, calendarApi, listView, setCurrentView],
  )

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
      // initialView={currentView}
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
