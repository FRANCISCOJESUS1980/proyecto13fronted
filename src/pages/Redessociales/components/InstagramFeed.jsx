import { ArrowRight } from 'lucide-react'
import { memo } from 'react'
import { socialFeeds } from '../data/socialData'
import SocialPost from './SocialPost'

const InstagramFeed = memo(() => {
  return (
    <div className='cf-social-instagram-feed'>
      <div className='cf-social-feed-header'>
        <div className='cf-social-feed-profile'>
          <div className='cf-social-profile-image'>
            <img src='imagenes/logoalex.jpg' alt='AderCrossfit Profile' />
          </div>
          <div className='cf-social-profile-info'>
            <h3>adercrossfit</h3>
            <p>Box de CrossFit Oficial</p>
          </div>
        </div>
        <a
          href='https://www.instagram.com/adercrossfit/'
          target='_blank'
          rel='noopener noreferrer'
          className='cf-social-follow-button'
        >
          <span>Seguir</span>
          <ArrowRight size={16} />
        </a>
      </div>

      <div className='cf-social-feed-grid'>
        {socialFeeds.instagram.map((post) => (
          <SocialPost key={post.id} post={post} platform='instagram' />
        ))}
      </div>

      <div className='cf-social-feed-footer'>
        <a
          href='https://www.instagram.com/adercrossfit/'
          target='_blank'
          rel='noopener noreferrer'
          className='cf-social-view-more'
        >
          <span>Ver más en Instagram</span>
          <ArrowRight size={16} />
        </a>
      </div>
    </div>
  )
})

InstagramFeed.displayName = 'InstagramFeed'

export default InstagramFeed
