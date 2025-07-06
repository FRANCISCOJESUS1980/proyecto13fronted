export const prepareChartData = (records, selectedExercise) => {
  if (!selectedExercise) return []

  const filteredRecords = records
    .filter((record) => record.ejercicio === selectedExercise)
    .map((record) => ({
      ...record,
      dateObj: new Date(record.fecha),
      peso: Number.parseFloat(record.peso),
      repeticiones: Number.parseInt(record.repeticiones || '1')
    }))
    .sort((a, b) => a.dateObj - b.dateObj)

  return filteredRecords.map((record) => ({
    _id: record._id,
    fecha: formatDate(record.fecha),
    fechaCompleta: new Date(record.fecha).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }),
    peso: record.peso,
    repeticiones: record.repeticiones
  }))
}

export const calculateChartStats = (chartData) => {
  if (chartData.length === 0) {
    return {
      maxWeight: 100,
      maxReps: 10,
      avgWeight: 0,
      progressPercentage: null
    }
  }

  const maxWeight = Math.ceil(
    Math.max(...chartData.map((item) => item.peso)) * 1.1
  )
  const maxReps = Math.ceil(
    Math.max(...chartData.map((item) => item.repeticiones)) * 1.2
  )
  const avgWeight =
    Math.round(
      (chartData.reduce((acc, item) => acc + item.peso, 0) / chartData.length) *
        10
    ) / 10

  let progressPercentage = null
  if (chartData.length > 1) {
    const firstWeight = chartData[0].peso
    const lastWeight = chartData[chartData.length - 1].peso
    progressPercentage = ((lastWeight / firstWeight - 1) * 100).toFixed(1)
  }

  return { maxWeight, maxReps, avgWeight, progressPercentage }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return `${date.getDate()}/${date.getMonth() + 1}/${date
    .getFullYear()
    .toString()
    .substr(-2)}`
}
