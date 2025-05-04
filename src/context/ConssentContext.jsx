import { createContext, useContext } from 'react'

const ConsentContext = createContext()

export const useConsent = () => useContext(ConsentContext)

export const ConsentProvider = ({ children }) => {
  return (
    <ConsentContext.Provider value={{}}>{children}</ConsentContext.Provider>
  )
}

export default ConsentContext
