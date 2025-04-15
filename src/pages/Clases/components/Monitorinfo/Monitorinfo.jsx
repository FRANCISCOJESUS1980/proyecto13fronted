import { User } from 'lucide-react'
import { getImageUrl } from '../../utils/imageUtils'
import './MonitorInfo.css'

const MonitorInfo = ({ monitor }) => {
  if (!monitor) return null

  const avatarUrl = getImageUrl(monitor)

  return (
    <div className='cf-monitor-info'>
      <div className='cf-monitor-avatar'>
        {avatarUrl ? (
          <img
            src={avatarUrl || '/placeholder.svg'}
            alt={monitor.nombre}
            onError={(e) => {
              if (e.target.src !== '/default-avatar.png') {
                e.target.src = '/default-avatar.png'
              }
            }}
          />
        ) : (
          <div className='cf-monitor-avatar-placeholder'>
            <User size={16} />
          </div>
        )}
      </div>
      <div className='cf-monitor-details'>
        <span className='cf-monitor-label'>Monitor:</span>
        <span className='cf-monitor-name'>{monitor.nombre}</span>
      </div>
    </div>
  )
}

export default MonitorInfo
