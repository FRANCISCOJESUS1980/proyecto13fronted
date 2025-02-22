import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
  ToggleLeft,
  ToggleRight,
  Filter,
  ImageIcon
} from 'lucide-react'
import Header from '../../../components/Header/Header'
import './AdminProductos.css'

const API_URL = 'http://localhost:5000/api/productos'
const CATEGORIAS = [
  'suplementos',
  'ropa',
  'equipamiento',
  'accesorios',
  'otros'
]
const ITEMS_PER_PAGE = 8

const AdminProductos = () => {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoriaFiltro, setCategoriaFiltro] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: '',
    stock: '',
    marca: '',
    imagen: null,
    estado: 'activo',
    destacado: false
  })
  const [editando, setEditando] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)

  const token = localStorage.getItem('token')

  useEffect(() => {
    obtenerProductos()
  }, [currentPage, categoriaFiltro])

  useEffect(() => {
    if (token) {
      obtenerProductos()
    }
  }, [token])

  const obtenerProductos = async () => {
    setLoading(true)
    try {
      let url = `${API_URL}?page=${currentPage}&limit=${ITEMS_PER_PAGE}`
      if (categoriaFiltro) {
        url += `&categoria=${categoriaFiltro}`
      }

      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

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
      const res = await axios.get(`${API_URL}/search?q=${searchTerm}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setProductos(res.data.data)
    } catch (error) {
      console.error('Error en la búsqueda:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setForm({ ...form, imagen: file })
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData()
      Object.keys(form).forEach((key) => {
        if (key === 'precio' || key === 'stock') {
          formData.append(key, Number(form[key]))
        } else if (key === 'destacado') {
          formData.append(key, form[key].toString())
        } else {
          formData.append(key, form[key])
        }
      })

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      }

      if (editando) {
        await axios.put(`${API_URL}/${editando}`, formData, config)
      } else {
        await axios.post(API_URL, formData, config)
      }

      resetForm()
      obtenerProductos()
      setModalOpen(false)
    } catch (error) {
      console.error('Error:', error.response?.data || error)
      alert(error.response?.data?.message || 'Error al guardar el producto')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (producto) => {
    setForm({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      categoria: producto.categoria,
      stock: producto.stock,
      marca: producto.marca,
      estado: producto.estado,
      destacado: producto.destacado,
      imagen: null
    })
    setPreviewImage(producto.imagen)
    setEditando(producto._id)
    setModalOpen(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este producto?')) return

    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      obtenerProductos()
    } catch (error) {
      console.error('Error al eliminar:', error)
      alert('Error al eliminar el producto')
    }
  }

  const toggleEstado = async (id, estadoActual) => {
    try {
      await axios.patch(
        `${API_URL}/${id}/toggle-status`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      obtenerProductos()
    } catch (error) {
      console.error('Error al cambiar estado:', error)
    }
  }

  const resetForm = () => {
    setForm({
      nombre: '',
      descripcion: '',
      precio: '',
      categoria: '',
      stock: '',
      marca: '',
      imagen: null,
      estado: 'activo',
      destacado: false
    })
    setPreviewImage(null)
    setEditando(null)
  }

  return (
    <div className='admin-productos'>
      <Header />
      <div className='header'>
        <h1>Administración de Productos</h1>
        <button
          className='btn-primary'
          onClick={() => {
            resetForm()
            setModalOpen(true)
          }}
        >
          <Plus size={20} />
          Nuevo Producto
        </button>
      </div>

      <div className='filters'>
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
      </div>

      {loading ? (
        <div className='loading'>Cargando...</div>
      ) : (
        <>
          <div className='productos-grid'>
            {productos.map((producto) => (
              <div key={producto._id} className='producto-card'>
                <div className='producto-imagen'>
                  {producto.imagen ? (
                    <img
                      src={producto.imagen || '/placeholder.svg'}
                      alt={producto.nombre}
                    />
                  ) : (
                    <div className='no-image'>
                      <ImageIcon size={40} />
                    </div>
                  )}
                </div>
                <div className='producto-info'>
                  <h3>{producto.nombre}</h3>
                  <p className='marca'>Marca: {producto.marca}</p>
                  <p className='precio'>${producto.precio}</p>
                  <p className='stock'>Stock: {producto.stock}</p>
                  <p className={`estado ${producto.estado}`}>
                    {producto.estado}
                  </p>
                </div>
                <div className='producto-actions'>
                  <button
                    className='btn-icon edit'
                    onClick={() => handleEdit(producto)}
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    className='btn-icon delete'
                    onClick={() => handleDelete(producto._id)}
                  >
                    <Trash2 size={16} />
                  </button>
                  <button
                    className='btn-icon toggle'
                    onClick={() => toggleEstado(producto._id, producto.estado)}
                  >
                    {producto.estado === 'activo' ? (
                      <ToggleRight size={16} />
                    ) : (
                      <ToggleLeft size={16} />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className='pagination'>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={20} />
            </button>
            <span>
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </>
      )}

      {modalOpen && (
        <div className='modal-overlay'>
          <div className='modal'>
            <div className='modal-header'>
              <h2>{editando ? 'Editar Producto' : 'Nuevo Producto'}</h2>
              <button
                className='btn-icon'
                onClick={() => {
                  setModalOpen(false)
                  resetForm()
                }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className='form-grid'>
                <div className='form-group'>
                  <label htmlFor='nombre'>Nombre</label>
                  <input
                    type='text'
                    id='nombre'
                    name='nombre'
                    value={form.nombre}
                    onChange={(e) =>
                      setForm({ ...form, nombre: e.target.value })
                    }
                    required
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='marca'>Marca</label>
                  <input
                    type='text'
                    id='marca'
                    name='marca'
                    value={form.marca}
                    onChange={(e) =>
                      setForm({ ...form, marca: e.target.value })
                    }
                    required
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='precio'>Precio</label>
                  <input
                    type='number'
                    id='precio'
                    name='precio'
                    value={form.precio}
                    onChange={(e) =>
                      setForm({ ...form, precio: e.target.value })
                    }
                    min='0'
                    step='0.01'
                    required
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='stock'>Stock</label>
                  <input
                    type='number'
                    id='stock'
                    name='stock'
                    value={form.stock}
                    onChange={(e) =>
                      setForm({ ...form, stock: e.target.value })
                    }
                    min='0'
                    required
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='categoria'>Categoría</label>
                  <select
                    id='categoria'
                    name='categoria'
                    value={form.categoria}
                    onChange={(e) =>
                      setForm({ ...form, categoria: e.target.value })
                    }
                    required
                  >
                    <option value=''>Selecciona una categoría</option>
                    {CATEGORIAS.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className='form-group'>
                  <label htmlFor='estado'>Estado</label>
                  <select
                    id='estado'
                    name='estado'
                    value={form.estado}
                    onChange={(e) =>
                      setForm({ ...form, estado: e.target.value })
                    }
                  >
                    <option value='activo'>Activo</option>
                    <option value='inactivo'>Inactivo</option>
                  </select>
                </div>
              </div>

              <div className='form-group'>
                <label htmlFor='descripcion'>Descripción</label>
                <textarea
                  id='descripcion'
                  name='descripcion'
                  value={form.descripcion}
                  onChange={(e) =>
                    setForm({ ...form, descripcion: e.target.value })
                  }
                  required
                ></textarea>
              </div>

              <div className='form-group checkbox'>
                <label>
                  <input
                    type='checkbox'
                    name='destacado'
                    checked={form.destacado}
                    onChange={(e) =>
                      setForm({ ...form, destacado: e.target.checked })
                    }
                  />
                  Producto destacado
                </label>
              </div>

              <div className='form-group'>
                <label htmlFor='imagen'>Imagen</label>
                <input
                  type='file'
                  id='imagen'
                  name='imagen'
                  accept='image/*'
                  onChange={handleImageChange}
                  className='file-input'
                />
                {previewImage && (
                  <div className='image-preview'>
                    <img
                      src={previewImage || '/placeholder.svg'}
                      alt='Vista previa'
                    />
                  </div>
                )}
              </div>

              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn-secondary'
                  onClick={() => {
                    setModalOpen(false)
                    resetForm()
                  }}
                >
                  Cancelar
                </button>
                <button
                  type='submit'
                  className='btn-primary'
                  disabled={loading}
                >
                  {loading ? 'Guardando...' : editando ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminProductos
