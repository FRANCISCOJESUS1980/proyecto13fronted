import { ShoppingCart } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { Link } from 'react-router-dom'
import './Carticon.css'

const CartIcon = () => {
  const { getCartItemsCount } = useCart()
  const itemCount = getCartItemsCount()

  return (
    <Link to='/carrito' className='cf-cart-icon-container'>
      <ShoppingCart size={24} className='cf-cart-icon' />
      {itemCount > 0 && <span className='cf-cart-badge'>{itemCount}</span>}
    </Link>
  )
}

export default CartIcon
