import { DayOfWee } from '@/views/EventSchedule/InnerCalendarSupport'
import jaLocale from '@fullcalendar/core/locales/ja'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

InnerCalendar.propTypes = {
  innerCalendarRef: PropTypes.object.isRequired,
  listView: PropTypes.bool,
  setListView: PropTypes.func.isRequired,
  setCurrentView: PropTypes.func.isRequired,
  calendarApi: PropTypes.object,
  select: PropTypes.object,
}

export default function InnerCalendar({ innerCalendarRef, listView, setListView, setCurrentView, calendarApi, select }) {
  const [innerCalendarApi, setInnerCalendarApi] = useState(null)

  const [activeDate, setActiveDate] = useState({
    activeStart: null,
    activeEnd: null,
    reflection: true,
  })

  useEffect(() => {
    if (activeDate.reflection) return
    innerCalendarApi.select(activeDate.activeStart, activeDate.activeEnd)
    setActiveDate({ reflection: true })
  }, [innerCalendarApi, activeDate])

  useEffect(() => {
    setInnerCalendarApi(innerCalendarRef.current.calendar)
    if (select) {
      innerCalendarRef.current.calendar.gotoDate(select.start)
      if (calendarApi.view.type === 'listWeek') {
        const selectDayOfWee = DayOfWee(select.start, 1)
        innerCalendarRef.current.calendar.select(selectDayOfWee.first, selectDayOfWee.last)
      } else {
        innerCalendarRef.current.calendar.select(select.start, select.end)
      }
    }
    setActiveDate({ reflection: true })
  }, [innerCalendarRef, calendarApi, select])

  const thisDayOfWee = DayOfWee(new Date(), 0)
  function highlightThisWeek(arg) {
    if (calendarApi.view.type === 'listDay' || calendarApi.view.type === 'timeGridDay') return
    if (arg.date >= thisDayOfWee.first && arg.date <= thisDayOfWee.last) {
      arg.el.classList.add('fc-day-today')
    }
  }

  return (
    <>
      <div className='flex justify-end w-full'>
        <button
          type='button'
          onClick={() => {
            if (listView) {
              if (calendarApi.view.type === 'listWeek') calendarApi.changeView('timeGridWeek')
              if (calendarApi.view.type === 'listDay') calendarApi.changeView('timeGridDay')
            } else {
              if (calendarApi.view.type === 'timeGridWeek') calendarApi.changeView('listWeek')
              if (calendarApi.view.type === 'timeGridDay') calendarApi.changeView('listDay')
            }
            setListView(!listView)
            setCurrentView(calendarApi.view.type)
          }}
          aria-pressed='false'
          className='fc-timeGridDay-button fc-button fc-button-primary'
        >
          {listView ? 'タイムグリッド表示' : 'リスト表示'}
        </button>
      </div>
      {calendarApi.view.type !== 'timeGridWeek' && (
        <FullCalendar //
          ref={innerCalendarRef}
          plugins={[dayGridPlugin, interactionPlugin]}
          locales={[jaLocale]}
          aspectRatio={0.618}
          height={460}
          locale='ja'
          headerToolbar={false}
          initialDate={new Date()}
          selectable={true}
          select={(arg) => {
            if (activeDate.reflection) {
              calendarApi.gotoDate(arg.start)
              setActiveDate({ activeStart: calendarApi.view.activeStart, activeEnd: calendarApi.view.activeEnd, reflection: false })
            }
          }}
          dayCellDidMount={highlightThisWeek}
        />
      )}
    </>
  )
}
