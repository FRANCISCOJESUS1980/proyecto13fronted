import { useState } from 'react'
import './Consentimiento.css'

const Consentimiento = ({ onConsentAccepted }) => {
  const [aceptado, setAceptado] = useState(false)

  const handleAccept = () => {
    setAceptado(true)
    onConsentAccepted()
  }

  return (
    <div className='consentimiento-container'>
      {!aceptado ? (
        <>
          <h2>Consentimiento</h2>
          <embed
            src='/public/consentimiento/Consentimiento adercrosfit.pdf'
            type='application/pdf'
            width='100%'
            height='500px'
          />
          <button onClick={handleAccept}>Aceptar</button>
        </>
      ) : null}
    </div>
  )
}

export default Consentimiento
