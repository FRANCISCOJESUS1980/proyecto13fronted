/*import { API_BASE_URL, handleApiError } from './config'

export const verificarCodigoAutorizacion = async (codigo) => {
  try {
    const codigoNormalizado = codigo
      ? String(codigo)
          .trim()
          .toLowerCase()
          .replace(/\s+/g, '')
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
      : ''

    console.log('Código original:', JSON.stringify(codigo))
    console.log('Código normalizado:', JSON.stringify(codigoNormalizado))

    const response = await fetch(`${API_BASE_URL}/users/verificar-codigo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({ codigo: codigoNormalizado })
    })

    return await response.json()
  } catch (error) {
    handleApiError(error, 'Error al verificar código:')
  }
}

export const registrarUsuario = async (userData, avatar) => {
  try {
    const formDataToSend = new FormData()

    Object.keys(userData).forEach((key) => {
      formDataToSend.append(key, userData[key])
    })

    if (avatar) {
      formDataToSend.append('avatar', avatar)
    }

    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: 'POST',
      body: formDataToSend
    })

    return {
      ok: response.ok,
      data: await response.json()
    }
  } catch (error) {
    handleApiError(error, 'Error en el registro:')
  }
}

export const iniciarSesion = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    return {
      ok: response.ok,
      data: await response.json()
    }
  } catch (error) {
    handleApiError(error, 'Error en el inicio de sesión:')
  }
}

export const obtenerUsuarioActual = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return await response.json()
  } catch (error) {
    handleApiError(error, 'Error al obtener usuario:')
  }
}

export const obtenerUsuarioActualConInfo = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      credentials: 'include'
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    handleApiError(error, 'Error al obtener información del usuario:')
  }
}*/
import { API_BASE_URL, handleApiError } from './config'
export const verificarCodigoAutorizacion = async (codigo) => {
  try {
    const codigoNormalizado = codigo
      ? String(codigo)
          .trim()
          .toLowerCase()
          .replace(/\s+/g, '')
          .replace(/[^\w]/g, '')
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]/gi, '')
      : ''

    console.log('DEBUG - Código original:', JSON.stringify(codigo))
    console.log(
      'DEBUG - Código normalizado:',
      JSON.stringify(codigoNormalizado)
    )

    const requestBody = {
      codigo: codigoNormalizado,
      codigoOriginal: codigo,
      debug: {
        original: codigo,
        normalizado: codigoNormalizado,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        url: window.location.href
      }
    }

    console.log('DEBUG - Request body:', JSON.stringify(requestBody))

    const response = await fetch(`${API_BASE_URL}/users/verificar-codigo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(requestBody)
    })

    console.log('DEBUG - Response status:', response.status)
    console.log('DEBUG - Response ok:', response.ok)

    const responseData = await response.json()
    console.log('DEBUG - Response data:', JSON.stringify(responseData))

    return responseData
  } catch (error) {
    console.error('DEBUG - Error completo:', error)
    handleApiError(error, 'Error al verificar código:')
  }
}

export const registrarUsuario = async (userData, avatar) => {
  try {
    const formDataToSend = new FormData()

    Object.keys(userData).forEach((key) => {
      formDataToSend.append(key, userData[key])
    })

    if (avatar) {
      formDataToSend.append('avatar', avatar)
    }

    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: 'POST',
      body: formDataToSend
    })

    return {
      ok: response.ok,
      data: await response.json()
    }
  } catch (error) {
    handleApiError(error, 'Error en el registro:')
  }
}

export const iniciarSesion = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    return {
      ok: response.ok,
      data: await response.json()
    }
  } catch (error) {
    handleApiError(error, 'Error en el inicio de sesión:')
  }
}

export const obtenerUsuarioActual = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return await response.json()
  } catch (error) {
    handleApiError(error, 'Error al obtener usuario:')
  }
}

export const obtenerUsuarioActualConInfo = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      credentials: 'include'
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    handleApiError(error, 'Error al obtener información del usuario:')
  }
}
