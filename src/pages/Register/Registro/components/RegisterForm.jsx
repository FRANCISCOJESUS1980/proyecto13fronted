import { memo } from 'react'
import PropTypes from 'prop-types'
import { AvatarUpload } from './Avatarupload'
import { FormFields } from './FormFields'
import { SubmitButton } from './SubmitButton'

export const RegisterForm = memo(
  ({
    formData,
    selectedImage,
    previewUrl,
    isLoading,
    isVerifyingCode,
    handleChange,
    handleImageChange,
    handleSubmit
  }) => {
    return (
      <form onSubmit={handleSubmit} className='cf-register-form'>
        <AvatarUpload
          selectedImage={selectedImage}
          previewUrl={previewUrl}
          handleImageChange={handleImageChange}
        />

        <FormFields
          formData={formData}
          isVerifyingCode={isVerifyingCode}
          handleChange={handleChange}
        />

        <SubmitButton isLoading={isLoading} />
      </form>
    )
  }
)

RegisterForm.propTypes = {
  formData: PropTypes.shape({
    nombre: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    rol: PropTypes.string.isRequired,
    codigoAutorizacion: PropTypes.string.isRequired
  }).isRequired,
  selectedImage: PropTypes.object,
  previewUrl: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  isVerifyingCode: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleImageChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

RegisterForm.displayName = 'RegisterForm'
