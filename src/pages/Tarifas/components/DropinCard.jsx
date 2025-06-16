import React from 'react'

const DropInCard = React.memo(({ dropIn }) => {
  return (
    <div className='drop-in-card'>
      <h3>{dropIn.nombre}</h3>
      <p className='drop-in-descripcion'>{dropIn.descripcion}</p>
      <div className='drop-in-precio'>
        <span className='moneda'>€</span>
        <span className='cantidad'>{dropIn.precio}</span>
      </div>
    </div>
  )
})

DropInCard.displayName = 'DropInCard'

export default DropInCard
