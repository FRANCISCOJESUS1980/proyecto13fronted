import { memo } from 'react'
import { socialStats } from '../data/socialData'

const HeroSection = memo(() => {
  return (
    <div className='cf-social-hero'>
      <div className='cf-social-hero-content'>
        <h1 className='cf-social-heading'>
          <span className='cf-social-heading-highlight'>ADER</span>CROSSFIT
          <span className='cf-social-heading-dot'></span>
        </h1>
        <h2 className='cf-social-subheading'>Comunidad en Movimiento</h2>
        <p className='cf-social-description'>
          Conéctate con nuestra comunidad, comparte tus logros y mantente al día
          con los últimos eventos y WODs.
        </p>

        <div className='cf-social-stats'>
          {socialStats.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
            />
          ))}
        </div>
      </div>

      <div className='cf-social-hero-image'>
        <div className='cf-social-pulse-ring'></div>
        <img
          src='imagenes/logoalex.jpg'
          alt='AderCrossfit Logo'
          className='cf-social-logo-image'
        />
      </div>
    </div>
  )
})

const StatCard = ({ icon: Icon, value, label }) => (
  <div className='cf-social-stat'>
    <div className='cf-social-stat-icon'>
      <Icon />
    </div>
    <div className='cf-social-stat-content'>
      <span className='cf-social-stat-value'>{value}</span>
      <span className='cf-social-stat-label'>{label}</span>
    </div>
  </div>
)

HeroSection.displayName = 'HeroSection'

export default HeroSection
