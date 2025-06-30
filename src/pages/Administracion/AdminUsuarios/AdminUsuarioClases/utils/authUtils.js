export const getAuthToken = () => {
  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error('No hay token de autenticación')
  }
  return token
}

export const createAuthHeaders = (token) => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`
})
