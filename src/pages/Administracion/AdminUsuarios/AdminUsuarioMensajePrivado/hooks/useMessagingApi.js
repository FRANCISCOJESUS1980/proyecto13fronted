import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  obtenerConversacion,
  obtenerMensajesConversacion,
  enviarMensajePrivado,
  marcarMensajesComoLeidos,
  actualizarMensajePrivado,
  eliminarMensajePrivado
} from '../../../../../services/Api/index'
import { obtenerUsuarioPorId } from '../../../../../services/Api/index'
import alertService from '../../../../../components/sweealert2/sweealert2'

export function useMessagingApi() {
  const navigate = useNavigate()

  const getToken = useCallback(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/iniciar-sesion')
      return null
    }
    return token
  }, [navigate])

  const fetchUserInfo = useCallback(
    async (userId) => {
      const token = getToken()
      if (!token) return null

      try {
        const userData = await obtenerUsuarioPorId(userId, token)
        if (userData && userData.data) {
          return userData.data
        } else {
          throw new Error('No se pudo obtener la información del usuario')
        }
      } catch (error) {
        console.error('Error al cargar datos:', error)
        alertService.error('Error', error.message || 'Error al cargar datos')
        throw error
      }
    },
    [getToken]
  )

  const fetchConversation = useCallback(
    async (userId) => {
      const token = getToken()
      if (!token) return null

      try {
        const conversacionData = await obtenerConversacion(token, userId)
        console.log('Respuesta de conversación:', conversacionData)

        if (conversacionData && conversacionData.success) {
          return {
            mensajes: conversacionData.data || [],
            conversacion:
              conversacionData.conversacion ||
              conversacionData.conversacionActual
          }
        }
        return null
      } catch (error) {
        console.error('Error al cargar conversación:', error)
        alertService.error(
          'Error',
          error.message || 'Error al cargar conversación'
        )
        throw error
      }
    },
    [getToken]
  )

  const fetchMessages = useCallback(
    async (convId) => {
      const token = getToken()
      if (!token || !convId) return []

      try {
        console.log('Cargando mensajes para conversación ID:', convId)
        const data = await obtenerMensajesConversacion(token, convId)

        if (data.success) {
          await marcarMensajesComoLeidos(token, convId)
          console.log('Mensajes marcados como leídos')
          return data.data || []
        } else {
          console.error('Error en la respuesta al obtener mensajes:', data)
          throw new Error('No se pudieron cargar los mensajes.')
        }
      } catch (error) {
        console.error('Error al cargar mensajes:', error)
        alertService.error('Error', 'Error al cargar los mensajes.')
        throw error
      }
    },
    [getToken]
  )

  const sendMessage = useCallback(
    async (userId, mensaje) => {
      const token = getToken()
      if (!token) return null

      try {
        const resultado = await enviarMensajePrivado(token, userId, mensaje)
        if (resultado && resultado.success) {
          return resultado.data
        } else {
          throw new Error('No se pudo enviar el mensaje')
        }
      } catch (error) {
        console.error('Error al enviar mensaje:', error)
        alertService.error(
          'Error',
          error.message || 'Error al enviar el mensaje'
        )
        throw error
      }
    },
    [getToken]
  )

  const updateMessage = useCallback(
    async (messageId, newText) => {
      const token = getToken()
      if (!token) return false

      try {
        console.log('Guardando edición para mensaje (admin):', messageId)
        console.log('Nuevo texto:', newText)

        const resultado = await actualizarMensajePrivado(
          token,
          messageId,
          newText
        )
        console.log('Resultado de la actualización:', resultado)

        if (resultado && resultado.success) {
          alertService.success('¡Éxito!', 'Mensaje actualizado correctamente')
          return true
        } else {
          const errorMsg =
            'No se pudo actualizar el mensaje: ' +
            (resultado.message || 'Error desconocido')
          alertService.error('Error', errorMsg)
          return false
        }
      } catch (error) {
        console.error('Error al actualizar mensaje:', error)
        const errorMsg = 'Error al actualizar el mensaje: ' + error.message
        alertService.error('Error', errorMsg)
        return false
      }
    },
    [getToken]
  )

  const deleteMessage = useCallback(
    async (messageId) => {
      const token = getToken()
      if (!token) return false

      try {
        const resultado = await eliminarMensajePrivado(token, messageId)
        if (resultado && resultado.success) {
          alertService.success('¡Eliminado!', 'El mensaje ha sido eliminado')
          return true
        } else {
          alertService.error('Error', 'No se pudo eliminar el mensaje')
          return false
        }
      } catch (error) {
        console.error('Error al eliminar mensaje:', error)
        const errorMsg = 'Error al eliminar el mensaje: ' + error.message
        alertService.error('Error', errorMsg)
        return false
      }
    },
    [getToken]
  )

  return {
    fetchUserInfo,
    fetchConversation,
    fetchMessages,
    sendMessage,
    updateMessage,
    deleteMessage
  }
}
