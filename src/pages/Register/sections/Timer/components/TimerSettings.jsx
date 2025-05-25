import { memo } from 'react'
import { useTimerContext } from '../context/TimerContext'
import ForTimeSettings from './settings/ForTimeSetting'
import AmrapSettings from './settings/AmrapSettings'
import EmomSettings from './settings/EmonSettings'
import TabataSettings from './settings/TabataSettings'
import CustomSettings from './settings/CustomSettings'

const TimerSettings = memo(() => {
  const {
    state: { selectedMode, settings },
    actions: { updateSettings }
  } = useTimerContext()

  const renderSettings = () => {
    switch (selectedMode) {
      case 'forTime':
        return (
          <ForTimeSettings
            settings={settings.forTime}
            onUpdate={updateSettings}
          />
        )
      case 'amrap':
        return (
          <AmrapSettings settings={settings.amrap} onUpdate={updateSettings} />
        )
      case 'emom':
        return (
          <EmomSettings settings={settings.emom} onUpdate={updateSettings} />
        )
      case 'tabata':
        return (
          <TabataSettings
            settings={settings.tabata}
            onUpdate={updateSettings}
          />
        )
      case 'custom':
        return (
          <CustomSettings
            settings={settings.custom}
            onUpdate={updateSettings}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className='timer-settings'>
      <h3>Configuración - {selectedMode?.toUpperCase()}</h3>
      <p className='mode-description'>{settings[selectedMode]?.description}</p>
      <div className='settings-content'>{renderSettings()}</div>
    </div>
  )
})

TimerSettings.displayName = 'TimerSettings'

export default TimerSettings
