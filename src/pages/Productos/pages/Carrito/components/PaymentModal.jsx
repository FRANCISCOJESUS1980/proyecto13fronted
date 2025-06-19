import React from 'react'
import { X } from 'lucide-react'
import PaymentForm from './PaymentForm'
import PaymentSuccess from './PaymentSuccess'
import { useCarritoOptimized } from '../hooks/useCarritoOptimized'

const PaymentModal = React.memo(() => {
  const { success, handleClosePaymentForm } = useCarritoOptimized()

  return (
    <div className='payment-overlay'>
      <div className='payment-modal'>
        <button
          className='payment-close'
          onClick={handleClosePaymentForm}
          aria-label='Cerrar'
        >
          <X size={24} />
        </button>

        <h2 className='payment-title'>
          {success ? '¡Pago exitoso!' : 'Información de pago'}
        </h2>

        {success ? <PaymentSuccess /> : <PaymentForm />}
      </div>
    </div>
  )
})

PaymentModal.displayName = 'PaymentModal'

export default PaymentModal
