import { useState, useEffect, useRef, useCallback } from 'react'
import { INITIAL_MEDICAL_INFO } from '../constants/medicalConfig'

export const useMedicalForm = () => {
  const [loading, setLoading] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(false)
  const [medicalInfo, setMedicalInfo] = useState(INITIAL_MEDICAL_INFO)
  const originalDataRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const setMedicalData = useCallback((data) => {
    setMedicalInfo(data)
    originalDataRef.current = JSON.stringify(data)
  }, [])

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setMedicalInfo((prev) => ({
      ...prev,
      [name]: value
    }))
  }, [])

  const checkFormChanges = useCallback(() => {
    if (!originalDataRef.current) return false
    const currentData = JSON.stringify(medicalInfo)
    return currentData !== originalDataRef.current
  }, [medicalInfo])

  const resetChanges = useCallback(() => {
    originalDataRef.current = JSON.stringify(medicalInfo)
  }, [medicalInfo])

  return {
    loading,
    setLoading,
    animationComplete,
    medicalInfo,
    setMedicalData,
    handleChange,
    checkFormChanges,
    resetChanges
  }
}
