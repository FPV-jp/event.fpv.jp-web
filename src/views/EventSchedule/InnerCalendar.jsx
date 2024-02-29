import bootstrap5Plugin from '@fullcalendar/bootstrap5'
import jaLocale from '@fullcalendar/core/locales/ja'
import dayGridPlugin from '@fullcalendar/daygrid'
import FullCalendar from '@fullcalendar/react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.css'
import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react'

InnerCalendar.propTypes = {
  innerCalendarRef: PropTypes.object.isRequired,
  setInnerCalendarApi: PropTypes.func.isRequired,
}

export default function InnerCalendar({ innerCalendarRef, setInnerCalendarApi }) {
  const FullCalendarRef = useRef(null)
  useEffect(() => setInnerCalendarApi(FullCalendarRef.current.calendar), [FullCalendarRef, setInnerCalendarApi])

  //   const now = new Date()
  //   now.setHours(0, 0, 0, 0)
  //   const firstDayOfWeek = new Date(now.setDate(now.getDate() - now.getDay()))

  //   const lastDayOfWeek = new Date(firstDayOfWeek)
  //   lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6)

  //   function highlightThisWeek(arg) {
  //     if (arg.date >= firstDayOfWeek && arg.date <= lastDayOfWeek) {
  //       arg.el.classList.add('fc-day-today')
  //     }
  //   }

  return (
    <div ref={innerCalendarRef} className='hidden flex-1'>
      <FullCalendar //
        ref={FullCalendarRef}
        plugins={[dayGridPlugin, bootstrap5Plugin]}
        themeSystem='bootstrap5'
        locales={[jaLocale]}
        locale='ja'
        headerToolbar={false}
        // dayCellDidMount={highlightThisWeek}
        initialView='dayGridMonth'
        initialDate={new Date()}
      />
    </div>
  )
}
