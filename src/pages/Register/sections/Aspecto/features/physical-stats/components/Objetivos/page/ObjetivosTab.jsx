import { useState, useEffect } from 'react'
import ObjetivosHeader from '../components/ObjetivosHeader'
import ObjetivosForm from '../components/ObjetivosForm'
import ObjetivosList from '../components/ObjetivosList'
import useObjetivosForm from '../hooks/useObjetivosForm'
import usePhysicalStats from '../../../hooks/usePhysicalStats'
import alertService from '../../../../../../../../../components/sweealert2/sweealert2'
import './ObjetivosTab.css'

const ObjetivosTab = ({ onMessage }) => {
  const { objetivos, loading, createObjetivo, fetchObjetivos, deleteObjetivo } =
    usePhysicalStats()
  const [animationComplete, setAnimationComplete] = useState(false)

  const {
    showForm,
    formData,
    hasUnsavedChanges,
    handleChange,
    handleToggleForm,
    resetForm,
    getFormDataAsNumbers
  } = useObjetivosForm()

  useEffect(() => {
    window.objetivosHasUnsavedChanges = false
    return () => {
      window.objetivosHasUnsavedChanges = false
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    fetchObjetivos()
  }, [fetchObjetivos])

  const handleFormToggle = () => {
    if (showForm && hasUnsavedChanges) {
      alertService
        .confirm(
          '¿Estás seguro?',
          'Tienes cambios sin guardar. ¿Deseas salir sin guardar?',
          {
            confirmButtonText: 'Sí, salir',
            cancelButtonText: 'No, continuar editando'
          }
        )
        .then((result) => {
          if (result.isConfirmed) {
            handleToggleForm()
            resetForm()
          }
        })
    } else {
      handleToggleForm()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const fechaObjetivo = new Date(formData.fechaObjetivo)
    const hoy = new Date()

    if (fechaObjetivo <= hoy) {
      alertService.error('Error', 'La fecha objetivo debe ser posterior a hoy')
      onMessage({
        text: 'La fecha objetivo debe ser posterior a hoy',
        type: 'error'
      })
      return
    }

    const objetivoData = getFormDataAsNumbers()
    const result = await createObjetivo(objetivoData)

    if (result.success) {
      alertService.success(
        '¡Éxito!',
        'Tu objetivo ha sido creado correctamente'
      )
      handleToggleForm()
      resetForm()
    } else {
      alertService.error(
        'Error',
        result.message || 'No se pudo crear el objetivo'
      )
    }

    onMessage({
      text: result.message,
      type: result.success ? 'success' : 'error'
    })
  }

  const handleDeleteObjetivo = async (objetivoId) => {
    alertService
      .confirm(
        'Eliminar Objetivo',
        '¿Estás seguro de que deseas eliminar este objetivo? Esta acción no se puede deshacer.',
        {
          confirmButtonText: 'Sí, eliminar',
          cancelButtonText: 'Cancelar',
          icon: 'warning'
        }
      )
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            if (typeof deleteObjetivo !== 'function') {
              console.error('deleteObjetivo no es una función:', deleteObjetivo)
              alertService.error(
                'Error',
                'Error interno: función de eliminación no disponible'
              )
              onMessage({
                text: 'Error interno: función de eliminación no disponible',
                type: 'error'
              })
              return
            }

            const deleteResult = await deleteObjetivo(objetivoId)

            if (deleteResult.success) {
              alertService.success(
                '¡Éxito!',
                'El objetivo ha sido eliminado correctamente'
              )
            } else {
              alertService.error(
                'Error',
                deleteResult.message || 'No se pudo eliminar el objetivo'
              )
            }

            onMessage({
              text: deleteResult.message,
              type: deleteResult.success ? 'success' : 'error'
            })
          } catch (error) {
            console.error('Error al eliminar objetivo:', error)
            alertService.error(
              'Error',
              error.message || 'Error al eliminar objetivo'
            )
            onMessage({
              text: error.message || 'Error al eliminar objetivo',
              type: 'error'
            })
          }
        }
      })
  }

  return (
    <div
      className={`cf-objetivos-container ${
        animationComplete ? 'cf-objetivos-fade-in' : ''
      }`}
    >
      <ObjetivosHeader showForm={showForm} onToggleForm={handleFormToggle} />

      {showForm && (
        <ObjetivosForm
          formData={formData}
          loading={loading}
          hasUnsavedChanges={hasUnsavedChanges}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      )}

      <ObjetivosList
        objetivos={objetivos}
        loading={loading}
        onDelete={handleDeleteObjetivo}
      />
    </div>
  )
}

export default ObjetivosTab
