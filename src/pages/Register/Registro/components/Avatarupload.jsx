import { memo } from 'react'
import PropTypes from 'prop-types'

export const AvatarUpload = memo(
  ({ selectedImage, previewUrl, handleImageChange }) => {
    return (
      <div className='cf-avatar-upload'>
        <div
          className='cf-avatar-preview'
          style={{
            backgroundImage: `url(${
              previewUrl || '/imagenes/default-avatar.png'
            })`
          }}
        >
          <div className='cf-avatar-overlay'>
            <span>Cambiar</span>
          </div>
        </div>
        <input
          type='file'
          accept='image/*'
          onChange={handleImageChange}
          className='cf-avatar-input'
          id='avatar-upload'
        />
        <label htmlFor='avatar-upload' className='cf-avatar-label'>
          Seleccionar imagen de perfil
        </label>
      </div>
    )
  }
)

AvatarUpload.propTypes = {
  selectedImage: PropTypes.object,
  previewUrl: PropTypes.string,
  handleImageChange: PropTypes.func.isRequired
}

AvatarUpload.displayName = 'AvatarUpload'
