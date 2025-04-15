import { Plus, ArrowLeft } from 'lucide-react'
import { useProductOperations } from '../../../hooks/use-product-operations'
import Header from '../../../../../../components/Header/Header'
import ProductoCard from '../../ProductCard/ProductCard'
import ProductoForm from '../../ProductoForm/ProductoForm'
import ProductoFilters from '../../ProductoFilters/ProductoFilters'
import Pagination from '../../Pagination/Pagination'
import Button from '../../../../../../components/Button/Button'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './AdminProductos.css'

const AdminProductos = () => {
  const navigate = useNavigate()
  const [fadeIn, setFadeIn] = useState(false)

  const {
    state,
    handleBuscarProductos,
    handleImageChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    toggleEstado,
    openModal,
    closeModal,
    setSearchTerm,
    setCategoriaFiltro,
    setCurrentPage,
    updateForm
  } = useProductOperations()

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 100)
  }, [])

  return (
    <div
      className={`cf-admin-productos-container ${
        fadeIn ? 'cf-admin-productos-fade-in' : ''
      }`}
    >
      <Header />

      <div className='cf-admin-productos-content'>
        {state.successMessage && (
          <div className='cf-admin-productos-success'>
            <div className='cf-admin-productos-success-icon'></div>
            <p>{state.successMessage}</p>
          </div>
        )}

        {state.error && (
          <div className='cf-admin-productos-error'>
            <div className='cf-admin-productos-error-icon'></div>
            <p>{state.error}</p>
          </div>
        )}

        <div className='cf-admin-productos-header'>
          <Button
            variant='secondary'
            onClick={() => navigate('/administracion')}
            leftIcon={<ArrowLeft size={18} />}
            className='cf-admin-productos-back-btn'
          >
            Volver a Administración
          </Button>
          <h1 className='cf-admin-productos-title'>
            Administración de Productos
          </h1>
          <Button
            className='cf-admin-productos-new-btn'
            variant='primary'
            size='md'
            onClick={openModal}
            leftIcon={<Plus size={18} />}
          >
            Nuevo Producto
          </Button>
        </div>

        <div className='cf-admin-productos-filters-container'>
          <ProductoFilters
            searchTerm={state.searchTerm}
            categoriaFiltro={state.categoriaFiltro}
            onSearchChange={setSearchTerm}
            onCategoriaChange={setCategoriaFiltro}
            onSearch={handleBuscarProductos}
          />
        </div>

        {state.loading ? (
          <div className='cf-admin-productos-loading'>
            <div className='cf-admin-productos-spinner'></div>
            <p className='cf-admin-productos-loading-text'>
              Cargando productos...
            </p>
          </div>
        ) : (
          <>
            <div className='cf-admin-productos-grid'>
              {state.productos.length === 0 ? (
                <div className='cf-admin-productos-empty'>
                  <div className='cf-admin-productos-empty-icon'></div>
                  <h3 className='cf-admin-productos-empty-title'>
                    No se encontraron productos
                  </h3>
                  <p className='cf-admin-productos-empty-text'>
                    No hay productos que coincidan con los criterios de
                    búsqueda.
                  </p>
                  <p className='cf-admin-productos-empty-action'>
                    Intenta con otros filtros o crea un nuevo producto.
                  </p>
                </div>
              ) : (
                state.productos.map((producto, index) => (
                  <div
                    key={producto._id}
                    className='cf-admin-productos-card-wrapper'
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ProductoCard
                      producto={producto}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      onToggleEstado={toggleEstado}
                    />
                  </div>
                ))
              )}
            </div>

            {state.productos.length > 0 && (
              <div className='cf-admin-productos-pagination-container'>
                <Pagination
                  currentPage={state.currentPage}
                  totalPages={state.totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        )}
      </div>

      {state.modalOpen && (
        <ProductoForm
          form={state.form}
          formErrors={state.formErrors}
          previewImage={state.previewImage}
          loading={state.loading}
          editando={state.editando}
          onSubmit={handleSubmit}
          onClose={closeModal}
          onUpdateForm={updateForm}
          onImageChange={handleImageChange}
        />
      )}
    </div>
  )
}

export default AdminProductos
