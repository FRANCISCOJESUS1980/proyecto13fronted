import { Share2 } from 'lucide-react'
import { memo } from 'react'
import SocialTabs from './SocialTabs'
import InstagramFeed from './InstagramFeed'
import FacebookFeed from './FacebookFeed'

const SocialNetworksSection = memo(({ activeTab, onTabChange }) => {
  return (
    <div className='cf-social-networks-section'>
      <h2 className='cf-social-section-title'>
        <span className='cf-social-section-icon'>
          <Share2 />
        </span>
        Nuestras Redes Sociales
      </h2>

      <SocialTabs activeTab={activeTab} onTabChange={onTabChange} />

      <div className='cf-social-tab-content'>
        {activeTab === 'instagram' && <InstagramFeed />}
        {activeTab === 'facebook' && <FacebookFeed />}
      </div>
    </div>
  )
})

SocialNetworksSection.displayName = 'SocialNetworksSection'

export default SocialNetworksSection
