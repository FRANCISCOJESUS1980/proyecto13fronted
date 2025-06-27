import { useCallback } from 'react'
import { eliminarUsuario } from '../../../../services/Api/usuarios'
import { useUsuariosContext } from '../context/UsuariosContext'
import alertService from '../../../../components/sweealert2/sweealert2'

export const useEliminarUsuario = () => {
  const { fetchUsuarios } = useUsuariosContext()

  const eliminarUsuarioHandler = useCallback(
    async (userId, nombreUsuario) => {
      try {
        const result = await alertService.confirm({
          title: '¿Estás seguro?',
          text: `¿Deseas eliminar al usuario "${nombreUsuario}"? Esta acción no se puede deshacer.`,
          icon: 'warning',
          confirmButtonText: 'Sí, eliminar',
          cancelButtonText: 'Cancelar',
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6'
        })

        if (result.isConfirmed) {
          alertService.loading(
            'Eliminando usuario...',
            'Por favor espera mientras procesamos la eliminación'
          )

          const token = localStorage.getItem('token')
          if (!token) {
            throw new Error('No hay token de autenticación')
          }

          await eliminarUsuario(userId, token)

          alertService.close()
          await alertService.success(
            '¡Usuario eliminado!',
            `El usuario "${nombreUsuario}" ha sido eliminado correctamente.`
          )

          await fetchUsuarios()
        }
      } catch (error) {
        console.error('Error al eliminar usuario:', error)

        alertService.close()
        await alertService.error(
          'Error al eliminar usuario',
          error.message ||
            'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.'
        )
      }
    },
    [fetchUsuarios]
  )

  return {
    eliminarUsuarioHandler
  }
}
