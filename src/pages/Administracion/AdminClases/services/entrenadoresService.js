/*const API_URL = 'http://localhost:5000/api'

export const fetchEntrenadoresAPI = async () => {
  const response = await fetch(`${API_URL}/users/entrenadores`)

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return await response.json()
}*/
import { fetchEntrenadores as fetchEntrenadoresApi } from '../../../../services/api'

export const fetchEntrenadoresAPI = async () => {
  return await fetchEntrenadoresApi()
}
