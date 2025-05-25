import { memo } from 'react'
import TimeInputGroup from '../TimeinputGroup'

const CustomSettings = memo(({ settings, onUpdate }) => {
  return (
    <div className='settings-grid'>
      <TimeInputGroup
        label='Duración por ronda:'
        hours={settings.hours}
        minutes={settings.minutes}
        seconds={settings.seconds}
        onUpdate={(field, value) => onUpdate('custom', field, value)}
      />
      <div className='setting-group'>
        <label>Número de rondas:</label>
        <div className='time-inputs'>
          <input
            type='number'
            min='1'
            max='50'
            value={settings.rounds}
            onChange={(e) => onUpdate('custom', 'rounds', e.target.value)}
          />
          <span>rondas</span>
        </div>
      </div>
      <div className='setting-group'>
        <label>Descanso entre rondas:</label>
        <div className='time-inputs'>
          <input
            type='number'
            min='0'
            max='600'
            value={settings.restBetweenRounds}
            onChange={(e) =>
              onUpdate('custom', 'restBetweenRounds', e.target.value)
            }
          />
          <span>seg</span>
        </div>
      </div>
    </div>
  )
})

CustomSettings.displayName = 'CustomSettings'

export default CustomSettings
