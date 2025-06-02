import { useCallback } from 'react'
import alertService from '../../../../components/sweealert2/sweealert2'

export const useImageUpload = (dispatch) => {
  const handleImageChange = useCallback(
    (e) => {
      const file = e.target.files[0]
      if (file) {
        const maxSize = 5 * 1024 * 1024
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif']

        if (file.size > maxSize) {
          alertService.error(
            'Archivo demasiado grande',
            'La imagen debe ser menor a 5MB. Por favor, selecciona otra imagen.'
          )
          return
        }

        if (!validTypes.includes(file.type)) {
          alertService.error(
            'Formato no válido',
            'Por favor, selecciona una imagen en formato JPG, PNG o GIF.'
          )
          return
        }

        dispatch({ type: 'SET_SELECTED_IMAGE', payload: file })

        const reader = new FileReader()
        reader.onloadend = () => {
          dispatch({ type: 'SET_PREVIEW_URL', payload: reader.result })
        }
        reader.readAsDataURL(file)
      }
    },
    [dispatch]
  )

  return { handleImageChange }
}
