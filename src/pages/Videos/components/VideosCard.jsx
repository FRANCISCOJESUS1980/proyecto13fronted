import React from 'react'

const VideoCard = React.memo(({ video, setVideoRef }) => {
  return (
    <div className='cf-video-card' ref={setVideoRef}>
      <div className='cf-video-frame'>
        <iframe
          width='100%'
          height='100%'
          src={`${video.url}?rel=0`}
          title={video.title}
          frameBorder='0'
          loading='lazy'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        />
      </div>
      <div className='cf-video-info'>
        <h3 className='cf-video-title'>{video.title}</h3>
        <p className='cf-video-description'>{video.description}</p>
      </div>
    </div>
  )
})

VideoCard.displayName = 'VideoCard'

export default VideoCard
