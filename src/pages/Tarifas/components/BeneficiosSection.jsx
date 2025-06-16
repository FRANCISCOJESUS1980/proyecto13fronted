import React from 'react'
import { beneficios } from '../data/planesData'

const BeneficiosSection = React.memo(() => {
  return (
    <section className='beneficios'>
      <h2>¿Por qué elegir nuestro Box?</h2>
      <div className='beneficios-grid'>
        {beneficios.map((beneficio, index) => (
          <div key={index} className='beneficio'>
            <h3>{beneficio.titulo}</h3>
            <p>{beneficio.descripcion}</p>
          </div>
        ))}
      </div>
    </section>
  )
})

BeneficiosSection.displayName = 'BeneficiosSection'

export default BeneficiosSection
