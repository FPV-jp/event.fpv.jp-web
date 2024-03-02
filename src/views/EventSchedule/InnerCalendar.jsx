import PropTypes from 'prop-types'
import { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

InnerCalendar.propTypes = {
  // innerCalendarRef: PropTypes.object.isRequired,
  listView: PropTypes.bool,
  setListView: PropTypes.func.isRequired,
  currentView: PropTypes.string,
  setCurrentView: PropTypes.func.isRequired,
  calendarApi: PropTypes.object,
  select: PropTypes.object,
}

export default function InnerCalendar({
  //
  listView,
  setListView,
  currentView,
  setCurrentView,
  calendarApi,
  select,
}) {
  // const [innerCalendarApi, setInnerCalendarApi] = useState(null)

  // const [activeDate, setActiveDate] = useState({
  //   activeStart: null,
  //   activeEnd: null,
  //   reflection: true,
  // })

  // useEffect(() => {
  //   if (activeDate.reflection) return
  //   innerCalendarApi.select(activeDate.activeStart, activeDate.activeEnd)
  //   setActiveDate({ reflection: true })
  // }, [innerCalendarApi, activeDate])

  // useEffect(() => {
  //   setInnerCalendarApi(innerCalendarRef.current.calendar)
  //   if (select) {
  //     innerCalendarRef.current.calendar.gotoDate(select.start)
  //     if (calendarApi.view.type === 'listWeek') {
  //       const selectDayOfWee = DayOfWee(select.start, 1)
  //       innerCalendarRef.current.calendar.select(selectDayOfWee.first, selectDayOfWee.last)
  //     } else {
  //       innerCalendarRef.current.calendar.select(select.start, select.end)
  //     }
  //   }
  //   setActiveDate({ reflection: true })
  // }, [innerCalendarRef, calendarApi, select])
  //

  const [selectRange, setSelectRange] = useState(false)

  const [value, setValue] = useState(new Date())
  // useEffect(() => {
  //   // console.log('select:', select)
  //   // const { activeStart, activeEnd, calendar, currentStart, currentEnd } = calendarApi.view
  //   // setValue(select.start)
  //   // console.log('activeStart:', activeStart)
  //   // console.log('activeEnd:', activeEnd)
  //   // console.log('currentStart:', currentStart)
  //   // console.log('currentEnd:', currentEnd)
  //   // console.log('calendar:', calendar)
  // }, [select])

  // useEffect(() => {
  //   console.log('selectRange:', selectRange)
  //   // const { activeStart, activeEnd, calendar, currentStart, currentEnd } = calendarApi.view
  //   // setValue(select.start)
  //   // console.log('activeStart:', activeStart)
  //   // console.log('activeEnd:', activeEnd)
  //   // console.log('currentStart:', currentStart)
  //   // console.log('currentEnd:', currentEnd)
  //   // console.log('calendar:', calendar)
  // }, [selectRange])

  // useEffect(() => {
  //   console.log('currentView2:', currentView)
  //   // const { activeStart, activeEnd, calendar, currentStart, currentEnd } = calendarApi.view
  //   // setValue(select.start)
  //   // console.log('activeStart:', activeStart)
  //   // console.log('activeEnd:', activeEnd)
  //   // console.log('currentStart:', currentStart)
  //   // console.log('currentEnd:', currentEnd)
  //   // console.log('calendar:', calendar)
  // }, [currentView])
  // const thisDayOfWee = DayOfWee(new Date(), 0)
  // function highlightThisWeek(arg) {
  //   if (calendarApi.view.type === 'listDay' || calendarApi.view.type === 'timeGridDay') return
  //   if (arg.date >= thisDayOfWee.first && arg.date <= thisDayOfWee.last) {
  //     arg.el.classList.add('fc-day-today')
  //   }
  // }

  const onChange = (value, event) => {
    // calendarApi.gotoDate(value)
    setValue(value)
    console.log('value:', value)

    // const { activeStart, activeEnd, calendar, currentStart, currentEnd } = calendarApi.view
    // console.log('activeStart:', activeStart)
    // console.log('activeEnd:', activeEnd)
    // console.log('currentStart:', currentStart)
    // console.log('currentEnd:', currentEnd)
    // console.log('calendar:', calendar)
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
            setSelectRange(calendarApi.view.type === 'listWeek')
          }}
          aria-pressed='false'
          className='fc-timeGridDay-button fc-button fc-button-primary'
        >
          {listView ? 'タイムグリッド表示' : 'リスト表示'}
        </button>
      </div>
      {currentView !== 'timeGridWeek' && <Calendar onChange={onChange} selectRange={selectRange} value={value} />}
    </>
  )
}
