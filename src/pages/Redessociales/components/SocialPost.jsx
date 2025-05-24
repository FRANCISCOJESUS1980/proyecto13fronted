import { ThumbsUp, MessageCircle, Share2, Clock } from 'lucide-react'
import { memo } from 'react'

const SocialPost = memo(({ post, platform }) => {
  return (
    <div
      className={`cf-social-post ${
        platform === 'facebook' ? 'cf-social-facebook-post' : ''
      }`}
    >
      <div className='cf-social-post-image'>
        <img
          src={post.image || 'imagenes/grupocrosfit.JPG'}
          alt={`Post ${post.id}`}
        />
      </div>
      <div className='cf-social-post-content'>
        <p className='cf-social-post-caption'>{post.caption}</p>
        <div className='cf-social-post-stats'>
          <div className='cf-social-post-stat'>
            <ThumbsUp size={16} />
            <span>{post.likes}</span>
          </div>
          <div className='cf-social-post-stat'>
            <MessageCircle size={16} />
            <span>{post.comments}</span>
          </div>
          {platform === 'facebook' && post.shares && (
            <div className='cf-social-post-stat'>
              <Share2 size={16} />
              <span>{post.shares}</span>
            </div>
          )}
          <div className='cf-social-post-time'>
            <Clock size={16} />
            <span>{post.date}</span>
          </div>
        </div>
      </div>
    </div>
  )
})

SocialPost.displayName = 'SocialPost'

export default SocialPost
