import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus, ArrowLeft, CreditCard, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Header from '../../../../components/Header/Header'
import { useCart } from '../../context/CartContext'
import { procesarPago } from '../../../../services/Api/index'
import Button from '../../../../components/Button/Button'
import './Carrito.css'

const Carrito = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } =
    useCart()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expMonth: '',
    expYear: '',
    cvc: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setPaymentInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckout = () => {
    if (cartItems.length === 0) return
    setShowPaymentForm(true)
  }

  const handlePayment = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (
        !paymentInfo.cardNumber ||
        !paymentInfo.cardName ||
        !paymentInfo.expMonth ||
        !paymentInfo.expYear ||
        !paymentInfo.cvc
      ) {
        throw new Error('Por favor complete todos los campos de pago')
      }

      const orderData = {
        items: cartItems.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
          price: item.precio
        })),
        total: getCartTotal(),
        payment: {
          ...paymentInfo,
          cardNumber: paymentInfo.cardNumber.replace(/\d(?=\d{4})/g, '*')
        }
      }

      const response = await procesarPago(orderData)

      setSuccess(true)
      clearCart()

      setTimeout(() => {
        setShowPaymentForm(false)
        setSuccess(false)
      }, 3000)
    } catch (error) {
      console.error('Error al procesar el pago:', error)
      setError(error.message || 'Hubo un error al procesar el pago')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='carrito-container'>
      <Header />
      <div className='carrito-content'>
        <div className='carrito-header'>
          <h1 className='carrito-title'>Tu Carrito</h1>
          <Button
            onClick={() => navigate('/productos')}
            variant='secondary'
            size='md'
            leftIcon={<ArrowLeft size={16} />}
          >
            Continuar comprando
          </Button>
        </div>

        {cartItems.length === 0 ? (
          <div className='carrito-empty'>
            <div className='carrito-empty-icon'></div>
            <h3 className='carrito-empty-title'>Tu carrito está vacío</h3>
            <p className='carrito-empty-text'>
              Parece que aún no has añadido productos a tu carrito.
            </p>
            <Link to='/productos' className='carrito-empty-btn'>
              Ver productos
            </Link>
          </div>
        ) : (
          <div className='carrito-layout'>
            <div className='carrito-items-container'>
              <div className='carrito-items-header'>
                <span className='carrito-header-producto'>Producto</span>
                <span className='carrito-header-precio'>Precio</span>
                <span className='carrito-header-cantidad'>Cantidad</span>
                <span className='carrito-header-total'>Total</span>
                <span className='carrito-header-acciones'></span>
              </div>

              {cartItems.map((item) => (
                <div key={item._id} className='carrito-item'>
                  <div className='carrito-item-producto'>
                    <img
                      src={item.imagen || '/placeholder.svg'}
                      alt={item.nombre}
                      className='carrito-item-imagen'
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src = '/placeholder.svg'
                      }}
                    />
                    <div className='carrito-item-detalles'>
                      <h3 className='carrito-item-nombre'>{item.nombre}</h3>
                      <p className='carrito-item-marca'>{item.marca}</p>
                    </div>
                  </div>

                  <div className='carrito-item-precio'>
                    ${item.precio.toFixed(2)}
                  </div>

                  <div className='carrito-item-cantidad'>
                    <button
                      className='carrito-cantidad-btn'
                      onClick={() =>
                        updateQuantity(item._id, item.quantity - 1)
                      }
                      aria-label='Disminuir cantidad'
                    >
                      <Minus size={16} />
                    </button>
                    <span className='carrito-cantidad-valor'>
                      {item.quantity}
                    </span>
                    <button
                      className='carrito-cantidad-btn'
                      onClick={() =>
                        updateQuantity(item._id, item.quantity + 1)
                      }
                      aria-label='Aumentar cantidad'
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <div className='carrito-item-total'>
                    ${(item.precio * item.quantity).toFixed(2)}
                  </div>

                  <div className='carrito-item-acciones'>
                    <button
                      className='carrito-eliminar-btn'
                      onClick={() => removeFromCart(item._id)}
                      aria-label='Eliminar producto'
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}

              <div className='carrito-actions'>
                <Button onClick={clearCart} variant='secondary' size='md'>
                  Vaciar carrito
                </Button>
              </div>
            </div>

            <div className='carrito-resumen'>
              <h2 className='carrito-resumen-titulo'>Resumen de compra</h2>

              <div className='carrito-resumen-detalles'>
                <div className='carrito-resumen-fila'>
                  <span>Subtotal</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className='carrito-resumen-fila'>
                  <span>Envío</span>
                  <span>Gratis</span>
                </div>
                <div className='carrito-resumen-total'>
                  <span>Total</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
              </div>

              <Button
                onClick={handleCheckout}
                disabled={cartItems.length === 0}
                variant='primary'
                size='lg'
                leftIcon={<CreditCard size={18} />}
              >
                Proceder al pago
              </Button>
            </div>
          </div>
        )}

        {showPaymentForm && (
          <div className='payment-overlay'>
            <div className='payment-modal'>
              <button
                className='payment-close'
                onClick={() => setShowPaymentForm(false)}
                aria-label='Cerrar'
              >
                <X size={24} />
              </button>

              <h2 className='payment-title'>
                {success ? '¡Pago exitoso!' : 'Información de pago'}
              </h2>

              {success ? (
                <div className='payment-success'>
                  <div className='payment-success-icon'>✓</div>
                  <p>Tu pago ha sido procesado correctamente.</p>
                  <p>Recibirás un correo con los detalles de tu compra.</p>
                </div>
              ) : (
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
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(
                          (month) => (
                            <option
                              key={month}
                              value={month.toString().padStart(2, '0')}
                            >
                              {month.toString().padStart(2, '0')}
                            </option>
                          )
                        )}
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
                        {Array.from(
                          { length: 10 },
                          (_, i) => new Date().getFullYear() + i
                        ).map((year) => (
                          <option key={year} value={year.toString()}>
                            {year}
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
                    <span>${getCartTotal().toFixed(2)}</span>
                  </div>

                  <button
                    type='submit'
                    className='payment-submit-btn'
                    disabled={loading}
                  >
                    {loading ? 'Procesando...' : 'Pagar ahora'}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Carrito
