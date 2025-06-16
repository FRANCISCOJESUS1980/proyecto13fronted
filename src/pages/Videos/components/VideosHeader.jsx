import React from 'react'
import Button from '../../../components/Button/Button'
import { useVideosOptimized } from '../hooks/useVideosOptimized'

const VideosHeader = React.memo(() => {
  const { handleBackNavigation } = useVideosOptimized()

  return (
    <div className='cf-videos-header'>
      <Button
        variant='secondary'
        onClick={handleBackNavigation}
        leftIcon={<span>←</span>}
        className='cf-videos-backbutton'
      >
        Volver al Dashboard
      </Button>
      <h1 className='cf-videos-title'>Videos de Movimientos de CrossFit</h1>
    </div>
  )
})

VideosHeader.displayName = 'VideosHeader'

export default VideosHeader
