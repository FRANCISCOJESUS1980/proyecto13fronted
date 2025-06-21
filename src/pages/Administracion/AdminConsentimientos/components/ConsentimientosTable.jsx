import React from 'react'
import { Check, XCircle } from 'lucide-react'
import { formatDate } from '../utils/consentimientos-utils'
import alertService from '../../../../components/sweealert2/sweealert2'

const AuthorizationBadge = React.memo(({ autorizaImagen }) => (
  <span
    className={`cf-consentimientos-autoriza-badge ${
      autorizaImagen
        ? 'cf-consentimientos-autoriza'
        : 'cf-consentimientos-no-autoriza'
    }`}
  >
    {autorizaImagen ? (
      <>
        <Check size={14} />
        <span>SÍ</span>
      </>
    ) : (
      <>
        <XCircle size={14} />
        <span>NO</span>
      </>
    )}
  </span>
))

AuthorizationBadge.displayName = 'AuthorizationBadge'

const DeleteButton = React.memo(({ consentimiento, isLoading, onDelete }) => {
  const handleClick = () => {
    alertService.clearAlerts()

    alertService
      .confirm(
        '¿Estás seguro?',
        `¿Deseas eliminar el consentimiento de ${consentimiento.nombreUsuario}?`,
        {
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sí, eliminar',
          cancelButtonText: 'Cancelar',
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          reverseButtons: true,
          customClass: {
            container: 'swal2-container-top-layer',
            popup: 'swal2-popup-top-layer'
          },
          target: document.body
        }
      )
      .then(async (result) => {
        if (result.isConfirmed) {
          onDelete(consentimiento)
        }
      })
  }

  return (
    <button
      className='cf-consentimientos-delete-btn'
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <div className='cf-consentimientos-btn-spinner'></div>
      ) : (
        <>
          <div className='cf-consentimientos-delete-icon'></div>
          <span>Eliminar</span>
        </>
      )}
    </button>
  )
})

DeleteButton.displayName = 'DeleteButton'

const ConsentimientosTable = React.memo(
  ({ consentimientos, deleteLoading, onDelete, totalItems }) => {
    if (consentimientos.length === 0 && totalItems === 0) {
      return (
        <div className='cf-consentimientos-no-results'>
          <div className='cf-consentimientos-no-results-icon'></div>
          <h3 className='cf-consentimientos-no-results-title'>
            No se encontraron consentimientos
          </h3>
          <p className='cf-consentimientos-no-results-text'>
            No hay consentimientos que coincidan con tu búsqueda.
          </p>
        </div>
      )
    }

    return (
      <div className='cf-consentimientos-table-container'>
        <table className='cf-consentimientos-table'>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Autoriza Imagen</th>
              <th>Fecha de Aceptación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {consentimientos.map((item) => (
              <tr key={item._id}>
                <td className='cf-consentimientos-nombre-cell'>
                  {item.nombreUsuario}
                </td>
                <td className='cf-consentimientos-email-cell'>{item.email}</td>
                <td className='cf-consentimientos-autoriza-cell'>
                  <AuthorizationBadge autorizaImagen={item.autorizaImagen} />
                </td>
                <td className='cf-consentimientos-fecha-cell'>
                  {formatDate(item.fechaAceptacion)}
                </td>
                <td className='cf-consentimientos-acciones-cell'>
                  <DeleteButton
                    consentimiento={item}
                    isLoading={deleteLoading === item._id}
                    onDelete={onDelete}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
)

ConsentimientosTable.displayName = 'ConsentimientosTable'

export default ConsentimientosTable
