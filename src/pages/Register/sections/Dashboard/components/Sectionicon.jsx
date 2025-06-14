import React from 'react'
import { Dumbbell, ShoppingBag, Video, Timer } from 'lucide-react'

const SectionIcon = React.memo(({ iconType }) => {
  const renderIcon = () => {
    switch (iconType) {
      case 'timer':
        return (
          <Timer className='cf-dash-section-icon' size={24} strokeWidth={2} />
        )
      case 'medical':
        return (
          <span className='cf-dash-section-icon cf-dash-medical-icon'></span>
        )
      case 'physical':
        return (
          <span className='cf-dash-section-icon cf-dash-physical-icon'></span>
        )
      case 'chat':
        return <span className='cf-dash-section-icon cf-dash-chat-icon'></span>
      case 'message':
        return (
          <span className='cf-dash-section-icon cf-dash-message-icon'></span>
        )
      case 'record':
        return (
          <span className='cf-dash-section-icon cf-dash-record-icon'></span>
        )
      case 'profile':
        return (
          <span className='cf-dash-section-icon cf-dash-profile-icon'></span>
        )
      case 'video':
        return (
          <Video className='cf-dash-section-icon' size={24} strokeWidth={2} />
        )
      case 'class':
        return (
          <Dumbbell
            className='cf-dash-section-icon'
            size={24}
            strokeWidth={2}
          />
        )
      case 'product':
        return (
          <ShoppingBag
            className='cf-dash-section-icon'
            size={24}
            strokeWidth={2}
          />
        )
      default:
        return (
          <span className='cf-dash-section-icon cf-dash-default-icon'></span>
        )
    }
  }

  return renderIcon()
})

SectionIcon.displayName = 'SectionIcon'

export default SectionIcon
