import { API_BASE_URL, handleApiError, checkResponse } from './config'

export const procesarPago = async (token, orderData) => {
  if (!token) {
    throw new Error('Se requiere autenticación para procesar el pago')
  }

  try {
    const response = await fetch(`${API_BASE_URL}/pagos/procesar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(orderData)
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('Respuesta del servidor:', errorData)
      throw new Error(
        errorData.message || `Error al procesar el pago: ${response.status}`
      )
    }

    return await checkResponse(response)
  } catch (error) {
    handleApiError(error, 'Error al procesar el pago:')
    throw error
  }
}

export const obtenerPedidos = async (token) => {
  if (!token) {
    throw new Error('Se requiere autenticación para obtener los pedidos')
  }

  try {
    const response = await fetch(`${API_BASE_URL}/pagos/historial`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return await checkResponse(response)
  } catch (error) {
    handleApiError(error, 'Error al obtener pedidos:')
    throw error
  }
}

export const obtenerDetallePedido = async (token, pedidoId) => {
  if (!token) {
    throw new Error(
      'Se requiere autenticación para obtener el detalle del pedido'
    )
  }

  try {
    const response = await fetch(`${API_BASE_URL}/pagos/pedido/${pedidoId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return await checkResponse(response)
  } catch (error) {
    handleApiError(error, 'Error al obtener detalle del pedido:')
    throw error
  }
}
