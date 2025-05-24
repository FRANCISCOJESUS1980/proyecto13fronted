import { memo } from 'react'

const AvatarUpload = memo(({ avatarPreview, onFileChange }) => {
  const defaultAvatarSvg =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23999999' strokeWidth='1.5'%3E%3Cpath strokeLinecap='round' strokeLinejoin='round' d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'/%3E%3C/svg%3E"

  return (
    <div className='cf-edit-user-avatar-upload'>
      <div
        className='cf-edit-user-avatar-preview'
        style={{
          backgroundImage: `url(${avatarPreview || defaultAvatarSvg})`
        }}
      >
        <div className='cf-edit-user-avatar-overlay'>
          <span>Cambiar</span>
        </div>
      </div>
      <input
        type='file'
        accept='image/*'
        onChange={onFileChange}
        className='cf-edit-user-avatar-input'
        id='cf-edit-user-avatar-upload'
      />
      <label
        htmlFor='cf-edit-user-avatar-upload'
        className='cf-edit-user-avatar-label'
      >
        Seleccionar imagen de perfil
      </label>
    </div>
  )
})

AvatarUpload.displayName = 'AvatarUpload'

export default AvatarUpload
