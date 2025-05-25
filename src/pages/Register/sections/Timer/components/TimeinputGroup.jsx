import { memo } from 'react'

const TimeInputGroup = memo(({ label, hours, minutes, seconds, onUpdate }) => {
  return (
    <div className='setting-group'>
      <label>{label}</label>
      <div className='time-inputs'>
        <input
          type='number'
          min='0'
          max='23'
          value={hours}
          onChange={(e) => onUpdate('hours', e.target.value)}
        />
        <span>h</span>
        <input
          type='number'
          min='0'
          max='59'
          value={minutes}
          onChange={(e) => onUpdate('minutes', e.target.value)}
        />
        <span>min</span>
        <input
          type='number'
          min='0'
          max='59'
          value={seconds}
          onChange={(e) => onUpdate('seconds', e.target.value)}
        />
        <span>seg</span>
      </div>
    </div>
  )
})

TimeInputGroup.displayName = 'TimeInputGroup'

export default TimeInputGroup
