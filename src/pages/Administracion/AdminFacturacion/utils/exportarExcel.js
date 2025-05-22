import * as XLSX from 'xlsx'
import { format } from 'date-fns'
import { calcularMontoBono } from './calculos'

export const exportarExcel = (bonosFiltrados) => {
  const datosExcel = bonosFiltrados.map((bono) => {
    const monto = calcularMontoBono(bono)

    return {
      Fecha: format(new Date(bono.createdAt || bono.fechaInicio), 'dd/MM/yyyy'),
      Usuario: bono.usuario?.nombre || 'N/A',
      'Tipo de Bono': bono.tipo || 'N/A',
      Sesiones:
        bono.tipo === 'Ilimitado' ? 'Ilimitado' : bono.sesionesTotal || 0,
      Estado: bono.estado || 'N/A',
      'Monto (€)': monto.toFixed(2)
    }
  })

  const wb = XLSX.utils.book_new()
  const ws = XLSX.utils.json_to_sheet(datosExcel)

  XLSX.utils.book_append_sheet(wb, ws, 'Facturación')

  XLSX.writeFile(wb, 'informe-facturacion.xlsx')
}
