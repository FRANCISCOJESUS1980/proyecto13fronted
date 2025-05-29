import { getUserMedicalInfo } from '../../../../../services/Api/index'
import alertService from '../../../../../components/sweealert2/sweealert2'

export const fetchMedicalInfo = async (setLoading, setMedicalData) => {
  try {
    setLoading(true)
    const token = localStorage.getItem('token')
    const data = await getUserMedicalInfo(token)
    setMedicalData(data)
  } catch (error) {
    console.error('Error al obtener información médica:', error)
    alertService.error(
      'Error',
      'No se pudo cargar la información médica. Por favor, intenta de nuevo más tarde.'
    )
  } finally {
    setLoading(false)
  }
}

export const handleBackNavigationWithChanges = (
  checkFormChanges,
  navigate,
  alertService
) => {
  const hasChanges = checkFormChanges()

  if (hasChanges) {
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
          navigate('/dashboard')
        }
      })
  } else {
    navigate('/dashboard')
  }
}
