import { useEffect, useState } from 'react'
import axios from 'axios'
import { Search, Filter, ShoppingCart } from 'lucide-react'
import Header from '../../components/Header/Header'
import './Productos.css'

const API_URL = 'http://localhost:5000/api/productos'
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
    obtenerProductos()
  }, [currentPage, categoriaFiltro, ordenar])

  const obtenerProductos = async () => {
    setLoading(true)
    try {
      let url = `${API_URL}?page=${currentPage}&limit=${ITEMS_PER_PAGE}`
      if (categoriaFiltro) {
        url += `&categoria=${categoriaFiltro}`
      }
      if (ordenar) {
        url += `&sort=${
          ordenar === 'destacado'
            ? '-destacado'
            : ordenar === 'precio-asc'
            ? 'precio'
            : '-precio'
        }`
      }

      const res = await axios.get(url)
      setProductos(res.data.data)
      setTotalPages(res.data.pagination.pages)
    } catch (error) {
      console.error('Error al obtener productos:', error)
    } finally {
      setLoading(false)
    }
  }

  const buscarProductos = async () => {
    if (!searchTerm) {
      obtenerProductos()
      return
    }

    setLoading(true)
    try {
      const res = await axios.get(`${API_URL}/search?q=${searchTerm}`)
      setProductos(res.data.data)
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
            onKeyPress={(e) => e.key === 'Enter' && buscarProductos()}
          />
          <Search size={20} className='search-icon' onClick={buscarProductos} />
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

export default Productos
