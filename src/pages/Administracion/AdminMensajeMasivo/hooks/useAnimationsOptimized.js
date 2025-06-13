import { useEffect } from 'react'
import { useMensajeMasivoContext } from '../context/MensajeMasivoContext'

export const useAnimationsOptimized = (delay = 1000) => {
  const { setAnimationComplete } = useMensajeMasivoContext()

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay, setAnimationComplete])
}
