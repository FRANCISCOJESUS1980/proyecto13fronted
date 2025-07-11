import React, { useState } from 'react'
import { Check, XCircle, Eye, User, FileText } from 'lucide-react'
import { formatDate } from '../utils/consentimientos-utils'
import alertService from '../../../../components/sweealert2/sweealert2'
import SignatureModal from './SignatureModal'

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

const UserInfoCell = React.memo(({ nombreCompleto, dni }) => (
  <div className='cf-consentimientos-user-info'>
    <div className='cf-consentimientos-user-name'>
      <User size={14} />
      <span>{nombreCompleto || 'No disponible'}</span>
    </div>
    <div className='cf-consentimientos-user-dni'>
      <FileText size={12} />
      <span>{dni || 'No disponible'}</span>
    </div>
  </div>
))

UserInfoCell.displayName = 'UserInfoCell'

const SignatureCell = React.memo(({ firmaDigital, nombreCompleto }) => {
  const [showModal, setShowModal] = useState(false)

  if (!firmaDigital) {
    return <span className='cf-consentimientos-no-signature'>Sin firma</span>
  }

  return (
    <>
      <button
        className='cf-consentimientos-signature-btn'
        onClick={() => setShowModal(true)}
      >
        <Eye size={14} />
        <span>Ver firma</span>
      </button>
      {showModal && (
        <SignatureModal
          signature={firmaDigital}
          userName={nombreCompleto}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  )
})

SignatureCell.displayName = 'SignatureCell'

const DeleteButton = React.memo(({ consentimiento, isLoading, onDelete }) => {
  const handleClick = () => {
    alertService.clearAlerts()
    alertService
      .confirm(
        '¿Estás seguro?',
        `¿Deseas eliminar el consentimiento de ${consentimiento.nombreCompleto}?`,
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
        <div className='cf-consentimientos-table-wrapper'>
          <table className='cf-consentimientos-table'>
            <thead>
              <tr>
                <th className='cf-consentimientos-th-user'>
                  Datos del Usuario
                </th>
                <th className='cf-consentimientos-th-email'>Email de Cuenta</th>
                <th className='cf-consentimientos-th-signature'>
                  Firma Digital
                </th>
                <th className='cf-consentimientos-th-authorization'>
                  Autoriza Imagen
                </th>
                <th className='cf-consentimientos-th-date'>Fecha</th>
                <th className='cf-consentimientos-th-actions'>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {consentimientos.map((item) => (
                <tr key={item._id} className='cf-consentimientos-table-row'>
                  <td className='cf-consentimientos-user-cell'>
                    <UserInfoCell
                      nombreCompleto={item.nombreCompleto}
                      dni={item.dni}
                    />
                  </td>
                  <td className='cf-consentimientos-email-cell'>
                    <span className='cf-consentimientos-account-email'>
                      {item.email}
                    </span>
                  </td>
                  <td className='cf-consentimientos-signature-cell'>
                    <SignatureCell
                      firmaDigital={item.firmaDigital}
                      nombreCompleto={item.nombreCompleto}
                    />
                  </td>
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
      </div>
    )
  }
)

ConsentimientosTable.displayName = 'ConsentimientosTable'
export default ConsentimientosTable
