import { MapPin, Phone, Mail } from 'lucide-react'
import { memo } from 'react'

const ContactInfo = memo(() => {
  const contactData = [
    {
      icon: MapPin,
      label: 'Dirección',
      value: 'Calle Narciso Monturiol 11, San José de la Rinconada, España'
    },
    {
      icon: Phone,
      label: 'Teléfono',
      value: '+34 647 40 69 38'
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'contacto@crosfitgym.com'
    }
  ]

  return (
    <div className='cf-contacto-info'>
      <div className='cf-contacto-info-card'>
        <h2 className='cf-contacto-info-title'>Información de Contacto</h2>
        <div className='cf-contacto-info-items'>
          {contactData.map((item, index) => (
            <ContactInfoItem
              key={index}
              icon={item.icon}
              label={item.label}
              value={item.value}
            />
          ))}
        </div>
      </div>

      <div className='cf-contacto-mapa-container'>
        <iframe
          title='Ubicación Gimnasio'
          src='https://www.google.com/maps/embed?...'
          className='cf-contacto-mapa'
          allowFullScreen
          loading='lazy'
        ></iframe>
      </div>
    </div>
  )
})

const ContactInfoItem = ({ icon: Icon, label, value }) => (
  <div className='cf-contacto-info-item'>
    <div className='cf-contacto-info-icon'>
      <Icon size={20} />
    </div>
    <div className='cf-contacto-info-text'>
      <span className='cf-contacto-info-label'>{label}</span>
      <span className='cf-contacto-info-value'>{value}</span>
    </div>
  </div>
)

ContactInfo.displayName = 'ContactInfo'

export default ContactInfo
