import { isWithinInterval, startOfMonth, endOfMonth, subMonths } from 'date-fns'

export const aplicarFiltros = ({
  bonos,
  filtroActivo,
  busqueda,
  fechaInicio,
  fechaFin,
  periodoSeleccionado
}) => {
  let bonosFiltrados = [...bonos]

  if (periodoSeleccionado !== 'personalizado') {
    const hoy = new Date()
    let inicio, fin

    switch (periodoSeleccionado) {
      case 'este-mes':
        inicio = startOfMonth(hoy)
        fin = endOfMonth(hoy)
        break
      case 'mes-anterior':
        const mesAnterior = subMonths(hoy, 1)
        inicio = startOfMonth(mesAnterior)
        fin = endOfMonth(mesAnterior)
        break
      case 'ultimos-3-meses':
        inicio = startOfMonth(subMonths(hoy, 2))
        fin = endOfMonth(hoy)
        break
      case 'ultimos-6-meses':
        inicio = startOfMonth(subMonths(hoy, 5))
        fin = endOfMonth(hoy)
        break
      case 'todos':
      default:
        break
    }

    if (periodoSeleccionado !== 'todos') {
      bonosFiltrados = bonosFiltrados.filter((bono) => {
        const fechaCreacion = new Date(bono.createdAt || bono.fechaInicio)
        return isWithinInterval(fechaCreacion, { start: inicio, end: fin })
      })
    }
  } else {
    if (fechaInicio && fechaFin) {
      const inicio = new Date(fechaInicio)
      const fin = new Date(fechaFin)
      fin.setHours(23, 59, 59)

      bonosFiltrados = bonosFiltrados.filter((bono) => {
        const fechaCreacion = new Date(bono.createdAt || bono.fechaInicio)
        return isWithinInterval(fechaCreacion, { start: inicio, end: fin })
      })
    }
  }

  if (busqueda.trim() !== '') {
    const terminoBusqueda = busqueda.toLowerCase().trim()
    bonosFiltrados = bonosFiltrados.filter(
      (bono) =>
        (bono.usuario?.nombre || '').toLowerCase().includes(terminoBusqueda) ||
        (bono.tipo || '').toLowerCase().includes(terminoBusqueda)
    )
  }

  if (filtroActivo !== 'todos') {
    bonosFiltrados = bonosFiltrados.filter(
      (bono) => bono.estado === filtroActivo
    )
  }

  return bonosFiltrados
}
