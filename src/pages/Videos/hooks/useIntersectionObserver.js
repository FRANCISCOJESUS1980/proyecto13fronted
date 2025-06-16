import { useEffect, useRef } from 'react'

export const useIntersectionObserver = (isLoading) => {
  const videoRefs = useRef([])

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('cf-video-card-visible')
        }
      })
    }, options)

    if (!isLoading) {
      videoRefs.current.forEach((el) => {
        if (el) observer.observe(el)
      })
    }

    return () => {
      videoRefs.current.forEach((el) => {
        if (el) observer.unobserve(el)
      })
    }
  }, [isLoading])

  const setVideoRef = (index) => (el) => {
    videoRefs.current[index] = el
  }

  return { setVideoRef }
}
