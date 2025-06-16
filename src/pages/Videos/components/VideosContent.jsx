import React from 'react'
import VideosDescription from './VideosDescription'
import VideosGrid from './VideosGrid'

const VideosContent = React.memo(() => {
  return (
    <main className='cf-videos-main'>
      <VideosDescription />
      <VideosGrid />
    </main>
  )
})

VideosContent.displayName = 'VideosContent'

export default VideosContent
