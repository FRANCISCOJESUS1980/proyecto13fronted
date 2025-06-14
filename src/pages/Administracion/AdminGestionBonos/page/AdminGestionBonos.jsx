import React, { useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Plus } from 'lucide-react'
import Header from '../../../../components/Header/page/Header'
import Button from '../../../../components/Button/Button'
import { useGestionBonos } from '../hooks/useGestionBonos'
import BonoActivo from '../components/BonoActivo'
import HistorialBonos from '../components/HistorialBonos'
import NuevoBonoModal from '../components/modals/NuevoBonoModal'
import PausarBonoModal from '../components/modals/PausarBonoModal'
import AñadirSesionesModal from '../components/modals/AñadirSesionesModal'
import './AdminGestionBonos.css'

const LoadingState = () => (
  <div className='cf-gestion-bonos-container'>
    <Header />
    <div className='cf-gestion-bonos-content'>
      <div className='cf-gestion-bonos-loading'>
        <div className='cf-gestion-bonos-spinner'></div>
        <p className='cf-gestion-bonos-loading-text'>Cargando información...</p>
      </div>
    </div>
  </div>
)

const ErrorState = ({ error, onBack }) => (
  <div className='cf-gestion-bonos-container'>
    <Header />
    <div className='cf-gestion-bonos-content'>
      <div className='cf-gestion-bonos-error'>
        <div className='cf-gestion-bonos-error-icon'></div>
        <p>Error: {error}</p>
      </div>
      <Button
        variant='secondary'
        onClick={onBack}
        leftIcon={<ArrowLeft size={18} />}
      >
        Volver a Usuarios
      </Button>
    </div>
  </div>
)

const GestionBonos = () => {
  const { userId } = useParams()
  const navigate = useNavigate()

  const handleVolver = useCallback(() => {
    navigate('/administracion/usuarios')
  }, [navigate])

  const {
    usuario,
    bonoActivo,
    historialBonos,
    loading,
    error,
    showNuevoBonoModal,
    showPausarBonoModal,
    showAñadirSesionesModal,
    nuevoBonoForm,
    pausarBonoForm,
    sesionesForm,

    openNuevoBonoModal,
    closeNuevoBonoModal,
    openPausarBonoModal,
    closePausarBonoModal,
    openAñadirSesionesModal,
    closeAñadirSesionesModal,

    handleNuevoBonoChange,
    handleCrearBono,
    handlePausarBono,
    handleReactivarBono,
    handleAñadirSesiones,
    updatePausarBonoForm,
    updateSesionesForm,

    formatFecha
  } = useGestionBonos(userId)

  if (loading && !usuario) {
    return <LoadingState />
  }

  if (error && !usuario) {
    return <ErrorState error={error} onBack={handleVolver} />
  }

  return (
    <div className='cf-gestion-bonos-container'>
      <Header />
      <div className='cf-gestion-bonos-content'>
        <div className='cf-gestion-bonos-header'>
          <Button
            variant='secondary'
            onClick={handleVolver}
            leftIcon={<ArrowLeft size={18} />}
          >
            Volver a AdminUsuarios
          </Button>

          <div className='cf-gestion-bonos-title-container'>
            <h1 className='cf-gestion-bonos-title'>
              Gestión de Bonos - {usuario?.nombre}
            </h1>
          </div>

          <Button
            variant='primary'
            onClick={openNuevoBonoModal}
            leftIcon={<Plus size={18} />}
          >
            Nuevo Bono
          </Button>
        </div>

        {error && (
          <div className='cf-gestion-bonos-alert error'>
            <div className='cf-gestion-bonos-alert-icon'></div>
            <p>{error}</p>
          </div>
        )}

        <div className='cf-gestion-bonos-section'>
          <h2 className='cf-gestion-bonos-section-title'>Bono Activo</h2>

          <BonoActivo
            bonoActivo={bonoActivo}
            loading={loading}
            formatFecha={formatFecha}
            onPausar={openPausarBonoModal}
            onReactivar={handleReactivarBono}
            onAñadirSesiones={openAñadirSesionesModal}
          />
        </div>

        <HistorialBonos
          historialBonos={historialBonos}
          formatFecha={formatFecha}
        />

        {/* Modales */}
        <NuevoBonoModal
          show={showNuevoBonoModal}
          onClose={closeNuevoBonoModal}
          nuevoBonoForm={nuevoBonoForm}
          onChange={handleNuevoBonoChange}
          onSubmit={handleCrearBono}
          loading={loading}
        />

        <PausarBonoModal
          show={showPausarBonoModal}
          onClose={closePausarBonoModal}
          pausarBonoForm={pausarBonoForm}
          onChange={updatePausarBonoForm}
          onSubmit={handlePausarBono}
          loading={loading}
        />

        <AñadirSesionesModal
          show={showAñadirSesionesModal}
          onClose={closeAñadirSesionesModal}
          sesionesForm={sesionesForm}
          onChange={updateSesionesForm}
          onSubmit={handleAñadirSesiones}
          loading={loading}
        />
      </div>
    </div>
  )
}

export default GestionBonos
