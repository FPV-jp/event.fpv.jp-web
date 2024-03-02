import InnerCalendar from '@/views/EventSchedule/InnerCalendar'
import { recombination } from '@/views/EventSchedule/InnerCalendarSupport'
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
  const [select, setSelect] = useState()

  function handleEventClick(clickInfo) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }

  const FullCalendarRef = useRef(null)
  useEffect(() => {
    setCurrentView(FullCalendarRef.current.calendar.view.type)
    setCalendarApi(FullCalendarRef.current.calendar)
  }, [FullCalendarRef, setCurrentView, setCalendarApi])

  // const innerCalendarRef = useRef(null)
  useEffect(() => {
    if (!calendarApi) return
    recombination(
      calendarApi.view.type,
      <InnerCalendar //
        // innerCalendarRef={innerCalendarRef}
        listView={listView}
        setListView={setListView}
        currentView={currentView}
        setCurrentView={setCurrentView}
        calendarApi={calendarApi}
        select={select}
      />,
    )
  }, [calendarApi, currentView, listView, select])
  // useEffect(() => {
  //   console.log(select)
  // }, [select])
  // useEffect(() => {
  //   console.log('currentView1:', currentView)
  //   // const { activeStart, activeEnd, calendar, currentStart, currentEnd } = calendarApi.view
  //   // setValue(select.start)
  //   // console.log('activeStart:', activeStart)
  //   // console.log('activeEnd:', activeEnd)
  //   // console.log('currentStart:', currentStart)
  //   // console.log('currentEnd:', currentEnd)
  //   // console.log('calendar:', calendar)
  // }, [currentView])
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

        prev: {
          text: '前へ',
          click: () => {
            calendarApi.prev()
            // setSelect({
            //   start: calendarApi.view.activeStart,
            //   end: calendarApi.view.activeEnd,
            // })
          },
        },
        next: {
          text: '次へ',
          click: () => {
            calendarApi.next()
            // setSelect({
            //   start: calendarApi.view.activeStart,
            //   end: calendarApi.view.activeEnd,
            // })
          },
        },
        timeGridWeek: {
          text: '週表示',
          click: () => {
            listView ? calendarApi.changeView('listWeek') : calendarApi.changeView('timeGridWeek')
            setCurrentView(calendarApi.view.type)
          },
        },
        timeGridDay: {
          text: '日表示',
          click: () => {
            listView ? calendarApi.changeView('listDay') : calendarApi.changeView('timeGridDay')
            setCurrentView(calendarApi.view.type)
          },
        },
      }}
      headerToolbar={{
        left: 'dayGridYear,dayGridMonth today',
        center: 'title',
        right: 'addEvent prev,next timeGridWeek timeGridDay',
      }}
      editable={true}
      selectable={true}
      selectMirror={true}
      select={(arg) => setSelect(arg)}
      dayMaxEvents={true}
      weekends={true}
      initialEvents={eventSchedules} // alternatively, use the `events` setting to fetch from a feed
      eventContent={EventContent} // custom render function
      eventClick={handleEventClick}
      // viewWillUnmount={(events) => console.log(events)}
      //eventsSet={(events) => console.log(events)} // called after events are initialized/added/changed/removed
      /* you can update a remote database when these fire:
        eventAdd={function(){}}
        eventChange={function(){}}
        eventRemove={function(){}}
      */
    />
  )
}
