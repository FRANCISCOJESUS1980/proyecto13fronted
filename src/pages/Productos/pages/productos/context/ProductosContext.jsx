import {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useCallback,
  useEffect
} from 'react'
import { useNavigate } from 'react-router-dom'
import { obtenerProductos } from '../../../../../services/Api/index'

const initialState = {
  productos: [],
  allProductos: [],
  totalPages: 1,
  currentPage: 1,

  searchTerm: '',
  categoriaFiltro: '',
  ordenar: 'destacado',

  loading: true,
  fadeIn: false,
  isSearching: false,

  itemsPerPage: 12
}

const ACTIONS = {
  SET_PRODUCTOS: 'SET_PRODUCTOS',
  SET_ALL_PRODUCTOS: 'SET_ALL_PRODUCTOS',
  SET_TOTAL_PAGES: 'SET_TOTAL_PAGES',
  SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
  SET_SEARCH_TERM: 'SET_SEARCH_TERM',
  SET_CATEGORIA_FILTRO: 'SET_CATEGORIA_FILTRO',
  SET_ORDENAR: 'SET_ORDENAR',
  SET_LOADING: 'SET_LOADING',
  SET_FADE_IN: 'SET_FADE_IN',
  SET_IS_SEARCHING: 'SET_IS_SEARCHING',
  FILTER_PRODUCTOS: 'FILTER_PRODUCTOS'
}

function productosReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_PRODUCTOS:
      return { ...state, productos: action.payload }

    case ACTIONS.SET_ALL_PRODUCTOS:
      return { ...state, allProductos: action.payload }

    case ACTIONS.SET_TOTAL_PAGES:
      return { ...state, totalPages: action.payload }

    case ACTIONS.SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload }

    case ACTIONS.SET_SEARCH_TERM:
      return { ...state, searchTerm: action.payload, currentPage: 1 }

    case ACTIONS.SET_CATEGORIA_FILTRO:
      return { ...state, categoriaFiltro: action.payload, currentPage: 1 }

    case ACTIONS.SET_ORDENAR:
      return { ...state, ordenar: action.payload, currentPage: 1 }

    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload }

    case ACTIONS.SET_FADE_IN:
      return { ...state, fadeIn: action.payload }

    case ACTIONS.SET_IS_SEARCHING:
      return { ...state, isSearching: action.payload }

    case ACTIONS.FILTER_PRODUCTOS: {
      let filtered = [...state.allProductos]

      if (action.payload.searchTerm && action.payload.searchTerm.trim()) {
        const searchLower = action.payload.searchTerm.toLowerCase().trim()
        filtered = filtered.filter(
          (producto) =>
            producto.nombre.toLowerCase().includes(searchLower) ||
            producto.marca?.toLowerCase().includes(searchLower) ||
            producto.categoria?.toLowerCase().includes(searchLower)
        )
      }

      if (action.payload.categoriaFiltro) {
        filtered = filtered.filter(
          (producto) => producto.categoria === action.payload.categoriaFiltro
        )
      }

      switch (action.payload.ordenar) {
        case 'precio-asc':
          filtered.sort((a, b) => a.precio - b.precio)
          break
        case 'precio-desc':
          filtered.sort((a, b) => b.precio - a.precio)
          break
        case 'nombre-asc':
          filtered.sort((a, b) => a.nombre.localeCompare(b.nombre))
          break
        case 'nombre-desc':
          filtered.sort((a, b) => b.nombre.localeCompare(a.nombre))
          break
        case 'destacado':
        default:
          filtered.sort((a, b) => (b.destacado ? 1 : 0) - (a.destacado ? 1 : 0))
          break
      }

      const totalItems = filtered.length
      const totalPages = Math.ceil(totalItems / state.itemsPerPage)
      const startIndex = (state.currentPage - 1) * state.itemsPerPage
      const endIndex = startIndex + state.itemsPerPage
      const paginatedProducts = filtered.slice(startIndex, endIndex)

      return {
        ...state,
        productos: paginatedProducts,
        totalPages: Math.max(1, totalPages)
      }
    }

    default:
      return state
  }
}

const ProductosContext = createContext()

export const useProductosContext = () => {
  const context = useContext(ProductosContext)
  if (!context) {
    throw new Error(
      'useProductosContext debe ser usado dentro de ProductosProvider'
    )
  }
  return context
}

export const ProductosProvider = ({ children }) => {
  const navigate = useNavigate()
  const [state, dispatch] = useReducer(productosReducer, initialState)

  const actions = useMemo(
    () => ({
      setProductos: (productos) =>
        dispatch({ type: ACTIONS.SET_PRODUCTOS, payload: productos }),
      setAllProductos: (productos) =>
        dispatch({ type: ACTIONS.SET_ALL_PRODUCTOS, payload: productos }),
      setTotalPages: (pages) =>
        dispatch({ type: ACTIONS.SET_TOTAL_PAGES, payload: pages }),
      setCurrentPage: (page) =>
        dispatch({ type: ACTIONS.SET_CURRENT_PAGE, payload: page }),
      setSearchTerm: (term) =>
        dispatch({ type: ACTIONS.SET_SEARCH_TERM, payload: term }),
      setCategoriaFiltro: (categoria) =>
        dispatch({ type: ACTIONS.SET_CATEGORIA_FILTRO, payload: categoria }),
      setOrdenar: (orden) =>
        dispatch({ type: ACTIONS.SET_ORDENAR, payload: orden }),
      setLoading: (loading) =>
        dispatch({ type: ACTIONS.SET_LOADING, payload: loading }),
      setFadeIn: (fadeIn) =>
        dispatch({ type: ACTIONS.SET_FADE_IN, payload: fadeIn }),
      setIsSearching: (searching) =>
        dispatch({ type: ACTIONS.SET_IS_SEARCHING, payload: searching }),
      filterProductos: (filters) =>
        dispatch({ type: ACTIONS.FILTER_PRODUCTOS, payload: filters })
    }),
    []
  )

  useEffect(() => {
    const timer = setTimeout(() => {
      actions.setFadeIn(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [actions])

  const cargarProductosIniciales = useCallback(async () => {
    try {
      actions.setLoading(true)

      const response = await obtenerProductos(1, 1000)

      if (response && response.data) {
        actions.setAllProductos(response.data)

        actions.filterProductos({
          searchTerm: state.searchTerm,
          categoriaFiltro: state.categoriaFiltro,
          ordenar: state.ordenar
        })
      }
    } catch (error) {
      console.error('Error al obtener productos:', error)
      actions.setAllProductos([])
      actions.setProductos([])
    } finally {
      actions.setLoading(false)
    }
  }, [actions, state.searchTerm, state.categoriaFiltro, state.ordenar])

  useEffect(() => {
    if (state.allProductos.length > 0) {
      actions.filterProductos({
        searchTerm: state.searchTerm,
        categoriaFiltro: state.categoriaFiltro,
        ordenar: state.ordenar
      })
    }
  }, [
    state.searchTerm,
    state.categoriaFiltro,
    state.ordenar,
    state.currentPage,
    state.allProductos.length,
    actions
  ])

  const handlePageChange = useCallback(
    (page) => {
      if (page < 1 || page > state.totalPages) return

      actions.setCurrentPage(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    [state.totalPages, actions]
  )

  const handleBackNavigation = useCallback(() => {
    navigate('/dashboard')
  }, [navigate])

  useEffect(() => {
    cargarProductosIniciales()
  }, [])

  const contextValue = useMemo(
    () => ({
      ...state,
      ...actions,
      handlePageChange,
      handleBackNavigation
    }),
    [state, actions, handlePageChange, handleBackNavigation]
  )

  return (
    <ProductosContext.Provider value={contextValue}>
      {children}
    </ProductosContext.Provider>
  )
}
