import { gql } from '@apollo/client'

const EVENT_SCHEDULE_QUERY = gql`
  query EventScheduleQuery($id: ID!) {
    eventSchedule(id: $id) {
      id
      create_user
      event_title
      event_title
      event_color
      start_datetime
      end_datetime
      all_day
      registered_at
    }
  }
`

const ALL_EVENT_SCHEDULES_QUERY = gql`
  query AllEventScheduleQuery {
    allEventSchedules {
      id
      create_user
      event_title
      event_title
      event_color
      start_datetime
      end_datetime
      all_day
      registered_at
    }
  }
`

const CREATE_EVENT_SCHEDULE_MUTATION = gql`
  mutation CreateEventScheduleMutation($createEventScheduleInput: CreateEventScheduleInput!) {
    createEventSchedule(createEventScheduleInput: $createEventScheduleInput) {
      event_title
      event_title
      event_color
      start_datetime
      end_datetime
      all_day
    }
  }
`

const UPDATE_EVENT_SCHEDULE_MUTATION = gql`
  mutation UpdateEventScheduleMutation($eventSchedule: UpdateEventScheduleInput!) {
    updateEventSchedule(eventSchedule: $eventSchedule) {
      id
      create_user
      event_title
      event_title
      event_color
      start_datetime
      end_datetime
      all_day
      registered_at
    }
  }
`

const DELETE_EVENT_SCHEDULE_MUTATION = gql`
  mutation DeleteEventScheduleMutation($id: ID!) {
    deleteEventSchedule(id: $id) {
      id
      create_user
      event_title
      event_title
      event_color
      start_datetime
      end_datetime
      all_day
      registered_at
    }
  }
`

export { ALL_EVENT_SCHEDULES_QUERY, CREATE_EVENT_SCHEDULE_MUTATION, DELETE_EVENT_SCHEDULE_MUTATION, EVENT_SCHEDULE_QUERY, UPDATE_EVENT_SCHEDULE_MUTATION }
