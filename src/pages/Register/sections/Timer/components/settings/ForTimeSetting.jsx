import { memo } from 'react'
import TimeInputGroup from '../TimeinputGroup'

const ForTimeSettings = memo(({ settings, onUpdate }) => {
  return (
    <div className='settings-grid'>
      <TimeInputGroup
        label='Tiempo límite:'
        hours={settings.hours}
        minutes={settings.minutes}
        seconds={settings.seconds}
        onUpdate={(field, value) => onUpdate('forTime', field, value)}
      />
    </div>
  )
})

ForTimeSettings.displayName = 'ForTimeSettings'

export default ForTimeSettings
