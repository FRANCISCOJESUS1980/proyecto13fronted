import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback
} from 'react'
import {
  obtenerCarrito,
  guardarCarrito,
  agregarProductoCarrito,
  actualizarCantidadProducto,
  eliminarProductoCarrito,
  limpiarCarrito
} from '../../../services/Api/index'

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
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const getAuthToken = useCallback(() => {
    return localStorage.getItem('token')
  }, [])

  const checkAuthentication = useCallback(() => {
    const token = getAuthToken()
    const userId = localStorage.getItem('userId')
    return !!(token && userId)
  }, [getAuthToken])

  useEffect(() => {
    const loadInitialCart = async () => {
      try {
        const token = getAuthToken()
        const userId = localStorage.getItem('userId')
        const authenticated = checkAuthentication()

        setIsAuthenticated(authenticated)
        setCurrentUserId(userId)

        if (authenticated && token) {
          try {
            const response = await obtenerCarrito(token)
            const mongoItems = response.data?.items || []
            setCartItems(mongoItems)
          } catch (error) {
            console.error('Error al cargar carrito desde MongoDB:', error)

            const savedCart = localStorage.getItem('cart')
            if (savedCart) {
              const parsedCart = JSON.parse(savedCart)
              setCartItems(parsedCart)
            }
          }
        } else {
          const savedCart = localStorage.getItem('cart')
          if (savedCart) {
            const parsedCart = JSON.parse(savedCart)
            setCartItems(parsedCart)
          }
        }
      } catch (error) {
        console.error('Error al cargar el carrito inicial:', error)
        setCartItems([])
      } finally {
        setIsLoaded(true)
      }
    }

    loadInitialCart()
  }, [getAuthToken, checkAuthentication])

  useEffect(() => {
    const checkUserChange = async () => {
      const userId = localStorage.getItem('userId')
      const authenticated = checkAuthentication()

      if (userId !== currentUserId || authenticated !== isAuthenticated) {
        setCartItems([])
        localStorage.removeItem('cart')
        setCurrentUserId(userId)
        setIsAuthenticated(authenticated)

        if (authenticated && userId) {
          try {
            const token = getAuthToken()
            const response = await obtenerCarrito(token)
            const mongoItems = response.data?.items || []
            setCartItems(mongoItems)
          } catch (error) {
            console.error('Error al cargar carrito del nuevo usuario:', error)
          }
        }
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
  }, [currentUserId, isAuthenticated, checkAuthentication, getAuthToken])

  useEffect(() => {
    if (isLoaded && !isAuthenticated) {
      try {
        localStorage.setItem('cart', JSON.stringify(cartItems))
      } catch (error) {
        console.error('Error al guardar el carrito en localStorage:', error)
      }
    }
  }, [cartItems, isLoaded, isAuthenticated])

  const syncWithMongoDB = useCallback(
    async (items) => {
      if (!isAuthenticated) return

      try {
        const token = getAuthToken()
        if (token) {
          await guardarCarrito(token, { items })
        }
      } catch (error) {
        console.error('Error al sincronizar carrito con MongoDB:', error)
      }
    },
    [isAuthenticated, getAuthToken]
  )

  const addToCart = useCallback(
    async (product) => {
      if (isAuthenticated) {
        try {
          const token = getAuthToken()
          const response = await agregarProductoCarrito(token, product._id, 1)
          setCartItems(response.data.items)
        } catch (error) {
          console.error('Error al agregar producto via MongoDB:', error)

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
              return updatedItems
            } else {
              return [...prevItems, { ...product, quantity: 1 }]
            }
          })
        }
      } else {
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
            return updatedItems
          } else {
            const newItems = [...prevItems, { ...product, quantity: 1 }]

            return newItems
          }
        })
      }
    },
    [isAuthenticated, getAuthToken]
  )

  const removeFromCart = useCallback(
    async (productId) => {
      if (isAuthenticated) {
        try {
          const token = getAuthToken()
          const response = await eliminarProductoCarrito(token, productId)
          setCartItems(response.data.items)
        } catch (error) {
          console.error('Error al eliminar producto via MongoDB:', error)

          setCartItems((prevItems) =>
            prevItems.filter((item) => item._id !== productId)
          )
        }
      } else {
        setCartItems((prevItems) =>
          prevItems.filter((item) => item._id !== productId)
        )
      }
    },
    [isAuthenticated, getAuthToken]
  )

  const updateQuantity = useCallback(
    async (productId, quantity) => {
      if (quantity <= 0) {
        removeFromCart(productId)
        return
      }

      if (isAuthenticated) {
        try {
          const token = getAuthToken()
          const response = await actualizarCantidadProducto(
            token,
            productId,
            quantity
          )
          setCartItems(response.data.items)
        } catch (error) {
          console.error('Error al actualizar cantidad via MongoDB:', error)

          setCartItems((prevItems) =>
            prevItems.map((item) =>
              item._id === productId ? { ...item, quantity } : item
            )
          )
        }
      } else {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item._id === productId ? { ...item, quantity } : item
          )
        )
      }
    },
    [isAuthenticated, getAuthToken, removeFromCart]
  )

  const clearCart = useCallback(async () => {
    if (isAuthenticated) {
      try {
        const token = getAuthToken()
        await limpiarCarrito(token)
        setCartItems([])
      } catch (error) {
        console.error('Error al limpiar carrito via MongoDB:', error)

        setCartItems([])
      }
    } else {
      setCartItems([])
    }
  }, [isAuthenticated, getAuthToken])

  const getCartTotal = useCallback(() => {
    const total = cartItems.reduce(
      (total, item) => total + item.precio * item.quantity,
      0
    )
    return total
  }, [cartItems])

  const getCartItemsCount = useCallback(() => {
    const count = cartItems.reduce((count, item) => count + item.quantity, 0)
    return count
  }, [cartItems])

  const isInCart = useCallback(
    (productId) => {
      return cartItems.some((item) => item._id === productId)
    },
    [cartItems]
  )

  const getItemQuantity = useCallback(
    (productId) => {
      const item = cartItems.find((item) => item._id === productId)
      return item ? item.quantity : 0
    },
    [cartItems]
  )

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
    getItemQuantity,
    isAuthenticated
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
