import { API_BASE_URL } from '../../../../../services/Api/config'
import { getAuthToken, createAuthHeaders } from '../utils/authUtils'

export const fetchUserClasses = async () => {
  const token = getAuthToken()

  const response = await fetch(`${API_BASE_URL}/classes`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    credentials: 'include'
  })

  if (!response.ok) {
    throw new Error(`Error al cargar clases: ${response.status}`)
  }

  const responseData = await response.json()
  return responseData.data || []
}

export const enrollUserInClass = async (claseId, userId) => {
  const token = getAuthToken()

  const response = await fetch(
    `${API_BASE_URL}/classes/${claseId}/inscribir-usuario`,
    {
      method: 'POST',
      headers: createAuthHeaders(token),
      body: JSON.stringify({ userId }),
      credentials: 'include'
    }
  )

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Error al inscribir al usuario')
  }

  const responseData = await response.json()

  if (!responseData.success) {
    throw new Error(responseData.message || 'Error al inscribir al usuario')
  }

  return responseData.data
}

export const cancelUserEnrollment = async (claseId, userId) => {
  const token = getAuthToken()

  const response = await fetch(
    `${API_BASE_URL}/classes/${claseId}/cancelar-usuario`,
    {
      method: 'POST',
      headers: createAuthHeaders(token),
      body: JSON.stringify({ userId }),
      credentials: 'include'
    }
  )

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Error al cancelar la inscripción')
  }

  const responseData = await response.json()

  if (!responseData.success) {
    throw new Error(responseData.message || 'Error al cancelar la inscripción')
  }

  return responseData.data
}
