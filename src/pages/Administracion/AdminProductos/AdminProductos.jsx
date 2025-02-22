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
  ImageIcon,
  AlertCircle
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
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
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
  const [formErrors, setFormErrors] = useState({})

  const token = localStorage.getItem('token')

  useEffect(() => {
    obtenerProductos()
  }, [currentPage, categoriaFiltro])

  useEffect(() => {
    if (token) {
      obtenerProductos()
    }
  }, [token])

  // Limpiar mensajes después de 3 segundos
  useEffect(() => {
    if (successMessage || error) {
      const timer = setTimeout(() => {
        setSuccessMessage('')
        setError('')
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [successMessage, error])

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
      setError(
        'Error al obtener productos: ' +
          (error.response?.data?.message || error.message)
      )
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
      setTotalPages(1) // Reset pagination for search results
    } catch (error) {
      setError(
        'Error en la búsqueda: ' +
          (error.response?.data?.message || error.message)
      )
    } finally {
      setLoading(false)
    }
  }

  const validateForm = () => {
    const errors = {}
    if (!form.nombre) errors.nombre = 'El nombre es requerido'
    if (!form.descripcion) errors.descripcion = 'La descripción es requerida'
    if (!form.precio || form.precio <= 0)
      errors.precio = 'El precio debe ser mayor a 0'
    if (!form.categoria) errors.categoria = 'La categoría es requerida'
    if (!form.stock || form.stock < 0)
      errors.stock = 'El stock debe ser mayor o igual a 0'
    if (!form.marca) errors.marca = 'La marca es requerida'

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setError('La imagen no debe superar los 5MB')
        return
      }

      if (!file.type.startsWith('image/')) {
        setError('El archivo debe ser una imagen')
        return
      }

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
    if (!validateForm()) return

    setLoading(true)
    setError('')

    try {
      const formData = new FormData()

      // Manejar campos numéricos y booleanos correctamente
      const numericFields = ['precio', 'stock']
      Object.keys(form).forEach((key) => {
        if (key === 'imagen') {
          // Solo añadir la imagen si hay una nueva
          if (form.imagen instanceof File) {
            formData.append('imagen', form.imagen)
          }
        } else if (numericFields.includes(key)) {
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
        const response = await axios.put(
          `${API_URL}/${editando}`,
          formData,
          config
        )
        if (response.data.success) {
          setSuccessMessage('Producto actualizado correctamente')
        }
      } else {
        const response = await axios.post(API_URL, formData, config)
        if (response.data.success) {
          setSuccessMessage('Producto creado correctamente')
        }
      }

      resetForm()
      obtenerProductos()
      setModalOpen(false)
    } catch (error) {
      setError(error.response?.data?.message || 'Error al guardar el producto')
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
    setFormErrors({})
  }

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este producto?')) return

    setLoading(true)
    try {
      const response = await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (response.data.success) {
        setSuccessMessage('Producto eliminado correctamente')
        obtenerProductos()
      }
    } catch (error) {
      setError(
        'Error al eliminar el producto: ' +
          (error.response?.data?.message || error.message)
      )
    } finally {
      setLoading(false)
    }
  }

  const toggleEstado = async (id, estadoActual) => {
    setLoading(true)
    try {
      const response = await axios.patch(
        `${API_URL}/${id}/estado`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      if (response.data.success) {
        setSuccessMessage(
          `Estado del producto ${
            response.data.data.estado === 'activo' ? 'activado' : 'desactivado'
          }`
        )
        obtenerProductos()
      }
    } catch (error) {
      setError(
        'Error al cambiar estado: ' +
          (error.response?.data?.message || error.message)
      )
    } finally {
      setLoading(false)
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
    setFormErrors({})
  }

  return (
    <div className='admin-productos'>
      <Header />

      {/* Mensajes de éxito y error */}
      {successMessage && <div className='alert success'>{successMessage}</div>}
      {error && (
        <div className='alert error'>
          <AlertCircle size={20} />
          {error}
        </div>
      )}

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
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className='loading'>
          <div className='spinner'></div>
          <p>Cargando...</p>
        </div>
      ) : (
        <>
          <div className='productos-grid'>
            {productos.length === 0 ? (
              <div className='no-products'>
                <p>No se encontraron productos</p>
              </div>
            ) : (
              productos.map((producto) => (
                <div key={producto._id} className='producto-card'>
                  <div className='producto-imagen'>
                    {producto.imagen ? (
                      <img
                        src={producto.imagen || '/placeholder.svg'}
                        alt={producto.nombre}
                        onError={(e) => {
                          e.target.onerror = null
                          e.target.src = '/placeholder.svg'
                        }}
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
                    <p className='precio'>${producto.precio.toFixed(2)}</p>
                    <p className='stock'>Stock: {producto.stock}</p>
                    <p className={`estado ${producto.estado}`}>
                      {producto.estado}
                    </p>
                    {producto.destacado && (
                      <span className='destacado-badge'>Destacado</span>
                    )}
                  </div>
                  <div className='producto-actions'>
                    <button
                      className='btn-icon edit'
                      onClick={() => handleEdit(producto)}
                      title='Editar producto'
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      className='btn-icon delete'
                      onClick={() => handleDelete(producto._id)}
                      title='Eliminar producto'
                    >
                      <Trash2 size={16} />
                    </button>
                    <button
                      className='btn-icon toggle'
                      onClick={() =>
                        toggleEstado(producto._id, producto.estado)
                      }
                      title={
                        producto.estado === 'activo' ? 'Desactivar' : 'Activar'
                      }
                    >
                      {producto.estado === 'activo' ? (
                        <ToggleRight size={16} />
                      ) : (
                        <ToggleLeft size={16} />
                      )}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className='pagination'>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className='pagination-button'
            >
              <ChevronLeft size={20} />
            </button>
            <span>
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className='pagination-button'
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
                    className={formErrors.nombre ? 'error' : ''}
                  />
                  {formErrors.nombre && (
                    <span className='error-message'>{formErrors.nombre}</span>
                  )}
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
                    className={formErrors.marca ? 'error' : ''}
                  />
                  {formErrors.marca && (
                    <span className='error-message'>{formErrors.marca}</span>
                  )}
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
                    className={formErrors.precio ? 'error' : ''}
                  />
                  {formErrors.precio && (
                    <span className='error-message'>{formErrors.precio}</span>
                  )}
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
                    className={formErrors.stock ? 'error' : ''}
                  />
                  {formErrors.stock && (
                    <span className='error-message'>{formErrors.stock}</span>
                  )}
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
                    className={formErrors.categoria ? 'error' : ''}
                  >
                    <option value=''>Selecciona una categoría</option>
                    {CATEGORIAS.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </option>
                    ))}
                  </select>
                  {formErrors.categoria && (
                    <span className='error-message'>
                      {formErrors.categoria}
                    </span>
                  )}
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
                  className={formErrors.descripcion ? 'error' : ''}
                ></textarea>
                {formErrors.descripcion && (
                  <span className='error-message'>
                    {formErrors.descripcion}
                  </span>
                )}
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
                <label htmlFor='imagen'>
                  Imagen
                  {editando &&
                    !form.imagen &&
                    ' (Dejar vacío para mantener la imagen actual)'}
                </label>
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
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src = '/placeholder.svg'
                      }}
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
                  disabled={loading}
                >
                  Cancelar
                </button>
                <button
                  type='submit'
                  className='btn-primary'
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className='spinner-small'></div>
                      {editando ? 'Actualizando...' : 'Creando...'}
                    </>
                  ) : editando ? (
                    'Actualizar'
                  ) : (
                    'Crear'
                  )}
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
