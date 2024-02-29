import jaLocale from '@fullcalendar/core/locales/ja'
import dayGridPlugin from '@fullcalendar/daygrid'
import FullCalendar from '@fullcalendar/react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.css'
import PropTypes from 'prop-types'

InnerCalendar.propTypes = {
  innerCalendarRef: PropTypes.object.isRequired,
}

export default function InnerCalendar({ innerCalendarRef }) {
  // useEffect(() => setInnerCalendarApi(FullCalendarRef.current.calendar), [])

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
    <FullCalendar //
      ref={innerCalendarRef}
      plugins={[dayGridPlugin]}
      locales={[jaLocale]}
      locale='ja'
      headerToolbar={false}
      // dayCellDidMount={highlightThisWeek}
      initialView='dayGridMonth'
      initialDate={new Date()}
    />
  )
}
