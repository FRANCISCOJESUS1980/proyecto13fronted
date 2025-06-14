import React from 'react'

const ConsentTitle = React.memo(() => {
  return (
    <div className='consent-section'>
      <h3>CENTRO DEPORTIVO ADERCROSSFIT</h3>
      <p className='subtitle'>Manuel Alexandre Atienza Sobrino 45654031-C</p>
      <h4>CONSENTIMIENTO INFORMADO Y AUTORIZACION DE IMAGEN</h4>
    </div>
  )
})

ConsentTitle.displayName = 'ConsentTitle'

export default ConsentTitle
