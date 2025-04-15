/*import { useEffect, useState } from 'react'
import { Search, Filter, ShoppingCart } from 'lucide-react'
import Header from '../../components/Header/Header'
import { obtenerProductos, buscarProductos } from '../../services/Api/index'
import './Productos.css'

const CATEGORIAS = [
  'suplementos',
  'ropa',
  'equipamiento',
  'accesorios',
  'otros'
]
const ITEMS_PER_PAGE = 12

const Productos = () => {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoriaFiltro, setCategoriaFiltro] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [ordenar, setOrdenar] = useState('destacado')

  useEffect(() => {
    cargarProductos()
  }, [currentPage, categoriaFiltro, ordenar])

  const cargarProductos = async () => {
    setLoading(true)
    try {
      const response = await obtenerProductos(
        currentPage,
        ITEMS_PER_PAGE,
        categoriaFiltro,
        ordenar
      )
      setProductos(response.data)
      setTotalPages(response.pagination.pages)
    } catch (error) {
      console.error('Error al obtener productos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleBuscarProductos = async () => {
    if (!searchTerm) {
      cargarProductos()
      return
    }

    setLoading(true)
    try {
      const response = await buscarProductos(searchTerm)
      setProductos(response.data)
    } catch (error) {
      console.error('Error en la búsqueda:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='productos-page'>
      <Header />
      <div className='productos-header'>
        <h1>Nuestros Productos</h1>
        <p>Encuentra todo lo que necesitas para tu entrenamiento</p>
      </div>

      <div className='productos-filters'>
        <div className='search-box'>
          <input
            type='text'
            placeholder='Buscar productos...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleBuscarProductos()}
          />
          <Search
            size={20}
            className='search-icon'
            onClick={handleBuscarProductos}
          />
        </div>

        <div className='filter-group'>
          <div className='category-filter'>
            <Filter size={20} />
            <select
              value={categoriaFiltro}
              onChange={(e) => setCategoriaFiltro(e.target.value)}
            >
              <option value=''>Todas las categorías</option>
              {CATEGORIAS.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className='sort-filter'>
            <select
              value={ordenar}
              onChange={(e) => setOrdenar(e.target.value)}
            >
              <option value='destacado'>Destacados</option>
              <option value='precio-asc'>Menor precio</option>
              <option value='precio-desc'>Mayor precio</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className='loading'>Cargando productos...</div>
      ) : (
        <>
          <div className='productos-grid'>
            {productos.map((producto) => (
              <div key={producto._id} className='producto-card'>
                <div className='producto-imagen'>
                  <img
                    src={producto.imagen || '/placeholder.svg'}
                    alt={producto.nombre}
                  />
                  {producto.destacado && (
                    <span className='destacado'>Destacado</span>
                  )}
                </div>
                <div className='producto-info'>
                  <h3>{producto.nombre}</h3>
                  <p className='marca'>{producto.marca}</p>
                  <div className='precio-container'>
                    <span className='precio'>${producto.precio}</span>
                    {producto.stock > 0 ? (
                      <button className='btn-agregar'>
                        <ShoppingCart size={18} />
                        Agregar
                      </button>
                    ) : (
                      <span className='agotado'>Agotado</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className='pagination'>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={currentPage === page ? 'active' : ''}
              >
                {page}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Productos*/

import { useEffect, useState } from 'react'
import {
  Search,
  Filter,
  ShoppingCart,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import Header from '../../components/Header/Header'
import { obtenerProductos, buscarProductos } from '../../services/Api/index'
import './Productos.css'

const CATEGORIAS = [
  'suplementos',
  'ropa',
  'equipamiento',
  'accesorios',
  'otros'
]
const ITEMS_PER_PAGE = 12

const Productos = () => {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoriaFiltro, setCategoriaFiltro] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [ordenar, setOrdenar] = useState('destacado')
  const [fadeIn, setFadeIn] = useState(false)

  useEffect(() => {
    cargarProductos()
  }, [currentPage, categoriaFiltro, ordenar])

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 100)
  }, [])

  const cargarProductos = async () => {
    setLoading(true)
    try {
      const response = await obtenerProductos(
        currentPage,
        ITEMS_PER_PAGE,
        categoriaFiltro,
        ordenar
      )
      setProductos(response.data)
      setTotalPages(response.pagination.pages)
    } catch (error) {
      console.error('Error al obtener productos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleBuscarProductos = async () => {
    if (!searchTerm) {
      cargarProductos()
      return
    }

    setLoading(true)
    try {
      const response = await buscarProductos(searchTerm)
      setProductos(response.data)
    } catch (error) {
      console.error('Error en la búsqueda:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const getAnimationDelay = (index) => {
    return `${index * 0.05}s`
  }

  return (
    <div
      className={`cf-productos-container ${
        fadeIn ? 'cf-productos-fade-in' : ''
      }`}
    >
      <Header />
      <div className='cf-productos-content'>
        <div className='cf-productos-header'>
          <h1 className='cf-productos-title'>Nuestros Productos</h1>
          <p className='cf-productos-subtitle'>
            Encuentra todo lo que necesitas para tu entrenamiento
          </p>
        </div>

        <div className='cf-productos-filters-container'>
          <div className='cf-productos-search-box'>
            <input
              type='text'
              placeholder='Buscar productos...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleBuscarProductos()}
              className='cf-productos-search-input'
            />
            <button
              className='cf-productos-search-btn'
              onClick={handleBuscarProductos}
              aria-label='Buscar'
            >
              <Search size={20} className='cf-productos-search-icon' />
            </button>
          </div>

          <div className='cf-productos-filter-group'>
            <div className='cf-productos-category-filter'>
              <div className='cf-productos-filter-icon-container'>
                <Filter size={18} className='cf-productos-filter-icon' />
              </div>
              <div className='cf-productos-select-container'>
                <select
                  value={categoriaFiltro}
                  onChange={(e) => setCategoriaFiltro(e.target.value)}
                  className='cf-productos-select'
                >
                  <option value=''>Todas las categorías</option>
                  {CATEGORIAS.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
                <div className='cf-productos-select-arrow'></div>
              </div>
            </div>

            <div className='cf-productos-sort-filter'>
              <div className='cf-productos-select-container'>
                <select
                  value={ordenar}
                  onChange={(e) => setOrdenar(e.target.value)}
                  className='cf-productos-select'
                >
                  <option value='destacado'>Destacados</option>
                  <option value='precio-asc'>Menor precio</option>
                  <option value='precio-desc'>Mayor precio</option>
                </select>
                <div className='cf-productos-select-arrow'></div>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className='cf-productos-loading'>
            <div className='cf-productos-spinner'></div>
            <p className='cf-productos-loading-text'>Cargando productos...</p>
          </div>
        ) : (
          <>
            {productos.length > 0 ? (
              <div className='cf-productos-grid'>
                {productos.map((producto, index) => (
                  <div
                    key={producto._id}
                    className='cf-productos-card'
                    style={{ animationDelay: getAnimationDelay(index) }}
                  >
                    <div className='cf-productos-imagen-container'>
                      <img
                        src={producto.imagen || '/placeholder.svg'}
                        alt={producto.nombre}
                        className='cf-productos-imagen'
                        onError={(e) => {
                          e.target.onerror = null
                          e.target.src = '/placeholder.svg'
                        }}
                      />
                      {producto.destacado && (
                        <span className='cf-productos-destacado'>
                          Destacado
                        </span>
                      )}
                    </div>
                    <div className='cf-productos-info'>
                      <h3 className='cf-productos-nombre'>{producto.nombre}</h3>
                      <p className='cf-productos-marca'>{producto.marca}</p>
                      <div className='cf-productos-precio-container'>
                        <span className='cf-productos-precio'>
                          ${producto.precio.toFixed(2)}
                        </span>
                        {producto.stock > 0 ? (
                          <button className='cf-productos-btn-agregar'>
                            <ShoppingCart size={16} />
                            <span>Agregar</span>
                          </button>
                        ) : (
                          <span className='cf-productos-agotado'>Agotado</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='cf-productos-empty'>
                <div className='cf-productos-empty-icon'></div>
                <h3 className='cf-productos-empty-title'>
                  No se encontraron productos
                </h3>
                <p className='cf-productos-empty-text'>
                  No hay productos que coincidan con tu búsqueda. Intenta con
                  otros términos o categorías.
                </p>
              </div>
            )}

            {totalPages > 1 && (
              <div className='cf-productos-pagination'>
                <button
                  className='cf-productos-pagination-arrow'
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft size={20} />
                </button>

                <div className='cf-productos-pagination-numbers'>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`cf-productos-pagination-number ${
                          currentPage === page
                            ? 'cf-productos-pagination-active'
                            : ''
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>

                <button
                  className='cf-productos-pagination-arrow'
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Productos
