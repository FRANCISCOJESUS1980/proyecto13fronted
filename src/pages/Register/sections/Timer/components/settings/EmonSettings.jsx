import { memo } from 'react'

const EmomSettings = memo(({ settings, onUpdate }) => {
  return (
    <div className='settings-grid'>
      <div className='setting-group'>
        <label>Intervalo (cada cuánto):</label>
        <div className='time-inputs'>
          <input
            type='number'
            min='0'
            max='59'
            value={settings.intervalMinutes}
            onChange={(e) =>
              onUpdate('emom', 'intervalMinutes', e.target.value)
            }
          />
          <span>min</span>
          <input
            type='number'
            min='0'
            max='59'
            value={settings.intervalSeconds}
            onChange={(e) =>
              onUpdate('emom', 'intervalSeconds', e.target.value)
            }
          />
          <span>seg</span>
        </div>
      </div>
      <div className='setting-group'>
        <label>Duración total:</label>
        <div className='time-inputs'>
          <input
            type='number'
            min='0'
            max='59'
            value={settings.totalMinutes}
            onChange={(e) => onUpdate('emom', 'totalMinutes', e.target.value)}
          />
          <span>min</span>
          <input
            type='number'
            min='0'
            max='59'
            value={settings.totalSeconds}
            onChange={(e) => onUpdate('emom', 'totalSeconds', e.target.value)}
          />
          <span>seg</span>
        </div>
      </div>
    </div>
  )
})

EmomSettings.displayName = 'EmomSettings'

export default EmomSettings
