import React from 'react'
import HeroSection from './HeroSection'
import PlanesMensuales from './PlanesMensuales'
import PlanesEspeciales from './PlanesEspeciales'
import BeneficiosSection from './BeneficiosSection'
import FAQSection from './FAQSection'
import { useTarifasOptimized } from '../hooks/useTarifasOptimized'

const TarifasContent = React.memo(() => {
  const { selectedPlan } = useTarifasOptimized()

  return (
    <main className='precios-main'>
      <HeroSection />

      {selectedPlan === 'mensual' && <PlanesMensuales />}
      {selectedPlan === 'especial' && <PlanesEspeciales />}

      <BeneficiosSection />
      <FAQSection />
    </main>
  )
})

TarifasContent.displayName = 'TarifasContent'

export default TarifasContent
