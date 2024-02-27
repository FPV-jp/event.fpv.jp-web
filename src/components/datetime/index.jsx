import { FloatingArrow, arrow, autoUpdate, flip, offset, shift, useFloating, useTransitionStyles } from '@floating-ui/react'
import PropTypes from 'prop-types'
import { useRef, useState } from 'react'
import Datepicker from 'react-tailwindcss-datepicker'
import TimeKeeper from 'react-timekeeper'

const ARROW_WIDTH = 20
const ARROW_HEIGHT = 10

TimePicker.propTypes = {
  htmlFor: PropTypes.string.isRequired,
}

function TimePicker({ htmlFor }) {
  const [openTimePicker, setopenTimePicker] = useState(false)
  const arrowRef = useRef(null)

  const { refs, floatingStyles, context } = useFloating({
    placement: 'bottom-start',
    open: openTimePicker,
    onOpenChange: setopenTimePicker,
    middleware: [offset(ARROW_HEIGHT), flip({ padding: 5 }), shift({ padding: 5 }), arrow({ element: arrowRef })],
    whileElementsMounted: autoUpdate,
  })

  const { isMounted, styles } = useTransitionStyles(context, {
    initial: {
      transform: 'scale(0)',
    },
    // common: ({ side }) => ({
    //   transformOrigin: {
    //     bottom: `50px 50px`, // popup開始位置
    //   }[side],
    // }),
  })

  // function getCurrentTime() {
  //   const currentTime = new Date()
  //   let hours = currentTime.getHours()
  //   let minutes = currentTime.getMinutes()
  //   const ampm = hours >= 12 ? 'pm' : 'am'
  //   hours = hours % 12 || 12
  //   minutes = Math.ceil(minutes / 5) * 5
  //   if (minutes >= 60) {
  //     hours += 1
  //     minutes = 0
  //   }
  //   minutes = minutes < 10 ? '0' + minutes : minutes
  //   return `${hours}:${minutes}${ampm}`
  // }

  const [time, setTime] = useState(null)

  function clickInputIcon() {
    if (time) setTime(null)
    setopenTimePicker(true)
  }

  return (
    <div className='relative w-full text-gray-700'>
      <input //
        ref={refs.setReference}
        type='text'
        name={htmlFor}
        placeholder='HH:MM'
        value={time || ''}
        onChange={(e) => setTime(e.target.value)}
        onFocus={() => setopenTimePicker(true)}
        onBlur={() => setopenTimePicker(false)}
        className='dark:bg-slate-800 dark:text-white/80 dark:border-slate-600 relative w-full rounded-lg border-gray-300 bg-white py-2.5 pl-4 pr-14 text-sm font-light tracking-wide placeholder-gray-400 transition-all duration-300 focus:border-blue-500 focus:ring focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-40'
        autoComplete='off'
        role='presentation'
      />
      <button type='button' onClick={() => clickInputIcon()} className='absolute right-0 h-full px-3 text-gray-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-40'>
        {time ? (
          <svg className='h-5 w-5' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12'></path>
          </svg>
        ) : (
          <svg className='h-5 w-5' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z'></path>
          </svg>
        )}
      </button>
      {isMounted && (
        <div ref={refs.setFloating} style={{ ...floatingStyles, zIndex: 9999 }}>
          <div style={styles}>
            <TimeKeeper //
              // time={time}
              onChange={(newTime) => setTime(newTime.formatted24)}
              hour24Mode={true}
              forceCoarseMinutes={true}
              switchToMinuteOnHourSelect={true}
              closeOnMinuteSelect={true}
              onDoneClick={() => setopenTimePicker(false)}
            />
            <FloatingArrow //
              ref={arrowRef}
              context={context}
              width={ARROW_WIDTH}
              height={ARROW_HEIGHT}
              // tipRadius={10}
              staticOffset={'60%'}
              // fill='white'
            />
          </div>
        </div>
      )}
    </div>
  )
}

DatePicker.propTypes = {
  htmlFor: PropTypes.string.isRequired,
}

function DatePicker({ htmlFor }) {
  // function getCurrentDate() {
  //   const currentDate = new Date()
  //   const year = currentDate.getFullYear()
  //   const month = ('0' + (currentDate.getMonth() + 1)).slice(-2)
  //   const day = ('0' + currentDate.getDate()).slice(-2)
  //   return `${year}-${month}-${day}`
  // }

  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  })

  const handleValueChange = (newValue) => {
    console.log('newValue:', newValue)
    setValue(newValue)
  }

  return (
    <Datepicker //
      i18n={'ja'}
      useRange={false}
      asSingle={true}
      value={value}
      onChange={handleValueChange}
      inputName={htmlFor}
    />
  )
}

export default function DateTimePicker() {
  return (
    <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
      <div className='sm:col-span-3'>
        <label htmlFor='start-date' className='block text-sm font-medium leading-6 text-gray-900'>
          Start Date
        </label>
        <div className='mt-2'>
          <DatePicker htmlFor='start-date' />
        </div>
      </div>
      <div className='sm:col-span-3'>
        <label htmlFor='start-time' className='block text-sm font-medium leading-6 text-gray-900'>
          Start Time
        </label>
        <div className='mt-2'>
          <TimePicker htmlFor='start-time' />
        </div>
      </div>
      <div className='sm:col-span-3'>
        <label htmlFor='end-date' className='block text-sm font-medium leading-6 text-gray-900'>
          End Date
        </label>
        <div className='mt-2'>
          <DatePicker htmlFor='end-date' />
        </div>
      </div>
      <div className='sm:col-span-3'>
        <label htmlFor='end-time' className='block text-sm font-medium leading-6 text-gray-900'>
          End Time
        </label>
        <div className='mt-2'>
          <TimePicker htmlFor='end-time' />
        </div>
      </div>
    </div>
  )
}
