import ColorPicker from '@/components/color'
import TimePicker from '@/components/time'
import { CREATE_EVENT_SCHEDULE_MUTATION } from '@/queries/EventSchedule'
import { classNames } from '@/utils'
import { useMutation } from '@apollo/client'
import { Dialog, Transition } from '@headlessui/react'
import PropTypes from 'prop-types'
import { Fragment, useRef, useState } from 'react'
import Datepicker from 'react-tailwindcss-datepicker'

EventFormInput.propTypes = {
  setOpenEventForm: PropTypes.func.isRequired,
}

export function EventFormInput({ setOpenEventForm }) {
  const [color, setColor] = useState(null)

  const [startDate, setStartDate] = useState({
    startDate: null,
    endDate: null,
  })

  const [startTime, setStartTime] = useState(null)

  const [allDay, setAllDay] = useState(false)

  const [endDate, setEndDate] = useState({
    startDate: null,
    endDate: null,
  })

  const [endTime, setEndTime] = useState(null)

  function convertToDateObject(dateStr, timeStr) {
    const [year, month, day] = dateStr.split('-').map(Number)
    const [hour, minute] = timeStr.split(':').map(Number)
    return new Date(year, month - 1, day, hour, minute, 0, 0)
  }

  const [createEventSchedule] = useMutation(CREATE_EVENT_SCHEDULE_MUTATION)

  async function submit(event) {
    event.preventDefault()

    const formData = new FormData(event.target)

    const createEventScheduleInput = {
      event_title: formData.get('event-title'),
      event_color: formData.get('event-color'),
      all_day: formData.has('all-day'),
    }

    if (formData.has('all-day')) {
      createEventScheduleInput.start_datetime = convertToDateObject(formData.get('start-date'), '00:00').toISOString()
    } else {
      createEventScheduleInput.start_datetime = convertToDateObject(formData.get('start-date'), formData.get('start-time')).toISOString()
      createEventScheduleInput.end_datetime = convertToDateObject(formData.get('end-date'), formData.get('end-time')).toISOString()
    }
    console.log('createEventScheduleInput:', createEventScheduleInput)
    const response = await createEventSchedule({ variables: { createEventScheduleInput } })
    console.log('response:', response.data)
    setOpenEventForm(false)
    //   calendarApi.unselect() // clear date selection
    //   calendarApi.addEvent({
    //     id: 666666,
    //     title: 'xxxxxxx',
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay,
    //     backgroundColor: 'green',
    //   })
  }

  return (
    <form action='#' method='POST' onSubmit={submit} className='mx-5 max-w-xl py-10 sm:py-12'>
      <div>
        <div className='border-b border-gray-900/10 pb-12'>
          <h2 className='text-base font-semibold leading-7 text-gray-900'>新規イベント</h2>
          <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
            <div className='col-span-full'>
              <label htmlFor='event-title' className='block text-sm font-medium leading-6 text-gray-900'>
                タイトル
              </label>
              <div className='mt-2'>
                <input type='text' name='event-title' autoComplete='off' className='dark:bg-slate-800 dark:text-white/80 dark:border-slate-600 relative w-full rounded-lg border-gray-300 bg-white py-2.5 pl-4 pr-14 text-sm font-light tracking-wide placeholder-gray-400 transition-all duration-300 focus:border-blue-500 focus:ring focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-40' />
              </div>
            </div>
          </div>

          <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
            <div className='sm:col-span-3'>
              <label className='block text-sm font-medium leading-6 text-gray-900'>選択色</label>
              <div className={classNames(`bg-${color}-500`, 'h-10 px-8 text-xs font-medium rounded-md flex items-center justify-center text-white')}>{color}</div>
            </div>
            <div className='sm:col-span-3'>
              <label htmlFor='color' className='block text-sm font-medium leading-6 text-gray-900'>
                色を選択
              </label>
              <ColorPicker color={color} setColor={setColor} />
            </div>
          </div>

          <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
            <div className='sm:col-span-3'>
              <label htmlFor='start-date' className='block text-sm font-medium leading-6 text-gray-900'>
                イベント開始日
              </label>
              <div className='mt-2'>
                <Datepicker //
                  i18n={'ja'}
                  useRange={false}
                  asSingle={true}
                  value={startDate}
                  onChange={(newStartDate) => setStartDate(newStartDate)}
                  inputName={'start-date'}
                />
              </div>
            </div>

            <div className='sm:col-span-3'>
              <label htmlFor='start-time' className='block text-sm font-medium leading-6 text-gray-900'>
                イベント開始時間
              </label>
              <div className='mt-2'>
                <TimePicker htmlFor='start-time' disabled={allDay} time={startTime} setTime={setStartTime} />
              </div>
            </div>

            <div className='col-span-full'>
              <div className='relative flex gap-x-3'>
                <div className='flex h-6 items-center'>
                  <input onChange={(e) => setAllDay(e.target.checked)} name='all-day' type='checkbox' className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600' />
                </div>
                <div className='text-sm leading-6'>
                  <label htmlFor='all-day' className='font-medium text-gray-900'>
                    終日イベント
                  </label>
                </div>
              </div>
            </div>

            <div className='sm:col-span-3'>
              <label htmlFor='end-date' className={classNames(`text-gray-${allDay ? 300 : 900}`, 'block text-sm font-medium leading-6')}>
                イベント終了日
              </label>
              <div className='mt-2'>
                <Datepicker //
                  disabled={allDay}
                  i18n={'ja'}
                  useRange={false}
                  asSingle={true}
                  value={endDate}
                  onChange={(newEndDate) => setEndDate(newEndDate)}
                  inputName={'end-date'}
                />
              </div>
            </div>

            <div className='sm:col-span-3'>
              <label htmlFor='end-time' className={classNames(`text-gray-${allDay ? 300 : 900}`, 'block text-sm font-medium leading-6')}>
                イベント終了時間
              </label>
              <div className='mt-2'>
                <TimePicker htmlFor='end-time' disabled={allDay} time={endTime} setTime={setEndTime} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-6 flex items-center justify-end gap-x-6'>
        <button type='button' className='text-sm font-semibold leading-6 text-gray-900' onClick={() => setOpenEventForm(false)}>
          キャンセル
        </button>
        <button type='submit' className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
          登録
        </button>
      </div>
    </form>
  )
}

EventForm.propTypes = {
  children: PropTypes.node.isRequired,
  openEventForm: PropTypes.bool.isRequired,
  setOpenEventForm: PropTypes.func.isRequired,
}

export default function EventForm({ children, openEventForm, setOpenEventForm }) {
  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={openEventForm} as={Fragment}>
      <Dialog as='div' className='relative z-10' initialFocus={cancelButtonRef} onClose={setOpenEventForm}>
        <Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0' enterTo='opacity-100' leave='ease-in duration-200' leaveFrom='opacity-100' leaveTo='opacity-0'>
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95' enterTo='opacity-100 translate-y-0 sm:scale-100' leave='ease-in duration-200' leaveFrom='opacity-100 translate-y-0 sm:scale-100' leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
              <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>{children}</Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
