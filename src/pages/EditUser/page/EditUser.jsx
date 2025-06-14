import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useEditUserState } from '../hooks/useEditUserState'
import Header from '../../../components/Header/page/Header'
import Button from '../../../components/Button/Button'
import Loading from '../../../components/Loading/loading'
import AnimationWrapper from '../components/AnimationWrapper'
import UnsavedChangesWarning from '../components/UnsavedChangesWarning'
import AvatarUpload from '../components/AvatarUpload'
import UserForm from '../components/UseForm'
import './EditUser.css'

const EditUser = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const {
    state: {
      loading,
      user,
      avatarFile,
      avatarPreview,
      isSubmitting,
      animationComplete,
      hasUnsavedChanges
    },
    actions: {
      fetchUser,
      handleChange,
      handleAddressChange,
      handleFileChange,
      handleSubmit,
      handleNavigateAway,
      setAnimationComplete
    }
  } = useEditUserState()

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [setAnimationComplete])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  if (loading) {
    return (
      <Loading
        isVisible={loading}
        loadingText='CARGANDO PERFIL DE USUARIO...'
      />
    )
  }

  return (
    <div className='cf-edit-user-container'>
      <AnimationWrapper />
      <Header />

      <div className='cf-edit-user-back-button'>
        <Button
          variant='secondary'
          onClick={() => handleNavigateAway('/dashboard')}
          leftIcon={<span>←</span>}
        >
          Volver al Dashboard
        </Button>
      </div>

      <div
        className={`cf-edit-user-form-wrapper ${
          animationComplete ? 'cf-edit-user-form-visible' : ''
        }`}
      >
        <div className='cf-edit-user-logo-wrapper'>
          <div className='cf-edit-user-dumbbell-logo'></div>
        </div>

        <h2 className='cf-edit-user-heading'>Editar Perfil</h2>

        <UnsavedChangesWarning hasUnsavedChanges={hasUnsavedChanges} />

        <form onSubmit={handleSubmit} className='cf-edit-user-form'>
          <AvatarUpload
            avatarPreview={avatarPreview}
            onFileChange={handleFileChange}
          />

          <UserForm
            user={user}
            isSubmitting={isSubmitting}
            onChange={handleChange}
            onAddressChange={handleAddressChange}
            onCancel={() => handleNavigateAway('/dashboard')}
          />
        </form>
      </div>
    </div>
  )
}

export default EditUser
