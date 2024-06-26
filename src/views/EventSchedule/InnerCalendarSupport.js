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

  const attachCalendar = () => {
    const innerCalendar = document.createElement('div')
    innerCalendar.classList.add('innerCalendar')
    createRoot(innerCalendar).render(calendar)
    currentView === 'timeGridWeek' ? parent.insertBefore(innerCalendar, parent.firstChild) : parent.appendChild(innerCalendar)
  }

  if (parent && brother) {
    if (!$('div.innerCalendar')) {
      attachCalendar()
    } else {
      var index = Array.prototype.indexOf.call(parent.children, $('div.innerCalendar'))
      if (currentView === 'timeGridWeek' && index === 1) {
        $('div.innerCalendar').parentNode.removeChild($('div.innerCalendar'))
        attachCalendar()
      } else if (currentView === 'timeGridDay' && index === 0) {
        $('div.innerCalendar').parentNode.removeChild($('div.innerCalendar'))
        attachCalendar()
      }
    }

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

export const DayOfWee = (datetime, offset) => {
  datetime.setHours(0, 0, 0, 0)
  const firstDayOfWeek = new Date(datetime.setDate(datetime.getDate() - datetime.getDay()))
  const lastDayOfWeek = new Date(firstDayOfWeek)
  lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6 + offset)
  return {
    first: firstDayOfWeek,
    last: lastDayOfWeek,
  }
}
