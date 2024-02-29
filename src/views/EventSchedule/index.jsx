import { Loading } from '@/assets/Loading'
import { ALL_EVENT_SCHEDULES_QUERY } from '@/queries/EventSchedule'
import Calendar from '@/views/EventSchedule/Calendar'
import EventForm, { EventFormInput } from '@/views/EventSchedule/EventForm'
import { useQuery } from '@apollo/client'
import { useState } from 'react'

export default function EventSchedule() {
  const [currentView, setCurrentView] = useState('dayGridMonth')
  const [openEventForm, setOpenEventForm] = useState(false)

  const { loading, error, data, refetch } = useQuery(ALL_EVENT_SCHEDULES_QUERY)
  if (loading) return <Loading />
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <EventForm //
        openEventForm={openEventForm}
        setOpenEventForm={setOpenEventForm}
      >
        <EventFormInput setOpenEventForm={setOpenEventForm} />
      </EventForm>
      <Calendar //
        setOpenEventForm={setOpenEventForm}
        currentView={currentView}
        setCurrentView={setCurrentView}
        eventSchedules={data.allEventSchedules}
      />
    </div>
  )
}
