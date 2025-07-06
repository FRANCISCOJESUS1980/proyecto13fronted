import { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../../../../components/Header/page/Header'
import Loading from '../../../../../components/Loading/loading'
import { usePersonalRecords } from '../hooks/usePersonalRecords.jsx'
import { useUI } from '../hooks/useUI.jsx'
import { groupRecordsByCategory } from '../utils/recordsUtils.js'
import RecordsHeader from '../components/RecordsHeader.jsx'
import RecordsTabs from '../components/RecordsTabs.jsx'
import RecordsContent from '../components/RecordsContent.jsx'
import PersonalRecordForm from '../components/PersonalRecords/PersonalRecordForm/PersonalRecordForm'
import alertService from '../../../../../components/sweealert2/sweealert2'
import './Marcas.css'

const PersonalRecordsPage = () => {
  const navigate = useNavigate()

  const {
    records,
    selectedRecord,
    uniqueExercises,
    loading,
    error,
    fetchRecords,
    addRecord,
    updateRecord,
    deleteRecord,
    setSelectedRecord,
    clearSelectedRecord
  } = usePersonalRecords()

  const { activeTab, showForm, animationComplete, setActiveTab, toggleForm } =
    useUI()

  const recordsByCategory = useMemo(
    () => groupRecordsByCategory(records),
    [records]
  )

  const handleAddRecord = useCallback(
    async (record) => {
      try {
        await addRecord(record)
        toggleForm(false)
      } catch (error) {}
    },
    [addRecord, toggleForm]
  )

  const handleEditRecord = useCallback(
    async (id, updatedRecord) => {
      try {
        await updateRecord(id, updatedRecord)
      } catch (error) {}
    },
    [updateRecord]
  )

  const handleCloseForm = useCallback(() => {
    if (window.personalRecordHasUnsavedChanges) {
      alertService.clearAlerts()
      alertService
        .confirm(
          '¿Estás seguro?',
          'Tienes cambios sin guardar. ¿Deseas salir sin guardar?',
          {
            confirmButtonText: 'Sí, salir',
            cancelButtonText: 'No, continuar editando',
            allowOutsideClick: false,
            customClass: {
              container: 'swal2-container-top-layer',
              popup: 'swal2-popup-top-layer'
            },
            target: document.body
          }
        )
        .then((result) => {
          if (result.isConfirmed) {
            window.personalRecordHasUnsavedChanges = false
            toggleForm(false)
          }
        })
    } else {
      toggleForm(false)
    }
  }, [toggleForm])

  const handleCloseEditForm = useCallback(() => {
    if (window.personalRecordHasUnsavedChanges) {
      alertService.clearAlerts()
      alertService
        .confirm(
          '¿Estás seguro?',
          'Tienes cambios sin guardar. ¿Deseas salir sin guardar?',
          {
            confirmButtonText: 'Sí, salir',
            cancelButtonText: 'No, continuar editando',
            allowOutsideClick: false,
            customClass: {
              container: 'swal2-container-top-layer',
              popup: 'swal2-popup-top-layer'
            },
            target: document.body
          }
        )
        .then((result) => {
          if (result.isConfirmed) {
            window.personalRecordHasUnsavedChanges = false
            clearSelectedRecord()
          }
        })
    } else {
      clearSelectedRecord()
    }
  }, [clearSelectedRecord])

  const handleBackNavigation = useCallback(() => {
    if (window.personalRecordHasUnsavedChanges) {
      alertService.clearAlerts()
      alertService
        .confirm(
          '¿Estás seguro?',
          'Tienes cambios sin guardar. ¿Deseas salir sin guardar?',
          {
            confirmButtonText: 'Sí, salir',
            cancelButtonText: 'No, continuar editando',
            allowOutsideClick: false,
            customClass: {
              container: 'swal2-container-top-layer',
              popup: 'swal2-popup-top-layer'
            },
            target: document.body
          }
        )
        .then((result) => {
          if (result.isConfirmed) {
            window.personalRecordHasUnsavedChanges = false
            navigate('/dashboard')
          }
        })
    } else {
      navigate('/dashboard')
    }
  }, [navigate])

  if (loading) {
    return (
      <Loading
        isVisible={loading}
        loadingText='CARGANDO MARCAS PERSONALES...'
        onComplete={() => {}}
      />
    )
  }

  return (
    <div className='cf-marcas-container'>
      <div className='cf-marcas-animation-wrapper'>
        <div className='cf-marcas-dumbbell-anim'></div>
        <div className='cf-marcas-trophy-anim'></div>
      </div>

      <Header />

      <RecordsHeader
        onAddRecord={() => toggleForm(true)}
        onBackNavigation={handleBackNavigation}
      />

      <div
        className={`cf-marcas-content-wrapper ${
          animationComplete ? 'cf-marcas-content-visible' : ''
        }`}
      >
        <RecordsTabs
          activeTab={activeTab}
          recordsByCategory={recordsByCategory}
          onTabChange={setActiveTab}
        />

        <div className='cf-marcas-content'>
          <RecordsContent
            activeTab={activeTab}
            records={records}
            recordsByCategory={recordsByCategory}
            uniqueExercises={uniqueExercises}
            error={error}
            onDelete={deleteRecord}
            onEdit={setSelectedRecord}
            onRetry={fetchRecords}
          />
        </div>
      </div>

      {showForm && (
        <div className='cf-marcas-modal-overlay'>
          <div className='cf-marcas-modal'>
            <PersonalRecordForm
              onSubmit={handleAddRecord}
              onCancel={handleCloseForm}
            />
          </div>
        </div>
      )}

      {selectedRecord && (
        <div className='cf-marcas-modal-overlay'>
          <div className='cf-marcas-modal'>
            <PersonalRecordForm
              record={selectedRecord}
              onSubmit={(updatedRecord) =>
                handleEditRecord(selectedRecord._id, updatedRecord)
              }
              onCancel={handleCloseEditForm}
              isEditing={true}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default PersonalRecordsPage
