const API_URL = 'http://localhost:5000/api'

export const fetchEntrenadoresAPI = async () => {
  const response = await fetch(`${API_URL}/users/entrenadores`)

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return await response.json()
}
