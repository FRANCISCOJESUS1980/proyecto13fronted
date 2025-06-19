import React from 'react'
import { useCarritoOptimized } from '../hooks/useCarritoOptimized'
import {
  generateMonthOptions,
  generateYearOptions,
  formatPrice
} from '../utils/paymentUtils'

const PaymentForm = React.memo(() => {
  const {
    paymentInfo,
    cartTotal,
    loading,
    error,
    handleInputChange,
    handlePayment
  } = useCarritoOptimized()

  const monthOptions = generateMonthOptions()
  const yearOptions = generateYearOptions()

  return (
    <form onSubmit={handlePayment} className='payment-form'>
      {error && <div className='payment-error'>{error}</div>}

      <div className='payment-group'>
        <label htmlFor='cardName'>Nombre en la tarjeta</label>
        <input
          type='text'
          id='cardName'
          name='cardName'
          value={paymentInfo.cardName}
          onChange={handleInputChange}
          placeholder='Nombre como aparece en la tarjeta'
          required
        />
      </div>

      <div className='payment-group'>
        <label htmlFor='cardNumber'>Número de tarjeta</label>
        <input
          type='text'
          id='cardNumber'
          name='cardNumber'
          value={paymentInfo.cardNumber}
          onChange={handleInputChange}
          placeholder='1234 5678 9012 3456'
          maxLength='19'
          required
        />
      </div>

      <div className='payment-row'>
        <div className='payment-group'>
          <label htmlFor='expMonth'>Mes</label>
          <select
            id='expMonth'
            name='expMonth'
            value={paymentInfo.expMonth}
            onChange={handleInputChange}
            required
          >
            <option value=''>MM</option>
            {monthOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className='payment-group'>
          <label htmlFor='expYear'>Año</label>
          <select
            id='expYear'
            name='expYear'
            value={paymentInfo.expYear}
            onChange={handleInputChange}
            required
          >
            <option value=''>AAAA</option>
            {yearOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className='payment-group'>
          <label htmlFor='cvc'>CVC</label>
          <input
            type='text'
            id='cvc'
            name='cvc'
            value={paymentInfo.cvc}
            onChange={handleInputChange}
            placeholder='123'
            maxLength='4'
            required
          />
        </div>
      </div>

      <div className='payment-total'>
        <span>Total a pagar:</span>
        <span>{formatPrice(cartTotal)}</span>
      </div>

      <button type='submit' className='payment-submit-btn' disabled={loading}>
        {loading ? 'Procesando...' : 'Pagar ahora'}
      </button>
    </form>
  )
})

PaymentForm.displayName = 'PaymentForm'

export default PaymentForm
