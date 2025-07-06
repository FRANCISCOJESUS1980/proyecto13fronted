import { memo } from 'react'
import PropTypes from 'prop-types'
import { CATEGORIAS } from '../constants/personalRecordsConstants.js'

const CategoryField = memo(({ value, onChange }) => {
  const getCategoryIcon = (categoria) => {
    switch (categoria) {
      case 'Levantamiento Olímpico':
        return <span className='cf-pr-category-icon cf-pr-olympic-icon'></span>
      case 'Levantamiento de Potencia':
        return (
          <span className='cf-pr-category-icon cf-pr-powerlifting-icon'></span>
        )
      case 'Gimnástico':
        return (
          <span className='cf-pr-category-icon cf-pr-gymnastic-icon'></span>
        )
      case 'Cardio':
        return <span className='cf-pr-category-icon cf-pr-cardio-icon'></span>
      default:
        return <span className='cf-pr-category-icon cf-pr-other-icon'></span>
    }
  }

  return (
    <div className='cf-pr-form-group'>
      <label htmlFor='categoria' className='cf-pr-label'>
        <span className='cf-pr-label-icon cf-pr-category-label-icon'></span>
        Categoría
      </label>
      <div className='cf-pr-select-wrapper'>
        <select
          id='categoria'
          name='categoria'
          value={value}
          onChange={(e) => onChange('categoria', e.target.value)}
          className='cf-pr-select'
        >
          {CATEGORIAS.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
        <span className='cf-pr-select-arrow'></span>
      </div>
      <div className='cf-pr-category-preview'>
        {getCategoryIcon(value)}
        <span className='cf-pr-category-name'>{value}</span>
      </div>
    </div>
  )
})

CategoryField.displayName = 'CategoryField'

CategoryField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default CategoryField
