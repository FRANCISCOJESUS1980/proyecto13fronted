import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export const formatearFecha = (fecha) => {
  if (!fecha) return 'N/A'
  try {
    return format(new Date(fecha), 'dd/MM/yyyy', { locale: es })
  } catch (error) {
    console.error('Error al formatear fecha:', error)
    return 'Fecha inválida'
  }
}

export const formatearMonto = (monto) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR'
  }).format(monto)
}
