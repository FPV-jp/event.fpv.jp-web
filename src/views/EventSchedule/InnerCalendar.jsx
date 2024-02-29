import jaLocale from '@fullcalendar/core/locales/ja'
import dayGridPlugin from '@fullcalendar/daygrid'
import FullCalendar from '@fullcalendar/react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.css'
import PropTypes from 'prop-types'

InnerCalendar.propTypes = {
  innerCalendarRef: PropTypes.object.isRequired,
  listView: PropTypes.bool,
  setListView: PropTypes.func.isRequired,
  currentView: PropTypes.string,
  setCurrentView: PropTypes.func.isRequired,
  calendarApi: PropTypes.object.isRequired,
}

export default function InnerCalendar({ innerCalendarRef, listView, setListView, currentView, setCurrentView, calendarApi }) {
  return (
    <>
      <div className='flex justify-end w-full'>
        <button
          type='button'
          onClick={() => {
            if (listView) {
              if (currentView === 'listWeek') calendarApi.changeView('timeGridWeek')
              if (currentView === 'listDay') calendarApi.changeView('timeGridDay')
            } else {
              if (currentView === 'timeGridWeek') calendarApi.changeView('listWeek')
              if (currentView === 'timeGridDay') calendarApi.changeView('listDay')
            }
            setListView(!listView)
            setCurrentView(calendarApi.view.type)
          }}
          aria-pressed='false'
          className='fc-timeGridDay-button fc-button fc-button-primary'
        >
          {listView ? 'タイムグリッド' : 'リスト'}
        </button>
      </div>
      {calendarApi.view.type !== 'timeGridWeek' && (
        <FullCalendar //
          ref={innerCalendarRef}
          plugins={[dayGridPlugin]}
          locales={[jaLocale]}
          locale='ja'
          headerToolbar={false}
          initialView='dayGridMonth'
          initialDate={new Date()}
        />
      )}
    </>
  )
}
