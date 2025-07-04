const ObjetivosFormFields = ({ formData, onChange }) => {
  const getUnidad = (medida) => {
    const unidades = {
      peso: 'kg',
      grasa: '%',
      musculo: '%',
      default: 'cm'
    }
    return unidades[medida] || unidades.default
  }

  const medidasOptions = [
    { value: 'peso', label: 'Peso' },
    { value: 'grasa', label: '% Grasa' },
    { value: 'musculo', label: '% Músculo' },
    { value: 'pecho', label: 'Pecho' },
    { value: 'cintura', label: 'Cintura' },
    { value: 'cadera', label: 'Cadera' },
    { value: 'biceps', label: 'Bíceps' },
    { value: 'muslos', label: 'Muslos' }
  ]

  const tiposOptions = [
    { value: 'peso', label: 'Cambio de Peso' },
    { value: 'grasa', label: 'Reducción de Grasa' },
    { value: 'musculo', label: 'Aumento Muscular' },
    { value: 'medida', label: 'Cambio de Medida' }
  ]

  return (
    <>
      <div className='cf-objetivos-form-row'>
        <div className='cf-objetivos-form-group'>
          <label htmlFor='medida'>
            <span className='cf-objetivos-label-icon cf-objetivos-medida-label-icon'></span>
            Medida
          </label>
          <div className='cf-objetivos-select-wrapper'>
            <select
              id='medida'
              name='medida'
              value={formData.medida}
              onChange={onChange}
              required
              className='cf-objetivos-select'
            >
              {medidasOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <span className='cf-objetivos-select-arrow'></span>
          </div>
        </div>

        <div className='cf-objetivos-form-group'>
          <label htmlFor='tipo'>
            <span className='cf-objetivos-label-icon cf-objetivos-tipo-label-icon'></span>
            Tipo de Objetivo
          </label>
          <div className='cf-objetivos-select-wrapper'>
            <select
              id='tipo'
              name='tipo'
              value={formData.tipo}
              onChange={onChange}
              required
              className='cf-objetivos-select'
            >
              {tiposOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <span className='cf-objetivos-select-arrow'></span>
          </div>
        </div>
      </div>

      <div className='cf-objetivos-form-row'>
        <div className='cf-objetivos-form-group'>
          <label htmlFor='valorObjetivo'>
            <span className='cf-objetivos-label-icon cf-objetivos-valor-label-icon'></span>
            Valor Objetivo
          </label>
          <div className='cf-objetivos-input-wrapper'>
            <input
              type='number'
              id='valorObjetivo'
              name='valorObjetivo'
              value={formData.valorObjetivo}
              onChange={onChange}
              placeholder={`Ej: 70 ${getUnidad(formData.medida)}`}
              required
              step='0.1'
              className='cf-objetivos-input'
            />
            <span className='cf-objetivos-input-unit'>
              {getUnidad(formData.medida)}
            </span>
          </div>
        </div>

        <div className='cf-objetivos-form-group'>
          <label htmlFor='fechaObjetivo'>
            <span className='cf-objetivos-label-icon cf-objetivos-fecha-label-icon'></span>
            Fecha Objetivo
          </label>
          <input
            type='date'
            id='fechaObjetivo'
            name='fechaObjetivo'
            value={formData.fechaObjetivo}
            onChange={onChange}
            required
            min={new Date().toISOString().split('T')[0]}
            className='cf-objetivos-input cf-objetivos-date-input'
          />
        </div>
      </div>
    </>
  )
}

export default ObjetivosFormFields
