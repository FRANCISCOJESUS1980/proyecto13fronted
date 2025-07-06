import { memo } from 'react'

const CustomTooltip = memo(({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className='cf-custom-tooltip'>
        <p className='cf-tooltip-date'>{payload[0]?.payload.fechaCompleta}</p>
        <p className='cf-tooltip-weight'>
          <span className='cf-tooltip-label'>Peso:</span>
          <span className='cf-tooltip-value'>{payload[0]?.value} kg</span>
        </p>
        {payload[1] && (
          <p className='cf-tooltip-reps'>
            <span className='cf-tooltip-label'>Repeticiones:</span>
            <span className='cf-tooltip-value'>{payload[1]?.value}</span>
          </p>
        )}
      </div>
    )
  }
  return null
})

CustomTooltip.displayName = 'CustomTooltip'

export default CustomTooltip
