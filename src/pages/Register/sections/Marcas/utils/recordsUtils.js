export const processRecordData = (record) => ({
  _id: record._id,
  ejercicio: record.ejercicio || '',
  categoria: record.categoria || 'Sin categoría',
  peso: record.peso || 0,
  repeticiones: record.repeticiones || '1',
  fecha: record.fecha || new Date().toISOString()
})

export const processApiRecords = (data) => {
  return Array.isArray(data) ? data.map(processRecordData) : []
}

export const getCategoryClass = (category) => {
  const classes = {
    'Levantamiento Olímpico': 'category-olympic',
    'Levantamiento de Potencia': 'category-power',
    Gimnástico: 'category-gymnastic',
    Cardio: 'category-cardio',
    Otro: 'category-other'
  }
  return classes[category] || 'category-other'
}

export const groupRecordsByCategory = (records) => {
  return records.reduce((acc, record) => {
    const category = record.categoria || 'Sin categoría'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(record)
    return acc
  }, {})
}

export const formatDate = (dateString) => {
  const date = new Date(dateString)
  return `${date.getDate()}/${date.getMonth() + 1}/${date
    .getFullYear()
    .toString()
    .substr(-2)}`
}

export const validateFormData = (formData) => {
  const errors = {}

  if (!formData.ejercicio.trim()) {
    errors.ejercicio = 'El ejercicio es obligatorio'
  }

  if (!formData.peso.trim()) {
    errors.peso = 'El peso es obligatorio'
  } else if (isNaN(formData.peso) || Number.parseFloat(formData.peso) <= 0) {
    errors.peso = 'El peso debe ser un número positivo'
  }

  if (
    formData.repeticiones &&
    (isNaN(formData.repeticiones) ||
      Number.parseInt(formData.repeticiones) <= 0)
  ) {
    errors.repeticiones = 'Las repeticiones deben ser un número positivo'
  }

  if (!formData.fecha) {
    errors.fecha = 'La fecha es obligatoria'
  }

  return errors
}
