import jaLocale from '@fullcalendar/core/locales/ja'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import PropTypes from 'prop-types'
import { createRoot } from 'react-dom/client'

recombination.propTypes = {
  currentView: PropTypes.string,
  calendar: PropTypes.node.isRequired,
}

export function recombination(currentView, calendar) {
  const $ = (query) => document.querySelector(query)

  let parent
  let brother

  if (currentView === 'timeGridDay' || currentView === 'timeGridWeek') {
    parent = $(`div.fc-${currentView}-view.fc-view.fc-timegrid`)
    brother = $('table.fc-scrollgrid.fc-scrollgrid-liquid')
  }

  if (currentView === 'listWeek' || currentView === 'listDay') {
    parent = $(`div.fc-${currentView}-view.fc-view.fc-list.fc-list-sticky`)
    brother = $('div.fc-scroller.fc-scroller-liquid')
  }

  if (parent && brother) {
    if ($('div.innerCalendar')) $('div.innerCalendar').parentNode.removeChild($('div.innerCalendar'))
    const innerCalendar = document.createElement('div')
    innerCalendar.classList.add('innerCalendar')
    createRoot(innerCalendar).render(calendar)
    currentView === 'timeGridWeek' ? parent.insertBefore(innerCalendar, parent.firstChild) : parent.appendChild(innerCalendar)

    if (currentView === 'timeGridWeek') {
      parent.classList.remove('flex')
      brother.classList.remove('flex-1')
      $('div.innerCalendar').classList.remove('flex-1')
    } else {
      parent.classList.add('flex')
      brother.classList.add('flex-1')
      $('div.innerCalendar').classList.add('flex-1')
    }
    return
  }
}

InnerCalendar.propTypes = {
  innerCalendarRef: PropTypes.object.isRequired,
  listView: PropTypes.bool,
  setListView: PropTypes.func.isRequired,
  setCurrentView: PropTypes.func.isRequired,
  calendarApi: PropTypes.object,
}

export default function InnerCalendar({ innerCalendarRef, listView, setListView, setCurrentView, calendarApi }) {
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
          locale='ja'
          headerToolbar={false}
          initialDate={new Date()}
          selectable={true}
          select={(arg) => calendarApi.gotoDate(new Date(arg.start))}
        />
      )}
    </>
  )
}
