import { memo } from 'react'

const TabataSettings = memo(({ settings, onUpdate }) => {
  return (
    <div className='settings-grid'>
      <div className='setting-group'>
        <label>Tiempo de trabajo:</label>
        <div className='time-inputs'>
          <input
            type='number'
            min='1'
            max='300'
            value={settings.workSeconds}
            onChange={(e) => onUpdate('tabata', 'workSeconds', e.target.value)}
          />
          <span>seg</span>
        </div>
      </div>
      <div className='setting-group'>
        <label>Tiempo de descanso:</label>
        <div className='time-inputs'>
          <input
            type='number'
            min='1'
            max='300'
            value={settings.restSeconds}
            onChange={(e) => onUpdate('tabata', 'restSeconds', e.target.value)}
          />
          <span>seg</span>
        </div>
      </div>
      <div className='setting-group'>
        <label>Rondas por ciclo:</label>
        <div className='time-inputs'>
          <input
            type='number'
            min='1'
            max='50'
            value={settings.rounds}
            onChange={(e) => onUpdate('tabata', 'rounds', e.target.value)}
          />
          <span>rondas</span>
        </div>
      </div>
      <div className='setting-group'>
        <label>Número de ciclos:</label>
        <div className='time-inputs'>
          <input
            type='number'
            min='1'
            max='10'
            value={settings.cycles}
            onChange={(e) => onUpdate('tabata', 'cycles', e.target.value)}
          />
          <span>ciclos</span>
        </div>
      </div>
      <div className='setting-group'>
        <label>Descanso entre ciclos:</label>
        <div className='time-inputs'>
          <input
            type='number'
            min='0'
            max='600'
            value={settings.restBetweenCycles}
            onChange={(e) =>
              onUpdate('tabata', 'restBetweenCycles', e.target.value)
            }
          />
          <span>seg</span>
        </div>
      </div>
    </div>
  )
})

TabataSettings.displayName = 'TabataSettings'

export default TabataSettings
