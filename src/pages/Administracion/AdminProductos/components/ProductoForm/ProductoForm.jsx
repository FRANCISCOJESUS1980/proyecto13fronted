import { X } from 'lucide-react'
import Button from '../../../../../components/Button/Button'
import './ProductoForm.css'

const CATEGORIAS = [
  'suplementos',
  'ropa',
  'equipamiento',
  'accesorios',
  'otros'
]

const ProductoForm = ({
  form,
  formErrors,
  previewImage,
  loading,
  editando,
  onSubmit,
  onClose,
  onUpdateForm,
  onImageChange
}) => {
  return (
    <div className='cf-producto-form-overlay'>
      <div className='cf-producto-form-modal'>
        <div className='cf-producto-form-header'>
          <h2>{editando ? 'Editar Producto' : 'Nuevo Producto'}</h2>
          <Button
            className='cf-producto-form-close-btn'
            variant='outline'
            size='icon'
            onClick={onClose}
            rightIcon={<X size={20} />}
          />
        </div>

        <form onSubmit={onSubmit} className='cf-producto-form'>
          <div className='cf-producto-form-grid'>
            <div className='cf-producto-form-group'>
              <label htmlFor='nombre' className='cf-producto-form-label'>
                Nombre
              </label>
              <input
                type='text'
                id='nombre'
                name='nombre'
                value={form.nombre}
                onChange={(e) => onUpdateForm('nombre', e.target.value)}
                className={`cf-producto-form-input ${
                  formErrors.nombre ? 'cf-producto-form-error' : ''
                }`}
              />
              {formErrors.nombre && (
                <span className='cf-producto-form-error-message'>
                  {formErrors.nombre}
                </span>
              )}
            </div>

            <div className='cf-producto-form-group'>
              <label htmlFor='marca' className='cf-producto-form-label'>
                Marca
              </label>
              <input
                type='text'
                id='marca'
                name='marca'
                value={form.marca}
                onChange={(e) => onUpdateForm('marca', e.target.value)}
                className={`cf-producto-form-input ${
                  formErrors.marca ? 'cf-producto-form-error' : ''
                }`}
              />
              {formErrors.marca && (
                <span className='cf-producto-form-error-message'>
                  {formErrors.marca}
                </span>
              )}
            </div>

            <div className='cf-producto-form-group'>
              <label htmlFor='precio' className='cf-producto-form-label'>
                Precio
              </label>
              <div className='cf-producto-form-input-icon'>
                <span className='cf-producto-form-currency-symbol'>$</span>
                <input
                  type='number'
                  id='precio'
                  name='precio'
                  value={form.precio}
                  onChange={(e) => onUpdateForm('precio', e.target.value)}
                  min='0'
                  step='0.01'
                  className={`cf-producto-form-input cf-producto-form-input-with-icon ${
                    formErrors.precio ? 'cf-producto-form-error' : ''
                  }`}
                />
              </div>
              {formErrors.precio && (
                <span className='cf-producto-form-error-message'>
                  {formErrors.precio}
                </span>
              )}
            </div>

            <div className='cf-producto-form-group'>
              <label htmlFor='stock' className='cf-producto-form-label'>
                Stock
              </label>
              <input
                type='number'
                id='stock'
                name='stock'
                value={form.stock}
                onChange={(e) => onUpdateForm('stock', e.target.value)}
                min='0'
                className={`cf-producto-form-input ${
                  formErrors.stock ? 'cf-producto-form-error' : ''
                }`}
              />
              {formErrors.stock && (
                <span className='cf-producto-form-error-message'>
                  {formErrors.stock}
                </span>
              )}
            </div>

            <div className='cf-producto-form-group'>
              <label htmlFor='categoria' className='cf-producto-form-label'>
                Categoría
              </label>
              <div className='cf-producto-form-select-container'>
                <select
                  id='categoria'
                  name='categoria'
                  value={form.categoria}
                  onChange={(e) => onUpdateForm('categoria', e.target.value)}
                  className={`cf-producto-form-select ${
                    formErrors.categoria ? 'cf-producto-form-error' : ''
                  }`}
                >
                  <option value=''>Selecciona una categoría</option>
                  {CATEGORIAS.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
                <div className='cf-producto-form-select-arrow'></div>
              </div>
              {formErrors.categoria && (
                <span className='cf-producto-form-error-message'>
                  {formErrors.categoria}
                </span>
              )}
            </div>

            <div className='cf-producto-form-group'>
              <label htmlFor='estado' className='cf-producto-form-label'>
                Estado
              </label>
              <div className='cf-producto-form-select-container'>
                <select
                  id='estado'
                  name='estado'
                  value={form.estado}
                  onChange={(e) => onUpdateForm('estado', e.target.value)}
                  className='cf-producto-form-select'
                >
                  <option value='activo'>Activo</option>
                  <option value='inactivo'>Inactivo</option>
                </select>
                <div className='cf-producto-form-select-arrow'></div>
              </div>
            </div>
          </div>

          <div className='cf-producto-form-group'>
            <label htmlFor='descripcion' className='cf-producto-form-label'>
              Descripción
            </label>
            <textarea
              id='descripcion'
              name='descripcion'
              value={form.descripcion}
              onChange={(e) => onUpdateForm('descripcion', e.target.value)}
              className={`cf-producto-form-textarea ${
                formErrors.descripcion ? 'cf-producto-form-error' : ''
              }`}
            ></textarea>
            {formErrors.descripcion && (
              <span className='cf-producto-form-error-message'>
                {formErrors.descripcion}
              </span>
            )}
          </div>

          <div className='cf-producto-form-group cf-producto-form-checkbox-group'>
            <label className='cf-producto-form-checkbox-label'>
              <div className='cf-producto-form-checkbox-container'>
                <input
                  type='checkbox'
                  name='destacado'
                  checked={form.destacado}
                  onChange={(e) => onUpdateForm('destacado', e.target.checked)}
                  className='cf-producto-form-checkbox'
                />
                <div className='cf-producto-form-checkbox-custom'></div>
              </div>
              <span>Producto destacado</span>
            </label>
          </div>

          <div className='cf-producto-form-group'>
            <label htmlFor='imagen' className='cf-producto-form-label'>
              Imagen
              {editando &&
                !form.imagen &&
                ' (Dejar vacío para mantener la imagen actual)'}
            </label>
            <div className='cf-producto-form-image-upload'>
              <div className='cf-producto-form-file-input-container'>
                <input
                  type='file'
                  id='imagen'
                  name='imagen'
                  accept='image/*'
                  onChange={onImageChange}
                  className='cf-producto-form-file-input'
                />
                <label htmlFor='imagen' className='cf-producto-form-file-label'>
                  Seleccionar archivo
                </label>
                <span className='cf-producto-form-file-name'>
                  {form.imagen
                    ? form.imagen.name || 'Imagen seleccionada'
                    : 'Ningún archivo seleccionado'}
                </span>
              </div>

              {previewImage && (
                <div className='cf-producto-form-image-preview'>
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
          </div>

          <div className='cf-producto-form-footer'>
            <Button
              className='cf-producto-form-btn-secondary'
              variant='secondary'
              size='md'
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </Button>

            <button
              type='submit'
              className='cf-producto-form-btn-primary'
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className='cf-producto-form-spinner'></div>
                  <span>{editando ? 'Actualizando...' : 'Creando...'}</span>
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
  )
}

export default ProductoForm
