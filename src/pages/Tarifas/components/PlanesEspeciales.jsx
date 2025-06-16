import React from 'react'
import PlanCard from './PlanCard'
import DropInCard from './DropinCard'
import { bonosEspeciales, dropIns } from '../data/planesData'

const PlanesEspeciales = React.memo(() => {
  return (
    <>
      <section className='planes-container'>
        {bonosEspeciales.map((plan, index) => (
          <PlanCard key={`especial-${index}`} plan={plan} showPeriodo={false} />
        ))}
      </section>

      <section className='drop-ins-container'>
        <h2>Drop-ins</h2>
        <div className='drop-ins-grid'>
          {dropIns.map((dropIn, index) => (
            <DropInCard key={`dropin-${index}`} dropIn={dropIn} />
          ))}
        </div>
      </section>
    </>
  )
})

PlanesEspeciales.displayName = 'PlanesEspeciales'

export default PlanesEspeciales
