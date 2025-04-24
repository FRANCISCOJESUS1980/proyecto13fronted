import { API_BASE_URL, handleApiError, checkResponse } from './config'

export const obtenerCarrito = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/carrito`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return await checkResponse(response)
  } catch (error) {
    handleApiError(error, 'Error al obtener el carrito:')
    throw error
  }
}

export const guardarCarrito = async (token, cartData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/carrito`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(cartData)
    })
    return await checkResponse(response)
  } catch (error) {
    handleApiError(error, 'Error al guardar el carrito:')
    throw error
  }
}
