import { Edit2, Trash2, ToggleRight, ToggleLeft, ImageIcon } from 'lucide-react'
import './ProductCard.css'

const ProductoCard = ({ producto, onEdit, onDelete, onToggleEstado }) => {
  return (
    <div className='cf-producto-card'>
      <div className='cf-producto-card-imagen-container'>
        {producto.imagen ? (
          <img
            src={producto.imagen || '/placeholder.svg'}
            alt={producto.nombre}
            className='cf-producto-card-imagen'
            onError={(e) => {
              e.target.onerror = null
              e.target.src = '/placeholder.svg'
            }}
          />
        ) : (
          <div className='cf-producto-card-no-imagen'>
            <ImageIcon size={40} className='cf-producto-card-imagen-icon' />
          </div>
        )}
        {producto.destacado && (
          <span className='cf-producto-card-destacado'>Destacado</span>
        )}
      </div>
      <div className='cf-producto-card-content'>
        <div className='cf-producto-card-header'>
          <h3 className='cf-producto-card-titulo'>{producto.nombre}</h3>
          <span
            className={`cf-producto-card-estado cf-producto-card-estado-${producto.estado}`}
          >
            {producto.estado}
          </span>
        </div>
        <div className='cf-producto-card-info'>
          <div className='cf-producto-card-info-item'>
            <span className='cf-producto-card-info-label'>Marca:</span>
            <span className='cf-producto-card-info-value'>
              {producto.marca}
            </span>
          </div>
          <div className='cf-producto-card-info-item'>
            <span className='cf-producto-card-info-label'>Categoría:</span>
            <span className='cf-producto-card-info-value'>
              {producto.categoria}
            </span>
          </div>
          <div className='cf-producto-card-precio-stock'>
            <div className='cf-producto-card-precio'>
              ${producto.precio.toFixed(2)}
            </div>
            <div className='cf-producto-card-stock'>
              <span className='cf-producto-card-stock-label'>Stock:</span>
              <span className='cf-producto-card-stock-value'>
                {producto.stock}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className='cf-producto-card-actions'>
        <button
          className='cf-producto-card-btn cf-producto-card-btn-edit'
          onClick={() => onEdit(producto)}
          title='Editar producto'
        >
          <Edit2 size={16} />
          <span className='cf-producto-card-btn-text'>Editar</span>
        </button>
        <button
          className='cf-producto-card-btn cf-producto-card-btn-delete'
          onClick={() => onDelete(producto._id)}
          title='Eliminar producto'
        >
          <Trash2 size={16} />
          <span className='cf-producto-card-btn-text'>Eliminar</span>
        </button>
        <button
          className='cf-producto-card-btn cf-producto-card-btn-toggle'
          onClick={() => onToggleEstado(producto._id)}
          title={producto.estado === 'activo' ? 'Desactivar' : 'Activar'}
        >
          {producto.estado === 'activo' ? (
            <ToggleRight size={16} />
          ) : (
            <ToggleLeft size={16} />
          )}
          <span className='cf-producto-card-btn-text'>
            {producto.estado === 'activo' ? 'Desactivar' : 'Activar'}
          </span>
        </button>
      </div>
    </div>
  )
}

export default ProductoCard
