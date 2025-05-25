import { memo } from 'react'
import { timerModes } from '../data/timerModes'

const ModeSelection = memo(({ onSelectMode }) => {
  return (
    <div className='mode-selection'>
      <h2>Selecciona el tipo de WOD</h2>
      <div className='mode-grid'>
        {timerModes.map((mode) => (
          <button
            key={mode.id}
            className='mode-button'
            onClick={() => onSelectMode(mode.id)}
          >
            <h3>{mode.title}</h3>
            <p>{mode.description}</p>
            <span className='mode-example'>{mode.example}</span>
          </button>
        ))}
      </div>
    </div>
  )
})

ModeSelection.displayName = 'ModeSelection'

export default ModeSelection
