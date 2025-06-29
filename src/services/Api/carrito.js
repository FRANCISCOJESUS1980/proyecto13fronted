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

export const agregarProductoCarrito = async (
  token,
  productId,
  quantity = 1
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/carrito/producto`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ productId, quantity })
    })
    return await checkResponse(response)
  } catch (error) {
    handleApiError(error, 'Error al agregar producto al carrito:')
    throw error
  }
}

export const actualizarCantidadProducto = async (
  token,
  productId,
  quantity
) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/carrito/producto/${productId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ quantity })
      }
    )
    return await checkResponse(response)
  } catch (error) {
    handleApiError(error, 'Error al actualizar cantidad del producto:')
    throw error
  }
}

export const eliminarProductoCarrito = async (token, productId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/carrito/producto/${productId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    return await checkResponse(response)
  } catch (error) {
    handleApiError(error, 'Error al eliminar producto del carrito:')
    throw error
  }
}

export const limpiarCarrito = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/carrito`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return await checkResponse(response)
  } catch (error) {
    handleApiError(error, 'Error al limpiar el carrito:')
    throw error
  }
}
