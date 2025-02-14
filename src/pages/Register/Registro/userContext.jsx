import { createContext, useState, useEffect } from 'react'

export const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Verificar si hay un token guardado y obtener la información del usuario
    const fetchUserData = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const response = await fetch('http://localhost:5000/api/users/me', {
            headers: { Authorization: `Bearer ${token}` }
          })
          const data = await response.json()
          if (response.ok) {
            setUser(data)
          }
        } catch (error) {
          console.error('Error obteniendo datos del usuario:', error)
        }
      }
    }

    fetchUserData()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
