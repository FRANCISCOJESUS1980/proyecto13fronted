import React from 'react'

const VideosDescription = React.memo(() => {
  return (
    <p className='cf-videos-description'>
      Aprende la técnica correcta de los principales movimientos de CrossFit con
      nuestros videos explicativos. Dominar estos movimientos te ayudará a
      mejorar tu rendimiento y prevenir lesiones.
    </p>
  )
})

VideosDescription.displayName = 'VideosDescription'

export default VideosDescription
