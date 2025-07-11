import React, { useRef, useEffect, useState, useCallback } from 'react'
import { useConsentimientoOptimized } from '../hooks/useConsentimientoOptimized'

const DigitalSignature = React.memo(() => {
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [isEmpty, setIsEmpty] = useState(true)
  const { setFirmaDigital } = useConsentimientoOptimized()

  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height

    const ctx = canvas.getContext('2d')
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.strokeStyle = '#000000'
    ctx.lineWidth = 2
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [])

  useEffect(() => {
    setupCanvas()
    window.addEventListener('resize', setupCanvas)
    return () => window.removeEventListener('resize', setupCanvas)
  }, [setupCanvas])

  const getEventPos = useCallback((e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const clientX = e.clientX || (e.touches && e.touches[0]?.clientX)
    const clientY = e.clientY || (e.touches && e.touches[0]?.clientY)
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    }
  }, [])

  const startDrawing = useCallback(
    (e) => {
      e.preventDefault()
      setIsDrawing(true)
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      const pos = getEventPos(e)
      ctx.beginPath()
      ctx.moveTo(pos.x, pos.y)
    },
    [getEventPos]
  )

  const draw = useCallback(
    (e) => {
      if (!isDrawing) return
      e.preventDefault()
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      const pos = getEventPos(e)
      ctx.lineTo(pos.x, pos.y)
      ctx.stroke()
      setIsEmpty(false)
    },
    [isDrawing, getEventPos]
  )

  const stopDrawing = useCallback(
    (e) => {
      if (!isDrawing) return
      e.preventDefault()
      setIsDrawing(false)
      const canvas = canvasRef.current
      const dataURL = canvas.toDataURL('image/png')
      setFirmaDigital(dataURL)
    },
    [isDrawing, setFirmaDigital]
  )

  const clearSignature = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    setIsEmpty(true)
    setFirmaDigital('')
  }, [setFirmaDigital])

  return (
    <div className='consent-section'>
      <h4>FIRMA DIGITAL</h4>
      <div className='signature-container'>
        <p className='signature-instructions'>
          Firma en el recuadro de abajo usando el ratón (ordenador) o el dedo
          (móvil)
        </p>
        <div className='signature-pad-container'>
          <canvas
            ref={canvasRef}
            className='signature-pad'
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
          {isEmpty && <div className='signature-placeholder'>Firma aquí</div>}
        </div>
        <div className='signature-actions'>
          <button
            type='button'
            className='clear-signature-btn'
            onClick={clearSignature}
            disabled={isEmpty}
          >
            Limpiar Firma
          </button>
        </div>
      </div>
    </div>
  )
})

DigitalSignature.displayName = 'DigitalSignature'
export default DigitalSignature
