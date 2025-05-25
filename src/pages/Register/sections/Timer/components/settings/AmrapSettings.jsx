import { memo } from 'react'
import TimeInputGroup from '../TimeinputGroup'

const AmrapSettings = memo(({ settings, onUpdate }) => {
  return (
    <div className='settings-grid'>
      <TimeInputGroup
        label='Duración total:'
        hours={settings.hours}
        minutes={settings.minutes}
        seconds={settings.seconds}
        onUpdate={(field, value) => onUpdate('amrap', field, value)}
      />
    </div>
  )
})

AmrapSettings.displayName = 'AmrapSettings'

export default AmrapSettings
