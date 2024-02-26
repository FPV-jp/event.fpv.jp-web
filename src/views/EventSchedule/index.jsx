import EventForm, { EventFormInput } from '@/views/EventSchedule/EventForm'
import bootstrap5Plugin from '@fullcalendar/bootstrap5'
import { formatDate } from '@fullcalendar/core'
import jaLocale from '@fullcalendar/core/locales/ja'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.css'
import { useEffect, useRef, useState } from 'react'
import { INITIAL_EVENTS } from './event-utils'

function EventContent(eventInfo) {
  // console.log(eventInfo)
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
  const [listView, setListView] = useState(false)
  const [currentView, setCurrentView] = useState(false)

  const [currentEvents, setCurrentEvents] = useState([])

  function handleWeekendsToggle() {
    setWeekendsVisible(!weekendsVisible)
  }

  function handleEventClick(clickInfo) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }

  // function handleEvents(events) {
  //   setCurrentEvents(events)
  // }

  const [openEventForm, setOpenEventForm] = useState(false)
  const [calendarApi, setCalendarApi] = useState(false)
  const FullCalendarRef = useRef(null)
  useEffect(() => setCalendarApi(FullCalendarRef.current.calendar), [FullCalendarRef])
  // useEffect(() => {
  //   console.log(`今は${listView ? `リスト` : `タイム`}です currentView:${currentView}`)
  //   if (listView) {
  //     if (currentView === 'timeGridWeek') {
  //       calendarApi.changeView('listWeek')
  //       setCurrentView(calendarApi.view.type)
  //       console.log('変更します')
  //     } else {
  //       console.log('変更しません')
  //     }
  //   } else {
  //     if (currentView === 'listWeek') {
  //       calendarApi.changeView('timeGridWeek')
  //       setCurrentView(calendarApi.view.type)
  //       console.log('変更します')
  //     } else {
  //       console.log('変更しません')
  //     }
  //   }
  //   // setCurrentView(calendarApi.view.type)
  // }, [calendarApi, listView])

  // useEffect(() => console.log(calendarApi.currentClassNames), [FullCalendarRef])

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
    <>
      <EventForm openEventForm={openEventForm} setOpenEventForm={setOpenEventForm}>
        <EventFormInput setOpenEventForm={setOpenEventForm} />
      </EventForm>
      <FullCalendar
        ref={FullCalendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrap5Plugin, listPlugin]}
        themeSystem='bootstrap5'
        locales={[jaLocale]}
        locale='ja'
        // viewDidMount={(arg) => console.log(arg)}
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
          // listDay: {
          //   text: '本日のイベント',
          //   click: () => calendarApi.changeView('listDay'),
          // },
        }}
        headerToolbar={{
          left: 'prev,next dayGridYear,dayGridMonth today',
          center: 'title',
          // right: 'addEvent timeGridWeek,listWeek timeGridDay,listDay',
          right: 'addEvent timeGridWeek timeGridDay listView',
          // right: 'addEvent timeGridDay,listDay',
        }}
        initialView='dayGridMonth'
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
        eventsSet={(events) => setCurrentEvents(events)} // called after events are initialized/added/changed/removed
        /* you can update a remote database when these fire:
          eventAdd={function(){}}
          eventChange={function(){}}
          eventRemove={function(){}}
          */
      />
    </>
    // // <div className='text-sm flex h-full font-sans'>
    //   {/* <div className='event-schedule-sidebar w-72 rounded-lg leading-6'>
    //     <div className='event-schedule-sidebar-section'>
    //       <h2>Instructions</h2>
    //       <ul>
    //         <li>Select dates and you will be prompted to create a new event</li>
    //         <li>Drag, drop, and resize events</li>
    //         <li>Click an event to delete it</li>
    //       </ul>
    //     </div>
    //     <div className='event-schedule-sidebar-section'>
    //       <label>
    //         <input type='checkbox' checked={weekendsVisible} onChange={handleWeekendsToggle}></input>
    //         toggle weekends
    //       </label>
    //     </div>
    //     <div className='event-schedule-sidebar-section'>
    //       <h2>All Events ({currentEvents.length})</h2>
    //       <ul>{currentEvents.map(SidebarEvent)}</ul>
    //     </div>
    //   </div> */}
    //   // <div className='event-schedule-main flex-grow'>

    //   // </div>
    // {/* </div> */}
  )
}
