import React from 'react'
import { useTarifasOptimized } from '../hooks/useTarifasOptimized'

const HeroSection = React.memo(() => {
  const { selectedPlan, setSelectedPlan } = useTarifasOptimized()

  const handlePlanChange = React.useCallback(
    (plan) => {
      setSelectedPlan(plan)
    },
    [setSelectedPlan]
  )

  return (
    <section className='precios-hero'>
      <h1>Tarifas 2025</h1>
      <p>Elige el bono que mejor se adapte a tu rutina de entrenamiento</p>

      <div className='planes-tipo'>
        <button
          className={`plan-btn ${selectedPlan === 'mensual' ? 'active' : ''}`}
          onClick={() => handlePlanChange('mensual')}
        >
          Bonos Mensuales
        </button>
        <button
          className={`plan-btn ${selectedPlan === 'especial' ? 'active' : ''}`}
          onClick={() => handlePlanChange('especial')}
        >
          Bonos Especiales
        </button>
      </div>
    </section>
  )
})

HeroSection.displayName = 'HeroSection'

export default HeroSection
