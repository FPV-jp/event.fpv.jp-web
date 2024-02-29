import { PaletteIcon, RestIcon } from '@/assets/svg'
import { classNames } from '@/utils'
import { FloatingArrow, arrow, autoUpdate, flip, offset, shift, useFloating, useTransitionStyles } from '@floating-ui/react'
import PropTypes from 'prop-types'
import { useRef, useState } from 'react'

const ARROW_WIDTH = 20
const ARROW_HEIGHT = 10

const COLORS = ['blue', 'orange', 'yellow', 'red', 'purple', 'amber', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose']

ColorPicker.propTypes = {
  color: PropTypes.string,
  setColor: PropTypes.func.isRequired,
}

export default function ColorPicker({ color, setColor }) {
  const [openColorPicker, setopenColorPicker] = useState(false)
  const arrowRef = useRef(null)

  const { refs, floatingStyles, context } = useFloating({
    placement: 'bottom-start',
    open: openColorPicker,
    onOpenChange: setopenColorPicker,
    middleware: [offset(ARROW_HEIGHT), flip({ padding: 5 }), shift({ padding: 5 }), arrow({ element: arrowRef })],
    whileElementsMounted: autoUpdate,
  })

  const { isMounted, styles } = useTransitionStyles(context, {
    initial: {
      transform: 'scale(0)',
    },
    common: ({ side }) => ({
      transformOrigin: {
        // bottom: `50px 50px`, // popup開始位置
      }[side],
    }),
  })

  function clickInputIcon() {
    if (color) setColor(null)
    setopenColorPicker(true)
  }

  return (
    <div className='relative w-full text-gray-700'>
      <input //
        ref={refs.setReference}
        type='text'
        name='event-color'
        value={color || ''}
        onChange={(e) => setColor(e.target.value)}
        onFocus={() => setopenColorPicker(true)}
        onBlur={() => setTimeout(() => setopenColorPicker(false), 300)}
        className='dark:bg-slate-800 dark:text-white/80 dark:border-slate-600 relative w-full rounded-lg border-gray-300 bg-white py-2.5 pl-4 pr-14 text-sm font-light tracking-wide placeholder-gray-400 transition-all duration-300 focus:border-blue-500 focus:ring focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-40'
        autoComplete='off'
        role='presentation'
      />
      <button type='button' onClick={() => clickInputIcon()} className='absolute right-0 h-full px-3 text-gray-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-40'>
        {color ? <RestIcon /> : <PaletteIcon />}
      </button>
      {isMounted && (
        <div ref={refs.setFloating} style={{ ...floatingStyles, zIndex: 9, padding: 6, borderRadius: 5, border: '1px solid #d1d5db', background: 'white' }}>
          <div style={styles}>
            <div className='max-h-64 overflow-y-auto w-full grid grid-cols-2 gap-2'>
              {COLORS.map((color, index) => (
                <div
                  key={index}
                  className={classNames(`bg-${color}-500`, 'h-6 px-8 text-xs font-medium rounded-md flex items-center justify-center text-white cursor-pointer')}
                  onClick={() => {
                    setColor(color)
                    setopenColorPicker(false)
                  }}
                >
                  {color}
                </div>
              ))}
            </div>
            <FloatingArrow //
              ref={arrowRef}
              context={context}
              width={ARROW_WIDTH}
              height={ARROW_HEIGHT}
              staticOffset={'10%'}
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
