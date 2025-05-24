import { Facebook, Instagram } from 'lucide-react'
import { memo } from 'react'

const SocialTabs = memo(({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'instagram', icon: Instagram, label: 'Instagram' },
    { id: 'facebook', icon: Facebook, label: 'Facebook' }
  ]

  return (
    <div className='cf-social-tabs'>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`cf-social-tab ${
            activeTab === tab.id ? 'cf-social-tab-active' : ''
          }`}
          onClick={() => onTabChange(tab.id)}
        >
          <tab.icon className='cf-social-tab-icon' />
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  )
})

SocialTabs.displayName = 'SocialTabs'

export default SocialTabs
