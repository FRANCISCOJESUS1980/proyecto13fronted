import React from 'react'
import { ArrowLeft, Users } from 'lucide-react'
import Button from '../../../../components/Button/Button'
import { useNavigationUsuarios } from '../hooks/useNavigationUsuarios'

const UsuariosHeader = React.memo(() => {
  const { goBack, goToMensajeMasivo } = useNavigationUsuarios()

  return (
    <div className='cf-admin-usuarios-header'>
      <Button
        variant='secondary'
        onClick={goBack}
        leftIcon={<ArrowLeft size={18} />}
        className='cf-admin-usuarios-back-btn'
      >
        Volver a Administración
      </Button>
      <h1 className='cf-admin-usuarios-title'>Administración de Usuarios</h1>
      <Button
        variant='secondary'
        onClick={goToMensajeMasivo}
        leftIcon={<Users size={18} />}
        className='cf-admin-usuarios-mensaje-masivo-btn'
      >
        Mensaje Masivo
      </Button>
    </div>
  )
})

UsuariosHeader.displayName = 'UsuariosHeader'

export default UsuariosHeader
