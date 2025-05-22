import React from 'react'

export const FacturacionFilters = React.memo(
  ({
    periodoSeleccionado,
    handlePeriodoChange,
    fechaInicio,
    setFechaInicio,
    fechaFin,
    setFechaFin,
    filtroActivo,
    setFiltroActivo,
    busqueda,
    setBusqueda
  }) => {
    return (
      <div className='cf-admin-facturacion-filters'>
        <div className='cf-admin-facturacion-filter-group'>
          <label>Período:</label>
          <select
            value={periodoSeleccionado}
            onChange={handlePeriodoChange}
            className='cf-admin-facturacion-select'
          >
            <option value='todos'>Todos los períodos</option>
            <option value='este-mes'>Este mes</option>
            <option value='mes-anterior'>Mes anterior</option>
            <option value='ultimos-3-meses'>Últimos 3 meses</option>
            <option value='ultimos-6-meses'>Últimos 6 meses</option>
            <option value='personalizado'>Personalizado</option>
          </select>
        </div>

        {periodoSeleccionado === 'personalizado' && (
          <div className='cf-admin-facturacion-date-filters'>
            <div className='cf-admin-facturacion-filter-group'>
              <label>Desde:</label>
              <input
                type='date'
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                className='cf-admin-facturacion-date-input'
              />
            </div>
            <div className='cf-admin-facturacion-filter-group'>
              <label>Hasta:</label>
              <input
                type='date'
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                className='cf-admin-facturacion-date-input'
              />
            </div>
          </div>
        )}

        <div className='cf-admin-facturacion-filter-group'>
          <label>Estado:</label>
          <select
            value={filtroActivo}
            onChange={(e) => setFiltroActivo(e.target.value)}
            className='cf-admin-facturacion-select'
          >
            <option value='todos'>Todos</option>
            <option value='activo'>Activo</option>
            <option value='pausado'>Pausado</option>
            <option value='cancelado'>Cancelado</option>
            <option value='expirado'>Expirado</option>
          </select>
        </div>

        <div className='cf-admin-facturacion-filter-group cf-admin-facturacion-search'>
          <label>Buscar:</label>
          <input
            type='text'
            placeholder='Buscar por usuario o tipo de bono...'
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className='cf-admin-facturacion-search-input'
          />
        </div>
      </div>
    )
  }
)
