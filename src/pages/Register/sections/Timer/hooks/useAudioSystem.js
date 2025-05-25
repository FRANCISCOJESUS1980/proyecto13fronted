import { useRef, useEffect, useCallback } from 'react'

export const useAudioSystem = () => {
  const audioContextRef = useRef(null)

  useEffect(() => {
    audioContextRef.current = new (window.AudioContext ||
      window.webkitAudioContext)()
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  const playBeep = useCallback(
    (frequency = 800, duration = 200, volume = 0.3) => {
      if (!audioContextRef.current) return

      try {
        const oscillator = audioContextRef.current.createOscillator()
        const gainNode = audioContextRef.current.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(audioContextRef.current.destination)

        oscillator.frequency.value = frequency
        oscillator.type = 'sine'

        gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime)
        gainNode.gain.linearRampToValueAtTime(
          volume,
          audioContextRef.current.currentTime + 0.01
        )
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          audioContextRef.current.currentTime + duration / 1000
        )

        oscillator.start(audioContextRef.current.currentTime)
        oscillator.stop(audioContextRef.current.currentTime + duration / 1000)
      } catch (error) {
        console.error('Error playing beep:', error)
      }
    },
    []
  )

  const playCountdownBeep = useCallback(
    (secondsLeft) => {
      if (secondsLeft <= 3 && secondsLeft > 0) {
        const frequency =
          secondsLeft === 1 ? 1200 : secondsLeft === 2 ? 1000 : 800
        const volume = secondsLeft === 1 ? 0.6 : secondsLeft === 2 ? 0.5 : 0.4
        playBeep(frequency, 300, volume)
      }
    },
    [playBeep]
  )

  const playWarningBeep = useCallback(() => {
    playBeep(600, 500, 0.4)
  }, [playBeep])

  const playFinalAlarm = useCallback(() => {
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        playBeep(1000, 800, 0.6)
      }, i * 300)
    }
  }, [playBeep])

  const playTransitionBeep = useCallback(
    (isWork) => {
      if (isWork) {
        playBeep(1200, 400, 0.5)
      } else {
        playBeep(600, 400, 0.4)
      }
    },
    [playBeep]
  )

  return {
    audioContextRef,
    playBeep,
    playCountdownBeep,
    playWarningBeep,
    playFinalAlarm,
    playTransitionBeep
  }
}
