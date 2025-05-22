import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { format } from 'date-fns'
import { calcularMontoBono } from './calculos'

export const exportarPDF = (bonosFiltrados, estadisticas) => {
  try {
    const doc = new jsPDF()

    doc.setFontSize(18)
    doc.text('Informe de Facturación', 14, 22)

    doc.setFontSize(11)
    doc.text(`Generado el: ${format(new Date(), 'dd/MM/yyyy HH:mm')}`, 14, 30)

    doc.setFontSize(14)
    doc.text('Resumen', 14, 40)

    doc.setFontSize(10)
    doc.text(`Total facturado: ${estadisticas.total}€`, 14, 50)
    doc.text(`Promedio por transacción: ${estadisticas.promedio}€`, 14, 56)
    doc.text(`Transacción máxima: ${estadisticas.maximo}€`, 14, 62)
    doc.text(`Transacción mínima: ${estadisticas.minimo}€`, 14, 68)
    doc.text(`Total mes actual: ${estadisticas.totalMes}€`, 14, 74)

    doc.setFontSize(14)
    doc.text('Detalle de Pagos', 14, 84)

    const tableColumn = [
      'Fecha',
      'Usuario',
      'Tipo de Bono',
      'Sesiones',
      'Estado',
      'Monto (€)'
    ]
    const tableRows = []

    bonosFiltrados.forEach((bono) => {
      const fechaFormateada = format(
        new Date(bono.createdAt || bono.fechaInicio),
        'dd/MM/yyyy'
      )

      const monto = calcularMontoBono(bono)

      const bonoData = [
        fechaFormateada,
        bono.usuario?.nombre || 'N/A',
        bono.tipo || 'N/A',
        bono.tipo === 'Ilimitado' ? 'Ilimitado' : bono.sesionesTotal || 0,
        bono.estado || 'N/A',
        monto.toFixed(2)
      ]
      tableRows.push(bonoData)
    })

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 90,
      theme: 'grid',
      styles: { fontSize: 8 },
      headStyles: { fillColor: [41, 128, 185] }
    })

    doc.save('informe-facturacion.pdf')
  } catch (error) {
    console.error('Error al generar PDF:', error)
    alert('Error al generar el PDF. Por favor, intente de nuevo.')
  }
}
