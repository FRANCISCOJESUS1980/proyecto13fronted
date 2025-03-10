/*const API_BASE_URL = 'http://localhost:5000/api'

export const verificarCodigoAutorizacion = async (codigo) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/verificar-codigo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({ codigo: codigo.trim() })
    })

    return await response.json()
  } catch (error) {
    console.error('Error al verificar código:', error)
    throw error
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
    console.error('Error en el registro:', error)
    throw error
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
    console.error('Error en el inicio de sesión:', error)
    throw error
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
    console.error('Error al obtener usuario:', error)
    throw error
  }
}

export const obtenerPerfilUsuario = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error al obtener perfil de usuario:', error)
    throw error
  }
}

export const actualizarPerfilUsuario = async (token, userData, avatarFile) => {
  try {
    const formData = new FormData()

    formData.append('nombre', userData.nombre || '')
    formData.append('email', userData.email || '')
    formData.append('telefono', userData.telefono || '')

    formData.append(
      'direccion',
      JSON.stringify({
        calle: userData.direccion?.calle || '',
        ciudad: userData.direccion?.ciudad || '',
        codigoPostal: userData.direccion?.codigoPostal || '',
        pais: userData.direccion?.pais || ''
      })
    )

    if (avatarFile) {
      formData.append('avatar', avatarFile)
    }

    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(
        errorData.message || `Error ${response.status}: ${response.statusText}`
      )
    }

    return await response.json()
  } catch (error) {
    console.error('Error al actualizar perfil de usuario:', error)
    throw error
  }
}

export const obtenerTodosUsuarios = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(
        errorData.message || `Error ${response.status}: ${response.statusText}`
      )
    }

    const data = await response.json()
    return Array.isArray(data) ? data : data.data
  } catch (error) {
    console.error('Error al obtener todos los usuarios:', error)
    throw error
  }
}

export const obtenerProductos = async (
  page = 1,
  limit = 12,
  categoria = '',
  ordenar = 'destacado'
) => {
  try {
    let url = `${API_BASE_URL}/productos?page=${page}&limit=${limit}`

    if (categoria) {
      url += `&categoria=${categoria}`
    }

    if (ordenar) {
      url += `&sort=${
        ordenar === 'destacado'
          ? '-destacado'
          : ordenar === 'precio-asc'
          ? 'precio'
          : '-precio'
      }`
    }

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error al obtener productos:', error)
    throw error
  }
}

export const buscarProductos = async (query) => {
  try {
    const response = await fetch(`${API_BASE_URL}/productos/search?q=${query}`)

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error en la búsqueda de productos:', error)
    throw error
  }
}

export const obtenerProductosAdmin = async (
  token,
  page = 1,
  limit = 8,
  categoria = ''
) => {
  try {
    let url = `${API_BASE_URL}/productos?page=${page}&limit=${limit}`

    if (categoria) {
      url += `&categoria=${categoria}`
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error al obtener productos para administración:', error)
    throw error
  }
}

export const buscarProductosAdmin = async (token, query) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/productos/search?q=${query}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error en la búsqueda de productos:', error)
    throw error
  }
}

export const crearProducto = async (token, productData, imageFile) => {
  try {
    const formData = new FormData()

    const numericFields = ['precio', 'stock']

    Object.keys(productData).forEach((key) => {
      if (key === 'imagen') {
        return
      } else if (numericFields.includes(key)) {
        formData.append(key, Number(productData[key]))
      } else if (key === 'destacado') {
        formData.append(key, productData[key].toString())
      } else {
        formData.append(key, productData[key])
      }
    })

    if (imageFile instanceof File) {
      formData.append('imagen', imageFile)
    }

    const response = await fetch(`${API_BASE_URL}/productos`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(
        errorData.message || `Error ${response.status}: ${response.statusText}`
      )
    }

    return await response.json()
  } catch (error) {
    console.error('Error al crear producto:', error)
    throw error
  }
}

export const actualizarProducto = async (
  token,
  productId,
  productData,
  imageFile
) => {
  try {
    const formData = new FormData()

    const numericFields = ['precio', 'stock']

    Object.keys(productData).forEach((key) => {
      if (key === 'imagen') {
        return
      } else if (numericFields.includes(key)) {
        formData.append(key, Number(productData[key]))
      } else if (key === 'destacado') {
        formData.append(key, productData[key].toString())
      } else {
        formData.append(key, productData[key])
      }
    })

    if (imageFile instanceof File) {
      formData.append('imagen', imageFile)
    }

    const response = await fetch(`${API_BASE_URL}/productos/${productId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(
        errorData.message || `Error ${response.status}: ${response.statusText}`
      )
    }

    return await response.json()
  } catch (error) {
    console.error('Error al actualizar producto:', error)
    throw error
  }
}

export const eliminarProducto = async (token, productId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/productos/${productId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(
        errorData.message || `Error ${response.status}: ${response.statusText}`
      )
    }

    return await response.json()
  } catch (error) {
    console.error('Error al eliminar producto:', error)
    throw error
  }
}

export const cambiarEstadoProducto = async (token, productId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/productos/${productId}/estado`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(
        errorData.message || `Error ${response.status}: ${response.statusText}`
      )
    }

    return await response.json()
  } catch (error) {
    console.error('Error al cambiar estado del producto:', error)
    throw error
  }
}*/
/*const API_BASE_URL = 'http://localhost:5000/api'

export const verificarCodigoAutorizacion = async (codigo) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/verificar-codigo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({ codigo: codigo.trim() })
    })

    return await response.json()
  } catch (error) {
    console.error('Error al verificar código:', error)
    throw error
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
    console.error('Error en el registro:', error)
    throw error
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
    console.error('Error en el inicio de sesión:', error)
    throw error
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
    console.error('Error al obtener usuario:', error)
    throw error
  }
}

export const obtenerPerfilUsuario = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error al obtener perfil de usuario:', error)
    throw error
  }
}

export const actualizarPerfilUsuario = async (token, userData, avatarFile) => {
  try {
    const formData = new FormData()

    formData.append('nombre', userData.nombre || '')
    formData.append('email', userData.email || '')
    formData.append('telefono', userData.telefono || '')

    formData.append(
      'direccion',
      JSON.stringify({
        calle: userData.direccion?.calle || '',
        ciudad: userData.direccion?.ciudad || '',
        codigoPostal: userData.direccion?.codigoPostal || '',
        pais: userData.direccion?.pais || ''
      })
    )

    if (avatarFile) {
      formData.append('avatar', avatarFile)
    }

    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(
        errorData.message || `Error ${response.status}: ${response.statusText}`
      )
    }

    return await response.json()
  } catch (error) {
    console.error('Error al actualizar perfil de usuario:', error)
    throw error
  }
}

export const obtenerTodosUsuarios = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(
        errorData.message || `Error ${response.status}: ${response.statusText}`
      )
    }

    const data = await response.json()
    return Array.isArray(data) ? data : data.data
  } catch (error) {
    console.error('Error al obtener todos los usuarios:', error)
    throw error
  }
}

export const obtenerProductos = async (
  page = 1,
  limit = 12,
  categoria = '',
  ordenar = 'destacado'
) => {
  try {
    let url = `${API_BASE_URL}/productos?page=${page}&limit=${limit}`

    if (categoria) {
      url += `&categoria=${categoria}`
    }

    if (ordenar) {
      url += `&sort=${
        ordenar === 'destacado'
          ? '-destacado'
          : ordenar === 'precio-asc'
          ? 'precio'
          : '-precio'
      }`
    }

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error al obtener productos:', error)
    throw error
  }
}

export const buscarProductos = async (query) => {
  try {
    const response = await fetch(`${API_BASE_URL}/productos/search?q=${query}`)

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error en la búsqueda de productos:', error)
    throw error
  }
}

export const obtenerProductosAdmin = async (
  token,
  page = 1,
  limit = 8,
  categoria = ''
) => {
  try {
    let url = `${API_BASE_URL}/productos?page=${page}&limit=${limit}`

    if (categoria) {
      url += `&categoria=${categoria}`
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error al obtener productos para administración:', error)
    throw error
  }
}

export const buscarProductosAdmin = async (token, query) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/productos/search?q=${query}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error en la búsqueda de productos:', error)
    throw error
  }
}

export const crearProducto = async (token, productData, imageFile) => {
  try {
    const formData = new FormData()

    const numericFields = ['precio', 'stock']

    Object.keys(productData).forEach((key) => {
      if (key === 'imagen') {
        return
      } else if (numericFields.includes(key)) {
        formData.append(key, Number(productData[key]))
      } else if (key === 'destacado') {
        formData.append(key, productData[key].toString())
      } else {
        formData.append(key, productData[key])
      }
    })

    if (imageFile instanceof File) {
      formData.append('imagen', imageFile)
    }

    const response = await fetch(`${API_BASE_URL}/productos`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(
        errorData.message || `Error ${response.status}: ${response.statusText}`
      )
    }

    return await response.json()
  } catch (error) {
    console.error('Error al crear producto:', error)
    throw error
  }
}

export const actualizarProducto = async (
  token,
  productId,
  productData,
  imageFile
) => {
  try {
    const formData = new FormData()

    const numericFields = ['precio', 'stock']

    Object.keys(productData).forEach((key) => {
      if (key === 'imagen') {
        return
      } else if (numericFields.includes(key)) {
        formData.append(key, Number(productData[key]))
      } else if (key === 'destacado') {
        formData.append(key, productData[key].toString())
      } else {
        formData.append(key, productData[key])
      }
    })

    if (imageFile instanceof File) {
      formData.append('imagen', imageFile)
    }

    const response = await fetch(`${API_BASE_URL}/productos/${productId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(
        errorData.message || `Error ${response.status}: ${response.statusText}`
      )
    }

    return await response.json()
  } catch (error) {
    console.error('Error al actualizar producto:', error)
    throw error
  }
}

export const eliminarProducto = async (token, productId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/productos/${productId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(
        errorData.message || `Error ${response.status}: ${response.statusText}`
      )
    }

    return await response.json()
  } catch (error) {
    console.error('Error al eliminar producto:', error)
    throw error
  }
}

export const cambiarEstadoProducto = async (token, productId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/productos/${productId}/estado`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(
        errorData.message || `Error ${response.status}: ${response.statusText}`
      )
    }

    return await response.json()
  } catch (error) {
    console.error('Error al cambiar estado del producto:', error)
    throw error
  }
}

export const fetchClasesUsuario = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/classes`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      credentials: 'include'
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()

    if (data && Array.isArray(data.data)) {
      return data.data
    } else {
      throw new Error('La respuesta del servidor no es válida')
    }
  } catch (error) {
    console.error('Error al obtener clases:', error)
    throw new Error('No se pudieron cargar las clases')
  }
}

export const inscribirClase = async (token, claseId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/classes/${claseId}/inscribir`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        credentials: 'include'
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al inscribirse')
    }

    const data = await response.json()

    if (data.success) {
      return data.data
    } else {
      throw new Error(data.message || 'Error al inscribirse')
    }
  } catch (error) {
    console.error('Error al inscribirse:', error)
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        'Error al inscribirse en la clase'
    )
  }
}

export const cancelarClase = async (token, claseId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/classes/${claseId}/cancelar`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        credentials: 'include'
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al cancelar inscripción')
    }

    const data = await response.json()

    if (data.success) {
      return data.data
    } else {
      throw new Error(data.message || 'Error al cancelar inscripción')
    }
  } catch (error) {
    console.error('Error al cancelar inscripción:', error)
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        'Error al cancelar la inscripción'
    )
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
    console.error('Error al obtener usuario:', error)
    throw error
  }
}*/
import { isValid, format } from 'date-fns'
import { es } from 'date-fns/locale'

const API_BASE_URL = 'http://localhost:5000/api'

export const verificarCodigoAutorizacion = async (codigo) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/verificar-codigo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({ codigo: codigo.trim() })
    })

    return await response.json()
  } catch (error) {
    console.error('Error al verificar código:', error)
    throw error
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
    console.error('Error en el registro:', error)
    throw error
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
    console.error('Error en el inicio de sesión:', error)
    throw error
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
    console.error('Error al obtener usuario:', error)
    throw error
  }
}

export const obtenerPerfilUsuario = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error al obtener perfil de usuario:', error)
    throw error
  }
}

export const actualizarPerfilUsuario = async (token, userData, avatarFile) => {
  try {
    const formData = new FormData()

    formData.append('nombre', userData.nombre || '')
    formData.append('email', userData.email || '')
    formData.append('telefono', userData.telefono || '')

    formData.append(
      'direccion',
      JSON.stringify({
        calle: userData.direccion?.calle || '',
        ciudad: userData.direccion?.ciudad || '',
        codigoPostal: userData.direccion?.codigoPostal || '',
        pais: userData.direccion?.pais || ''
      })
    )

    if (avatarFile) {
      formData.append('avatar', avatarFile)
    }

    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(
        errorData.message || `Error ${response.status}: ${response.statusText}`
      )
    }

    return await response.json()
  } catch (error) {
    console.error('Error al actualizar perfil de usuario:', error)
    throw error
  }
}

export const obtenerTodosUsuarios = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(
        errorData.message || `Error ${response.status}: ${response.statusText}`
      )
    }

    const data = await response.json()
    return Array.isArray(data) ? data : data.data
  } catch (error) {
    console.error('Error al obtener todos los usuarios:', error)
    throw error
  }
}

export const obtenerProductos = async (
  page = 1,
  limit = 12,
  categoria = '',
  ordenar = 'destacado'
) => {
  try {
    let url = `${API_BASE_URL}/productos?page=${page}&limit=${limit}`

    if (categoria) {
      url += `&categoria=${categoria}`
    }

    if (ordenar) {
      url += `&sort=${
        ordenar === 'destacado'
          ? '-destacado'
          : ordenar === 'precio-asc'
          ? 'precio'
          : '-precio'
      }`
    }

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error al obtener productos:', error)
    throw error
  }
}

export const buscarProductos = async (query) => {
  try {
    const response = await fetch(`${API_BASE_URL}/productos/search?q=${query}`)

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error en la búsqueda de productos:', error)
    throw error
  }
}

export const obtenerProductosAdmin = async (
  token,
  page = 1,
  limit = 8,
  categoria = ''
) => {
  try {
    let url = `${API_BASE_URL}/productos?page=${page}&limit=${limit}`

    if (categoria) {
      url += `&categoria=${categoria}`
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error al obtener productos para administración:', error)
    throw error
  }
}

export const buscarProductosAdmin = async (token, query) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/productos/search?q=${query}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error en la búsqueda de productos:', error)
    throw error
  }
}

export const crearProducto = async (token, productData, imageFile) => {
  try {
    const formData = new FormData()

    const numericFields = ['precio', 'stock']

    Object.keys(productData).forEach((key) => {
      if (key === 'imagen') {
        return
      } else if (numericFields.includes(key)) {
        formData.append(key, Number(productData[key]))
      } else if (key === 'destacado') {
        formData.append(key, productData[key].toString())
      } else {
        formData.append(key, productData[key])
      }
    })

    if (imageFile instanceof File) {
      formData.append('imagen', imageFile)
    }

    const response = await fetch(`${API_BASE_URL}/productos`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(
        errorData.message || `Error ${response.status}: ${response.statusText}`
      )
    }

    return await response.json()
  } catch (error) {
    console.error('Error al crear producto:', error)
    throw error
  }
}

export const actualizarProducto = async (
  token,
  productId,
  productData,
  imageFile
) => {
  try {
    const formData = new FormData()

    const numericFields = ['precio', 'stock']

    Object.keys(productData).forEach((key) => {
      if (key === 'imagen') {
        return
      } else if (numericFields.includes(key)) {
        formData.append(key, Number(productData[key]))
      } else if (key === 'destacado') {
        formData.append(key, productData[key].toString())
      } else {
        formData.append(key, productData[key])
      }
    })

    if (imageFile instanceof File) {
      formData.append('imagen', imageFile)
    }

    const response = await fetch(`${API_BASE_URL}/productos/${productId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(
        errorData.message || `Error ${response.status}: ${response.statusText}`
      )
    }

    return await response.json()
  } catch (error) {
    console.error('Error al actualizar producto:', error)
    throw error
  }
}

export const eliminarProducto = async (token, productId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/productos/${productId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(
        errorData.message || `Error ${response.status}: ${response.statusText}`
      )
    }

    return await response.json()
  } catch (error) {
    console.error('Error al eliminar producto:', error)
    throw error
  }
}

export const cambiarEstadoProducto = async (token, productId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/productos/${productId}/estado`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(
        errorData.message || `Error ${response.status}: ${response.statusText}`
      )
    }

    return await response.json()
  } catch (error) {
    console.error('Error al cambiar estado del producto:', error)
    throw error
  }
}

export const fetchClasesUsuario = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/classes`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      credentials: 'include'
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()

    if (data && Array.isArray(data.data)) {
      return data.data
    } else {
      throw new Error('La respuesta del servidor no es válida')
    }
  } catch (error) {
    console.error('Error al obtener clases:', error)
    throw new Error('No se pudieron cargar las clases')
  }
}

export const inscribirClase = async (token, claseId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/classes/${claseId}/inscribir`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        credentials: 'include'
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al inscribirse')
    }

    const data = await response.json()

    if (data.success) {
      return data.data
    } else {
      throw new Error(data.message || 'Error al inscribirse')
    }
  } catch (error) {
    console.error('Error al inscribirse:', error)
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        'Error al inscribirse en la clase'
    )
  }
}

export const cancelarClase = async (token, claseId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/classes/${claseId}/cancelar`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        credentials: 'include'
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al cancelar inscripción')
    }

    const data = await response.json()

    if (data.success) {
      return data.data
    } else {
      throw new Error(data.message || 'Error al cancelar inscripción')
    }
  } catch (error) {
    console.error('Error al cancelar inscripción:', error)
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        'Error al cancelar la inscripción'
    )
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
    console.error('Error al obtener usuario:', error)
    throw error
  }
}

export const fetchEntrenadores = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/entrenadores`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error al obtener entrenadores:', error)
    throw error
  }
}

export const fetchClases = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/classes`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error al obtener clases:', error)
    throw error
  }
}

export const deleteClase = async (token, id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/classes/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error al eliminar clase:', error)
    throw error
  }
}

export const guardarClaseAPI = async (
  token,
  formData,
  editingId,
  modoCreacion
) => {
  try {
    const horariosInvalidos = formData.horarios.some(
      (h) => !h.hora || !h.duracion
    )

    if (horariosInvalidos) {
      throw new Error('Todos los horarios deben tener hora y duración')
    }

    if (modoCreacion === 'semanal' && !formData.diaSemana) {
      throw new Error('Debes seleccionar un día de la semana')
    }

    if (modoCreacion === 'fecha' && !formData.fecha) {
      throw new Error('Debes seleccionar una fecha específica')
    }

    const clasesCreadas = []
    const clasesConError = []

    for (const horario of formData.horarios) {
      const formDataToSend = new FormData()

      formDataToSend.append('nombre', formData.nombre)
      formDataToSend.append('descripcion', formData.descripcion)
      formDataToSend.append('horario', horario.hora)
      formDataToSend.append('duracion', horario.duracion)
      formDataToSend.append('capacidadMaxima', formData.capacidadMaxima)
      formDataToSend.append('categoria', formData.categoria)
      formDataToSend.append('nivel', formData.nivel)
      formDataToSend.append('ubicacion', formData.ubicacion)

      if (modoCreacion === 'semanal') {
        formDataToSend.append('diaSemana', formData.diaSemana)
        formDataToSend.append('fecha', '')
        formDataToSend.append('esFechaEspecifica', 'false')
      } else {
        formDataToSend.append('fecha', formData.fecha)
        formDataToSend.append('esFechaEspecifica', 'true')

        const fechaSeleccionada = new Date(formData.fecha)
        if (isValid(fechaSeleccionada)) {
          const diaSemanaCalculado = format(fechaSeleccionada, 'EEEE', {
            locale: es
          }).toLowerCase()
          formDataToSend.append('diaSemana', diaSemanaCalculado)
        } else {
          throw new Error('La fecha seleccionada no es válida')
        }
      }

      if (formData.entrenador && formData.entrenador !== '') {
        formDataToSend.append('entrenador', formData.entrenador)
      }

      if (
        formData.imagen &&
        formData.imagen instanceof File &&
        clasesCreadas.length === 0
      ) {
        formDataToSend.append('imagen', formData.imagen)
      }

      const url = editingId
        ? `${API_BASE_URL}/classes/${editingId}`
        : `${API_BASE_URL}/classes`

      const method = editingId ? 'PUT' : 'POST'

      try {
        const response = await fetch(url, {
          method,
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formDataToSend
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(
            data.message || `HTTP error! status: ${response.status}`
          )
        }

        clasesCreadas.push(data.data)
      } catch (error) {
        clasesConError.push({ horario: horario.hora, error: error.message })
      }
    }

    return {
      success: clasesCreadas.length > 0,
      clasesCreadas: clasesCreadas.length,
      clasesConError: clasesConError.length
    }
  } catch (error) {
    console.error('Error al guardar clase:', error)
    throw error
  }
}
