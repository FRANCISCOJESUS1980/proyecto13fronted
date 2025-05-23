import { createContext, useContext } from 'react'
import { useMedicalInfoState } from '../hooks/useMedicalinfoState'

const MedicalInfoContext = createContext(null)

export const MedicalInfoProvider = ({ children }) => {
  const medicalInfoState = useMedicalInfoState()

  return (
    <MedicalInfoContext.Provider value={medicalInfoState}>
      {children}
    </MedicalInfoContext.Provider>
  )
}

export const useMedicalInfoContext = () => {
  const context = useContext(MedicalInfoContext)
  if (!context) {
    throw new Error(
      'useMedicalInfoContext debe ser usado dentro de un MedicalInfoProvider'
    )
  }
  return context
}
