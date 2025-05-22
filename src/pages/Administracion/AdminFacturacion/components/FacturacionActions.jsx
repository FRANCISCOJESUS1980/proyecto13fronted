import React, { useCallback } from 'react'
import { FileText, FileSpreadsheet } from 'lucide-react'
import Button from '../../../../components/Button/Button'
import { exportarPDF } from '../utils/exportarPDF'
import { exportarExcel } from '../utils/exportarExcel'

export const FacturacionActions = React.memo(
  ({ bonosFiltrados, estadisticas }) => {
    const handleExportPDF = useCallback(() => {
      exportarPDF(bonosFiltrados, estadisticas)
    }, [bonosFiltrados, estadisticas])

    const handleExportExcel = useCallback(() => {
      exportarExcel(bonosFiltrados)
    }, [bonosFiltrados])

    return (
      <div className='cf-admin-facturacion-actions'>
        <Button
          variant='primary'
          onClick={handleExportPDF}
          leftIcon={<FileText size={18} />}
          className='cf-admin-facturacion-pdf-btn'
        >
          Exportar a PDF
        </Button>
        <Button
          variant='primary'
          onClick={handleExportExcel}
          leftIcon={<FileSpreadsheet size={18} />}
          className='cf-admin-facturacion-excel-btn'
        >
          Exportar a Excel
        </Button>
      </div>
    )
  }
)
