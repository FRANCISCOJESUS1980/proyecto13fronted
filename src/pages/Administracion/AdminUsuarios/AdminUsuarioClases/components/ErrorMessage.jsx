const ErrorMessage = ({ error, className = '' }) => {
  return (
    <div className={`cf-error-container ${className}`}>
      <div className='cf-error-icon'></div>
      <p className='cf-error-text'>Error: {error}</p>
    </div>
  )
}

export default ErrorMessage
