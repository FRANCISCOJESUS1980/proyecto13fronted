import React from 'react'

const FormHeader = React.memo(() => {
  return (
    <>
      <div className='cf-logo-wrapper'>
        <div className='cf-dumbbell-logo'></div>
      </div>
      <h2 className='cf-admin-mensaje-masivo-heading'>Mensaje Masivo</h2>
    </>
  )
})

FormHeader.displayName = 'FormHeader'

export default FormHeader
