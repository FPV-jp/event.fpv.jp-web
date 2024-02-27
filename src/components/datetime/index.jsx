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
          <svg className='h-5 w-5' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 368 368' strokeWidth='7.5' stroke='currentColor'>
            <path d='M184,60c4.4,0,8-3.6,8-8v-4c0-4.4-3.6-8-8-8c-4.4,0-8,3.6-8,8v4C176,56.4,179.6,60,184,60z' transform='matrix(1, 0, 0, 1, 0, -3.552713678800501e-15)' />
            <path d='M184,308c-4.4,0-8,3.6-8,8v4c0,4.4,3.6,8,8,8c4.4,0,8-3.6,8-8v-4C192,311.6,188.4,308,184,308z' transform='matrix(1, 0, 0, 1, 0, -3.552713678800501e-15)' />
            <path d='M52,176h-4c-4.4,0-8,3.6-8,8c0,4.4,3.6,8,8,8h4c4.4,0,8-3.6,8-8C60,179.6,56.4,176,52,176z' transform='matrix(1, 0, 0, 1, 0, -3.552713678800501e-15)' />
            <path d='M320,176h-4c-4.4,0-8,3.6-8,8c0,4.4,3.6,8,8,8h4c4.4,0,8-3.6,8-8C328,179.6,324.4,176,320,176z' transform='matrix(1, 0, 0, 1, 0, -3.552713678800501e-15)' />
            <path d='M93.6,82.4c-3.2-3.2-8-3.2-11.2,0c-3.2,3.2-3.2,8,0,11.2l2.8,2.8c1.6,1.6,3.6,2.4,5.6,2.4s4-0.8,5.6-2.4c3.2-3.2,3.2-8,0-11.2L93.6,82.4z' transform='matrix(1, 0, 0, 1, 0, -3.552713678800501e-15)' />
            <path d='M85.2,271.6l-2.8,2.8c-3.2,3.2-3.2,8,0,11.2C84,287.2,86,288,88,288s4-0.8,5.6-2.4l2.8-2.8c3.2-3.2,3.2-8,0-11.2S88.4,268.4,85.2,271.6z' transform='matrix(1, 0, 0, 1, 0, -3.552713678800501e-15)' />
            <path d='M274.4,82.4l-2.8,2.8c-3.2,3.2-3.2,8,0,11.2c1.6,1.6,3.6,2.4,5.6,2.4s4-0.8,5.6-2.4l2.8-2.8c3.2-3.2,3.2-8,0-11.2C282.4,79.2,277.6,79.2,274.4,82.4z' transform='matrix(1, 0, 0, 1, 0, -3.552713678800501e-15)' />
            <path d='M192,180.8V108c0-4.4-3.6-8-8-8c-4.4,0-8,3.6-8,8v76c0,2,0.8,4,2.4,5.6l87.6,87.6c1.6,1.6,3.6,2.4,5.6,2.4s4-0.8,5.6-2.4c3.2-3.2,3.2-8,0-11.2L192,180.8z' transform='matrix(1, 0, 0, 1, 0, -3.552713678800501e-15)' />
            <path d='M184,0C82.4,0,0,82.4,0,184s82.4,184,184,184s184-82.4,184-184S285.6,0,184,0z M184,352c-92.8,0-168-75.2-168-168S91.2,16,184,16s168,75.2,168,168S276.8,352,184,352z' transform='matrix(1, 0, 0, 1, 0, -3.552713678800501e-15)' />
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
              fill='white'
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
