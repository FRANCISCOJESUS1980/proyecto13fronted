import { memo } from 'react'
import { RegisterForm } from '../components/RegisterForm'
import { RegisterHeader } from '../components/RegisterHeader'
import { RegisterAnimations } from '../components/RegisterAnimations'
import { ConsentScreen } from '../components/ConsentScreen'
import { useRegisterLogic } from '../hooks/useRegisterLogic'
import './Register.css'

const Register = () => {
  const {
    formData,
    selectedImage,
    previewUrl,
    registroExitoso,
    isLoading,
    animationComplete,
    isVerifyingCode,
    handleChange,
    handleImageChange,
    handleSubmit,
    handleLoginClick,
    handleConsentAccepted
  } = useRegisterLogic()

  if (registroExitoso) {
    return <ConsentScreen onConsentAccepted={handleConsentAccepted} />
  }

  return (
    <div className='cf-register-page'>
      <RegisterHeader />
      <RegisterAnimations />

      <div
        className={`cf-form-wrapper ${
          animationComplete ? 'cf-form-visible' : ''
        }`}
      >
        <div className='cf-logo-wrapper'>
          <div className='cf-dumbbell-logo'></div>
        </div>

        <h2 className='cf-register-heading'>Registro</h2>

        <RegisterForm
          formData={formData}
          selectedImage={selectedImage}
          previewUrl={previewUrl}
          isLoading={isLoading}
          isVerifyingCode={isVerifyingCode}
          handleChange={handleChange}
          handleImageChange={handleImageChange}
          handleSubmit={handleSubmit}
        />

        <p className='cf-login-text'>
          ¿Ya tienes una cuenta?{' '}
          <span onClick={handleLoginClick} className='cf-login-link'>
            Inicia sesión aquí
          </span>
        </p>
      </div>
    </div>
  )
}

export default memo(Register)
