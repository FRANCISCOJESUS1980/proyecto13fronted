import './Consentimiento.css'
import ConsentForm from '../components/ConsentForm'
import { ConsentimientoProvider } from '../context/ConsentimientoContext'

const Consentimiento = ({ onConsentAccepted }) => {
  return (
    <ConsentimientoProvider onConsentAccepted={onConsentAccepted}>
      <div className='consentimiento-container'>
        <ConsentForm />
      </div>
    </ConsentimientoProvider>
  )
}

export default Consentimiento
