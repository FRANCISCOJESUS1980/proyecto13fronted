import React, { useRef } from 'react'
import { formatearFecha } from '../utils/formatters'
import { formatearMonto } from '../utils/formatters'
import { calcularMontoBono } from '../utils/calculos'

export const FacturacionTable = React.memo(({ bonosFiltrados }) => {
  const tableRef = useRef(null)

  return (
    <div className='cf-admin-facturacion-table-container'>
      <table className='cf-admin-facturacion-table' ref={tableRef}>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Usuario</th>
            <th>Tipo de Bono</th>
            <th>Sesiones</th>
            <th>Estado</th>
            <th>Monto</th>
          </tr>
        </thead>
        <tbody>
          {bonosFiltrados.length > 0 ? (
            bonosFiltrados.map((bono, index) => (
              <tr
                key={index}
                className={`cf-admin-facturacion-row-${bono.estado}`}
              >
                <td>{formatearFecha(bono.createdAt || bono.fechaInicio)}</td>
                <td>{bono.usuario?.nombre || 'N/A'}</td>
                <td>{bono.tipo || 'N/A'}</td>
                <td>
                  {bono.tipo === 'Ilimitado'
                    ? 'Ilimitado'
                    : bono.sesionesTotal || 0}
                </td>
                <td>
                  <span
                    className={`cf-admin-facturacion-estado cf-admin-facturacion-estado-${bono.estado}`}
                  >
                    {bono.estado}
                  </span>
                </td>
                <td className='cf-admin-facturacion-monto'>
                  {formatearMonto(calcularMontoBono(bono))}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='6' className='cf-admin-facturacion-no-results'>
                No se encontraron bonos con los filtros seleccionados
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
})
