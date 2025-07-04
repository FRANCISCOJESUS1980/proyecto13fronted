import { MEDIDAS_OPTIONS } from '../constants/progressConstants.js'

const MeasureSelector = ({ selectedMedida, onMedidaChange }) => {
  return (
    <div className='cf-progreso-select-container'>
      <label htmlFor='medida-select'>Seleccionar medida:</label>
      <div className='cf-progreso-select-wrapper'>
        <select
          id='medida-select'
          value={selectedMedida}
          onChange={(e) => onMedidaChange(e.target.value)}
          className='cf-progreso-select'
        >
          {MEDIDAS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className='cf-progreso-select-arrow'></span>
      </div>
    </div>
  )
}

export default MeasureSelector
