import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentUserId, setCurrentUserId] = useState(null)

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart')
      const userId = localStorage.getItem('userId')

      if (savedCart) {
        const parsedCart = JSON.parse(savedCart)
        console.log('Carrito cargado desde localStorage:', parsedCart)
        setCartItems(parsedCart)
      }

      setCurrentUserId(userId)
    } catch (error) {
      console.error('Error al cargar el carrito:', error)
      setCartItems([])
    } finally {
      setIsLoaded(true)
    }
  }, [])

  useEffect(() => {
    const checkUserChange = () => {
      const userId = localStorage.getItem('userId')

      if (userId !== currentUserId) {
        console.log(
          `Cambio de usuario detectado: ${currentUserId} -> ${userId}`
        )
        console.log('Limpiando carrito por cambio de usuario')

        setCartItems([])
        localStorage.removeItem('cart')

        setCurrentUserId(userId)
      }
    }

    const interval = setInterval(checkUserChange, 1000)

    const handleStorageChange = (e) => {
      if (e.key === 'userId' || e.key === 'token') {
        checkUserChange()
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      clearInterval(interval)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [currentUserId])

  useEffect(() => {
    if (isLoaded) {
      try {
        console.log('Guardando carrito en localStorage:', cartItems)
        localStorage.setItem('cart', JSON.stringify(cartItems))
      } catch (error) {
        console.error('Error al guardar el carrito:', error)
      }
    }
  }, [cartItems, isLoaded])

  const addToCart = (product) => {
    console.log('Agregando producto al carrito:', product)
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item._id === product._id
      )

      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        }
        console.log(
          'Producto existente, nueva cantidad:',
          updatedItems[existingItemIndex].quantity
        )
        return updatedItems
      } else {
        const newItems = [...prevItems, { ...product, quantity: 1 }]
        console.log('Producto nuevo agregado, total items:', newItems.length)
        return newItems
      }
    })
  }

  const removeFromCart = (productId) => {
    console.log('Eliminando producto del carrito:', productId)
    setCartItems((prevItems) =>
      prevItems.filter((item) => item._id !== productId)
    )
  }

  const updateQuantity = (productId, quantity) => {
    console.log(
      'Actualizando cantidad:',
      productId,
      'nueva cantidad:',
      quantity
    )

    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === productId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    console.log('Limpiando carrito completo')
    setCartItems([])
  }

  const getCartTotal = () => {
    const total = cartItems.reduce(
      (total, item) => total + item.precio * item.quantity,
      0
    )
    return total
  }

  const getCartItemsCount = () => {
    const count = cartItems.reduce((count, item) => count + item.quantity, 0)
    return count
  }

  const isInCart = (productId) => {
    return cartItems.some((item) => item._id === productId)
  }

  const getItemQuantity = (productId) => {
    const item = cartItems.find((item) => item._id === productId)
    return item ? item.quantity : 0
  }

  const value = {
    cartItems,
    isLoaded,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    isInCart,
    getItemQuantity
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
