import React from 'react'
import PlanCard from './PlanCard'
import { planes } from '../data/planesData'

const PlanesMensuales = React.memo(() => {
  return (
    <section className='planes-container'>
      {planes.map((plan, index) => (
        <PlanCard key={`mensual-${index}`} plan={plan} showPeriodo={true} />
      ))}
    </section>
  )
})

PlanesMensuales.displayName = 'PlanesMensuales'

export default PlanesMensuales
