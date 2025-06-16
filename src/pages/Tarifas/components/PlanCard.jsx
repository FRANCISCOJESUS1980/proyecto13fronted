import React from 'react'

const PlanCard = React.memo(({ plan, showPeriodo = true }) => {
  const handleSuscribir = React.useCallback(() => {
    console.log('Suscribirse al plan:', plan.nombre)
  }, [plan.nombre])

  return (
    <div className={`plan-card ${plan.popular ? 'popular' : ''}`}>
      {plan.popular && <div className='popular-badge'>Más Popular</div>}
      <h2>{plan.nombre}</h2>
      {plan.descripcion && (
        <div className='plan-descripcion'>{plan.descripcion}</div>
      )}
      {plan.sesiones && (
        <div className='sesiones-info'>
          <span className='sesiones-num'>{plan.sesiones}</span>
          <span className='sesiones-text'>
            {typeof plan.sesiones === 'number' ? 'sesiones' : ''}
          </span>
        </div>
      )}
      <div className='precio'>
        <span className='moneda'>€</span>
        <span className='cantidad'>{plan.precio}</span>
        {showPeriodo && <span className='periodo'>/mes</span>}
      </div>
      <button
        className={`btn-suscribir ${plan.popular ? 'popular' : ''}`}
        onClick={handleSuscribir}
      >
        Comenzar Ahora
      </button>
      <div className='caracteristicas'>
        <h3>Incluye:</h3>
        {plan.caracteristicas.map((caracteristica, i) => (
          <div key={i} className='caracteristica incluido'>
            <span className='check-icon'>✓</span>
            <span>{caracteristica}</span>
          </div>
        ))}
      </div>
    </div>
  )
})

PlanCard.displayName = 'PlanCard'

export default PlanCard
