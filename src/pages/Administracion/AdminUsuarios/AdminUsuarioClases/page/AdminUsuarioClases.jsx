import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Header from '../../../../../components/Header/page/Header'
import Button from '../../../../../components/Button/Button'
import Loading from '../../../../../components/Loading/loading'
import ErrorMessage from '../components/ErrorMessage'
import UserHeader from '../components/UserHeader'
import NotificationMessages from '../components/NotificationMessages'
import CalendarSection from '../components/CalendarSection'
import ClassesSection from '../components/ClassesSection'
import { useCalendario } from '../../../../Clases/hooks/useCalendario'
import { useUserInfo } from '../hooks/useUserinfo'
import { useUserClasses } from '../hooks/useUserClasses'
import { useClassActions } from '../hooks/useClassActions'
import { useNotifications } from '../hooks/useNotifications'
import { isUserEnrolled } from '../utils/classUtils'
import './AdminUsuarioClases.css'

const AdminUsuarioClases = () => {
  const { userId } = useParams()
  const navigate = useNavigate()

  const {
    selectedDate,
    visibleDates,
    calendarRef,
    handlePrevWeek,
    handleNextWeek,
    setSelectedDate,
    currentMonth
  } = useCalendario()

  const {
    userInfo,
    loading: loadingUser,
    error: userError
  } = useUserInfo(userId)

  const {
    clasesOrdenadas,
    loading: loadingClases,
    error: clasesError,
    updateClasses
  } = useUserClasses(selectedDate)

  const {
    inscripcionExitosa,
    cancelacionExitosa,
    showInscripcionExitosa,
    showCancelacionExitosa
  } = useNotifications()

  const {
    claseSeleccionada,
    error: actionError,
    handleInscribir,
    handleCancelar
  } = useClassActions(userId, userInfo, updateClasses)

  const handleInscribirWithNotification = async (claseId) => {
    const result = await handleInscribir(claseId)
    if (result.success) {
      showInscripcionExitosa(result.message)
    }
  }

  const handleCancelarWithNotification = async (claseId) => {
    const result = await handleCancelar(claseId)
    if (result.success) {
      showCancelacionExitosa(result.message)
    }
  }

  const handleVolver = () => {
    navigate('/administracion/usuarios')
  }

  const handleVolverAdmin = () => {
    navigate('/administracion')
  }

  const estaInscrito = (clase) => isUserEnrolled(clase, userId)

  const clasesInscritasTotal = clasesOrdenadas.filter((clase) =>
    estaInscrito(clase)
  ).length

  if (loadingUser && !userInfo) {
    return (
      <div className='cf-admin-usuario-clases-container'>
        <Header />
        <div className='cf-admin-usuario-clases-content'>
          <Loading
            isVisible={true}
            loadingText='CARGANDO INFORMACIÓN DEL USUARIO...'
          />
        </div>
      </div>
    )
  }

  if (userError && !userInfo) {
    return (
      <div className='cf-admin-usuario-clases-container'>
        <Header />
        <div className='cf-admin-usuario-clases-content'>
          <ErrorMessage error={userError} />
          <Button
            variant='secondary'
            onClick={handleVolverAdmin}
            leftIcon={<ArrowLeft size={18} />}
            className='cf-admin-usuarios-back-btn'
          >
            Volver a Administración
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className='cf-admin-usuario-clases-container'>
      <Header />

      <div className='cf-admin-usuario-clases-content'>
        <div className='cf-admin-usuario-clases-header'>
          <Button
            variant='secondary'
            size='sm'
            onClick={handleVolver}
            leftIcon={<ArrowLeft size={18} />}
          >
            Volver a AdminUsuarios
          </Button>

          <UserHeader
            userInfo={userInfo}
            clasesInscritasTotal={clasesInscritasTotal}
          />
        </div>

        <NotificationMessages
          inscripcionExitosa={inscripcionExitosa}
          cancelacionExitosa={cancelacionExitosa}
        />

        <CalendarSection
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          visibleDates={visibleDates}
          calendarRef={calendarRef}
          handlePrevWeek={handlePrevWeek}
          handleNextWeek={handleNextWeek}
          setSelectedDate={setSelectedDate}
        />

        <ClassesSection
          selectedDate={selectedDate}
          clasesOrdenadas={clasesOrdenadas}
          handleInscribir={handleInscribirWithNotification}
          handleCancelar={handleCancelarWithNotification}
          estaInscrito={estaInscrito}
          loading={loadingClases}
          claseSeleccionada={claseSeleccionada}
          error={clasesError || actionError}
        />
      </div>
    </div>
  )
}

export default AdminUsuarioClases
