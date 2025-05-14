import { useRef, useEffect } from 'react'
import logo from '../../../../../public/imagenes/logoalex.jpg'
import './logo.css'

const Logo = ({ menuOpen }) => {
  const logoRef = useRef(null)

  useEffect(() => {
    if (!logoRef.current || menuOpen) return

    const logo = logoRef.current

    const handleMouseMove = (e) => {
      const rect = logo.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const tiltX = ((y - centerY) / centerY) * 10
      const tiltY = ((centerX - x) / centerX) * 10

      logo.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`
    }

    const handleMouseLeave = () => {
      logo.style.transform =
        'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)'
    }

    logo.addEventListener('mousemove', handleMouseMove)
    logo.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      logo.removeEventListener('mousemove', handleMouseMove)
      logo.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [menuOpen])

  return (
    <div className='cf-logo-container' ref={logoRef}>
      <div className='cf-logo-reflection'></div>
      <img
        src={logo || '/placeholder.svg'}
        alt='Logo CrossFit Box'
        className='cf-logo'
        loading='eager'
      />
      <div className='cf-logo-glow'></div>
      <div className='cf-logo-shine'></div>
    </div>
  )
}

export default Logo
