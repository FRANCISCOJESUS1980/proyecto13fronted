import React from 'react'
import './Videos.css'
import Header from '../../../components/Header/page/Header'
import Loading from '../../../components/Loading/loading'
import VideosHeader from '../components/VideosHeader'
import VideosContent from '../components/VideosContent'
import { VideosProvider } from '../context/VideosContext'
import { useVideosOptimized } from '../hooks/useVideosOptimized'

const VideosInner = React.memo(() => {
  const { isLoading } = useVideosOptimized()

  if (isLoading) {
    return (
      <Loading
        isVisible={isLoading}
        loadingText='CARGANDO VIDEOS...'
        onComplete={() => {}}
      />
    )
  }

  return (
    <div className='cf-videos-container'>
      <Header />
      <VideosHeader />
      <VideosContent />
    </div>
  )
})

VideosInner.displayName = 'VideosInner'

const Videos = () => {
  return (
    <VideosProvider>
      <VideosInner />
    </VideosProvider>
  )
}

export default Videos
