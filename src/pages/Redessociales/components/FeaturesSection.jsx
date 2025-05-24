import { Award } from 'lucide-react'
import { memo } from 'react'
import { socialFeatures } from '../data/socialData'

const FeaturesSection = memo(() => {
  return (
    <div className='cf-social-features-section'>
      <h2 className='cf-social-section-title'>
        <span className='cf-social-section-icon'>
          <Award />
        </span>
        ¿Por qué seguirnos?
      </h2>

      <div className='cf-social-features-grid'>
        {socialFeatures.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  )
})

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className='cf-social-feature-card'>
    <div className='cf-social-feature-icon'>
      <Icon />
    </div>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
)

FeaturesSection.displayName = 'FeaturesSection'

export default FeaturesSection
