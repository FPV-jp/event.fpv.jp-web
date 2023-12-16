/* eslint-disable no-useless-concat */
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'assets/dist/css/FullCalendar.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import classNames from 'classnames'
import moment from 'moment'
import { createRef, useEffect, useState } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import { ChevronDown, ChevronUp } from 'react-feather'
import { connect, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toggleTopNav } from 'redux_/action/Theme'
import { fetchData_calendar } from 'utils/API'
import CalendarSidebar from './CalendarSidebar'
import CreateNewEvent from './CreateNewEvent'
import EventCalendar from './EventCalendar'
import EventsDrawer from './EventsDrawer'

const getToken = (state) => state.auth0Reducer.idToken

const Calendar = ({ topNavCollapsed, toggleTopNav }) => {
  let calendarRef = createRef()
  var curYear = moment().format('YYYY'),
    curMonth = moment().format('MM')

  const [showSidebar, setShowSidebar] = useState(true)
  const [showEventInfo, setShowEventInfo] = useState(false)
  const [createEvent, setCreateEvent] = useState(false)
  const [eventTitle, setEventTitle] = useState()
  const [targetEvent, setTargetEvent] = useState()
  const [date, setDate] = useState(curYear + '-' + curMonth + '-07')
  const [currentView, setCurrentView] = useState('month')

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi()
      if (calendarApi) {
        setDate(moment(calendarApi.getDate()))
      }
    }
  }, [setDate, calendarRef])

  const history = useNavigate()
  const token = useSelector(getToken)
  const [data, setData] = useState()
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchData_calendar(setData, token, history)
      setData(result)
    }
    fetchData()
  }, [token, history])

  //Function for date change
  const handleChange = (action) => {
    let calendarApi = calendarRef.current.getApi()
    if (calendarApi) {
      if (action === 'prev') {
        calendarApi.prev()
      } else if (action === 'next') {
        calendarApi.next()
      } else {
        calendarApi.today()
      }
      setDate(moment(calendarApi.getDate()))
    }
  }

  //Function for Calendar View Changes
  const handleView = (view) => {
    let calendarApi = calendarRef.current.getApi()
    if (calendarApi) {
      if (view === 'week') {
        calendarApi.changeView('timeGridWeek')
      } else if (view === 'day') {
        calendarApi.changeView('dayGridWeek')
      } else if (view === 'list') {
        calendarApi.changeView('listWeek')
      } else {
        calendarApi.changeView('dayGridMonth')
      }

      setDate(moment(calendarApi.getDate()))
      setCurrentView(view)
    }
  }

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 500)
  }

  return (
    <>
      <div className='hk-pg-body py-0'>
        <div className={classNames('calendarapp-wrap', { 'calendarapp-sidebar-toggle': !showSidebar })}>
          <CalendarSidebar showSidebar={showSidebar} toggleSidebar={() => setShowSidebar(!showSidebar)} createNewEvent={() => setCreateEvent(!createEvent)} />
          <div className='calendarapp-content'>
            <div id='calendar' className='w-100'>
              <header className='cd-header'>
                <div className='d-flex flex-1 justify-content-start'>
                  <Button variant='outline-light me-3' onClick={() => handleChange('today')}>
                    Today
                  </Button>
                  <Button variant='flush-dark' className='btn-icon btn-rounded flush-soft-hover' onClick={() => handleChange('prev')}>
                    <span className='icon'>
                      <FontAwesomeIcon icon={faChevronLeft} size='sm' />
                    </span>
                  </Button>
                  <Button variant='flush-dark' className='btn-icon btn-rounded flush-soft-hover' onClick={() => handleChange('next')}>
                    <span className='icon'>
                      <FontAwesomeIcon icon={faChevronRight} size='sm' />
                    </span>
                  </Button>
                </div>
                <div className='d-flex flex-1 justify-content-center'>
                  <h4 className='mb-0'>{moment(date).format('MMMM' + ' ' + 'YYYY')}</h4>
                </div>
                <div className='cd-options-wrap d-flex flex-1 justify-content-end'>
                  <ButtonGroup className='d-none d-md-flex'>
                    <Button variant='outline-light' onClick={() => handleView('month')} active={currentView === 'month'}>
                      month
                    </Button>
                    <Button variant='outline-light' onClick={() => handleView('week')} active={currentView === 'week'}>
                      week
                    </Button>
                    <Button variant='outline-light' onClick={() => handleView('day')} active={currentView === 'day'}>
                      day
                    </Button>
                    <Button variant='outline-light' onClick={() => handleView('list')} active={currentView === 'list'}>
                      list
                    </Button>
                  </ButtonGroup>
                  <Button as='a' variant='flush-dark' className='btn-icon btn-rounded flush-soft-hover hk-navbar-togglable' onClick={() => toggleTopNav(!topNavCollapsed)}>
                    <span className='icon'>
                      <span className='feather-icon'>{topNavCollapsed ? <ChevronDown /> : <ChevronUp />}</span>
                    </span>
                  </Button>
                </div>

                <div className={classNames('hk-sidebar-togglable', { active: !showSidebar })} onClick={toggleSidebar} />
              </header>

              <EventCalendar setShowEventInfo={setShowEventInfo} setEventTitle={setEventTitle} setTargetEvent={setTargetEvent} />
            </div>
          </div>
        </div>
      </div>

      {/* Event Info */}
      <EventsDrawer show={showEventInfo} info={eventTitle} event={targetEvent} onClose={() => setShowEventInfo(!showEventInfo)} />

      {/* New Event */}
      <CreateNewEvent calendarRef={calendarRef} show={createEvent} hide={() => setCreateEvent(!createEvent)} />
    </>
  )
}

const mapStateToProps = ({ theme }) => {
  const { topNavCollapsed } = theme
  return { topNavCollapsed }
}

export default connect(mapStateToProps, { toggleTopNav })(Calendar)
