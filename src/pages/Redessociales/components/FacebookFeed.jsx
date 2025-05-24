import { ThumbsUp, ArrowRight } from 'lucide-react'
import { memo } from 'react'
import { socialFeeds } from '../data/socialData'
import SocialPost from './SocialPost'

const FacebookFeed = memo(() => {
  return (
    <div className='cf-social-facebook-feed'>
      <div className='cf-social-feed-header'>
        <div className='cf-social-feed-profile'>
          <div className='cf-social-profile-image'>
            <img src='imagenes/logoalex.jpg' alt='AderCrossfit Profile' />
          </div>
          <div className='cf-social-profile-info'>
            <h3>AderCrossfit Oficial</h3>
            <p>Gimnasio/Centro de fitness</p>
          </div>
        </div>
        <a
          href='https://www.facebook.com/alex.adercrossfit/?locale=es_ES'
          target='_blank'
          rel='noopener noreferrer'
          className='cf-social-follow-button cf-social-facebook-button'
        >
          <span>Me gusta</span>
          <ThumbsUp size={16} />
        </a>
      </div>

      <div className='cf-social-feed-grid'>
        {socialFeeds.facebook.map((post) => (
          <SocialPost key={post.id} post={post} platform='facebook' />
        ))}
      </div>

      <div className='cf-social-feed-footer'>
        <a
          href='https://www.facebook.com/alex.adercrossfit/?locale=es_ES'
          target='_blank'
          rel='noopener noreferrer'
          className='cf-social-view-more cf-social-facebook-more'
        >
          <span>Ver más en Facebook</span>
          <ArrowRight size={16} />
        </a>
      </div>
    </div>
  )
})

FacebookFeed.displayName = 'FacebookFeed'

export default FacebookFeed
