import React from 'react'
import { formatearMonto } from '../utils/formatters'

export const FacturacionStats = React.memo(({ estadisticas }) => {
  return (
    <div className='cf-admin-facturacion-stats'>
      <div className='cf-admin-facturacion-stat-card'>
        <h3>Total Facturado</h3>
        <p className='cf-admin-facturacion-stat-value'>
          {formatearMonto(estadisticas.total)}
        </p>
      </div>
      <div className='cf-admin-facturacion-stat-card'>
        <h3>Facturación Mes Actual</h3>
        <p className='cf-admin-facturacion-stat-value'>
          {formatearMonto(estadisticas.totalMes)}
        </p>
      </div>
      <div className='cf-admin-facturacion-stat-card'>
        <h3>Promedio por Bono</h3>
        <p className='cf-admin-facturacion-stat-value'>
          {formatearMonto(estadisticas.promedio)}
        </p>
      </div>
      <div className='cf-admin-facturacion-stat-card'>
        <h3>Bono de Mayor Valor</h3>
        <p className='cf-admin-facturacion-stat-value'>
          {formatearMonto(estadisticas.maximo)}
        </p>
      </div>
    </div>
  )
})
