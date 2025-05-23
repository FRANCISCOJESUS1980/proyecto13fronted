import React, { memo } from 'react'

const HistorialBonoRow = memo(({ bono, formatFecha }) => (
  <tr key={bono._id}>
    <td>{bono.tipo}</td>
    <td>
      {bono.tipo === 'Ilimitado'
        ? 'Ilimitadas'
        : `${bono.sesionesRestantes}/${bono.sesionesTotal}`}
    </td>
    <td>{formatFecha(bono.fechaInicio)}</td>
    <td>{formatFecha(bono.fechaFin)}</td>
    <td>
      <span className={`cf-gestion-bonos-badge ${bono.estado}`}>
        {bono.estado.charAt(0).toUpperCase() + bono.estado.slice(1)}
      </span>
    </td>
    <td>{bono.precio}€</td>
  </tr>
))

HistorialBonoRow.displayName = 'HistorialBonoRow'

const HistorialBonos = memo(({ historialBonos, formatFecha }) => {
  if (!historialBonos || historialBonos.length === 0) {
    return null
  }

  return (
    <div className='cf-gestion-bonos-section'>
      <h2 className='cf-gestion-bonos-section-title'>Historial de Bonos</h2>

      <div className='cf-gestion-bonos-historial'>
        <table className='cf-gestion-bonos-table'>
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Sesiones</th>
              <th>Fecha Inicio</th>
              <th>Fecha Fin</th>
              <th>Estado</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {historialBonos.map((bono) => (
              <HistorialBonoRow
                key={bono._id}
                bono={bono}
                formatFecha={formatFecha}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
})

HistorialBonos.displayName = 'HistorialBonos'

export default HistorialBonos
