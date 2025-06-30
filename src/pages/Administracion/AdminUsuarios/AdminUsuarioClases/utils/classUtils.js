export const filterClassesByDate = (classes, selectedDate) => {
  const fechaSeleccionada = selectedDate.toISOString().split('T')[0]

  return classes.filter((clase) => {
    if (clase.esFechaEspecifica) {
      return clase.fecha && clase.fecha.split('T')[0] === fechaSeleccionada
    } else {
      const diaSemana = selectedDate
        .toLocaleDateString('es-ES', { weekday: 'long' })
        .toLowerCase()
      return clase.diaSemana === diaSemana
    }
  })
}

export const sortClassesByTime = (classes) => {
  return [...classes].sort((a, b) => {
    return (
      new Date(`2000-01-01T${a.horario}`) - new Date(`2000-01-01T${b.horario}`)
    )
  })
}

export const updateClassInList = (classes, updatedClass) => {
  return classes.map((clase) =>
    clase._id === updatedClass._id ? updatedClass : clase
  )
}

export const isUserEnrolled = (clase, userId) => {
  if (!clase || !clase.inscritos || !userId) return false

  return clase.inscritos.some((inscrito) => {
    if (typeof inscrito === 'object' && inscrito !== null) {
      return inscrito._id === userId || inscrito._id.toString() === userId
    }
    return inscrito === userId || inscrito.toString() === userId
  })
}
