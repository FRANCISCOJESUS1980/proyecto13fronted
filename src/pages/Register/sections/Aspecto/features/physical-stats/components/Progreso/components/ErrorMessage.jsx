const ErrorMessage = ({ error }) => {
  return (
    <div className='cf-progreso-error'>
      <span className='cf-progreso-error-icon'></span>
      <p>Error: {error}</p>
    </div>
  )
}

export default ErrorMessage
