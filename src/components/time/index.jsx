import { ClockIcon, RestIcon } from '@/assets/svg'
import { FloatingArrow, arrow, autoUpdate, flip, offset, shift, useFloating, useTransitionStyles } from '@floating-ui/react'
import PropTypes from 'prop-types'
import { useRef, useState } from 'react'
import TimeKeeper from 'react-timekeeper'

const ARROW_WIDTH = 20
const ARROW_HEIGHT = 10

TimePicker.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  time: PropTypes.string,
  setTime: PropTypes.func.isRequired,
}

export default function TimePicker({ htmlFor, disabled, time, setTime }) {
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
  })

  function clickInputIcon() {
    if (time) setTime(null)
    setopenTimePicker(true)
  }

  return (
    <div className='relative w-full text-gray-700'>
      <input //
        ref={refs.setReference}
        disabled={disabled}
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
      <button disabled={disabled} type='button' onClick={() => clickInputIcon()} className='absolute right-0 h-full px-3 text-gray-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-40'>
        {time ? <RestIcon /> : <ClockIcon />}
      </button>
      {isMounted && (
        <div ref={refs.setFloating} style={{ ...floatingStyles, zIndex: 9, borderRadius: 5, border: '1px solid #d1d5db' }}>
          <div style={{ ...styles, borderRadius: 5 }}>
            <TimeKeeper //
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
              stroke='#d1d5db'
              strokeWidth={1}
              fill='white'
            />
          </div>
        </div>
      )}
    </div>
  )
}
