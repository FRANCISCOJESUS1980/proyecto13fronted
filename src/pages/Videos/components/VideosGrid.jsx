import React from 'react'
import VideoCard from './VideosCard'
import { videosData } from '../data/videosData'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { useVideosOptimized } from '../hooks/useVideosOptimized'

const VideosGrid = React.memo(() => {
  const { isLoading } = useVideosOptimized()
  const { setVideoRef } = useIntersectionObserver(isLoading)

  return (
    <div className='cf-videos-grid'>
      {videosData.map((video, index) => (
        <VideoCard
          key={video.id}
          video={video}
          setVideoRef={setVideoRef(index)}
        />
      ))}
    </div>
  )
})

VideosGrid.displayName = 'VideosGrid'

export default VideosGrid
