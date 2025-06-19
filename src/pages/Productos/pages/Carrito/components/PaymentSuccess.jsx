import React from 'react'

const PaymentSuccess = React.memo(() => {
  return (
    <div className='payment-success'>
      <div className='payment-success-icon'>✓</div>
      <p>Tu pago ha sido procesado correctamente.</p>
      <p>Recibirás un correo con los detalles de tu compra.</p>
    </div>
  )
})

PaymentSuccess.displayName = 'PaymentSuccess'

export default PaymentSuccess
