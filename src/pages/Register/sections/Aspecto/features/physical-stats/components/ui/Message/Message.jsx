import './Message.css'

const Message = ({ text, type, onClose }) => {
  if (!text) return null

  return (
    <div className={`message-container message-${type}`}>
      <div className='message-content'>
        <span className='message-text'>{text}</span>
        <button
          className='message-close'
          onClick={onClose}
          aria-label='Cerrar mensaje'
        >
          ×
        </button>
      </div>
    </div>
  )
}

export default Message
