const API_URL = 'http://localhost:5000/api'

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Error al registrar: ${errorText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error en registerUser:', error.message)
    throw error
  }
}

export const getUsers = async () => {
  try {
    const response = await fetch(`${API_URL}/users`)

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Error al obtener usuarios: ${errorText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error en getUsers:', error.message)
    throw error
  }
}
