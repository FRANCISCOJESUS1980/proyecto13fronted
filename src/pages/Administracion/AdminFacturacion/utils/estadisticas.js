import { isWithinInterval, startOfMonth, endOfMonth } from 'date-fns'
import { calcularMontoBono } from './calculos'

export const calcularEstadisticas = (bonosList) => {
  if (!bonosList || bonosList.length === 0) {
    return {
      total: 0,
      promedio: 0,
      maximo: 0,
      minimo: 0,
      totalMes: 0
    }
  }

  const montos = bonosList.map((bono) => {
    return calcularMontoBono(bono)
  })

  const total = montos.reduce((sum, monto) => sum + monto, 0)

  const hoy = new Date()
  const inicioMes = startOfMonth(hoy)
  const finMes = endOfMonth(hoy)

  const bonosMes = bonosList.filter((bono) => {
    const fechaCreacion = new Date(bono.createdAt || bono.fechaInicio)
    return isWithinInterval(fechaCreacion, { start: inicioMes, end: finMes })
  })

  const montosMes = bonosMes.map((bono) => calcularMontoBono(bono))

  const totalMes = montosMes.reduce((sum, monto) => sum + monto, 0)

  return {
    total: total.toFixed(2),
    promedio:
      bonosList.length > 0 ? (total / bonosList.length).toFixed(2) : '0.00',
    maximo: montos.length > 0 ? Math.max(...montos).toFixed(2) : '0.00',
    minimo: montos.length > 0 ? Math.min(...montos).toFixed(2) : '0.00',
    totalMes: totalMes.toFixed(2)
  }
}
