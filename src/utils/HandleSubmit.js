import { saveMedicalInfo } from '../services/Api'
import { registrarUsuario } from '../services/Api'
import { actualizarPerfilUsuario, iniciarSesion } from '../services/Api/index'
import alertService from '../components/sweealert2/sweealert2'

export const handleProductSubmit = async ({
  e,
  state,
  token,
  validateForm,
  dispatch,
  cargarProductos,
  ACTIONS,
  actualizarProducto,
  crearProducto
}) => {
  e.preventDefault()
  if (!validateForm()) return

  dispatch({ type: ACTIONS.SET_LOADING, payload: true })
  dispatch({ type: ACTIONS.SET_ERROR, payload: '' })

  try {
    if (state.editando) {
      const response = await actualizarProducto(
        token,
        state.editando,
        state.form,
        state.form.imagen
      )
      if (response.success) {
        alertService.success(
          'Producto actualizado',
          'El producto ha sido actualizado correctamente'
        )
      }
    } else {
      const response = await crearProducto(token, state.form, state.form.imagen)
      if (response.success) {
        alertService.success(
          'Producto creado',
          'El producto ha sido creado correctamente'
        )
      }
    }

    dispatch({ type: ACTIONS.RESET_FORM })
    cargarProductos()
    dispatch({ type: ACTIONS.SET_MODAL_OPEN, payload: false })
  } catch (error) {
    alertService.error('Error', error.message || 'Error al guardar el producto')
    dispatch({
      type: ACTIONS.SET_ERROR,
      payload: error.message || 'Error al guardar el producto'
    })
  } finally {
    dispatch({ type: ACTIONS.SET_LOADING, payload: false })
  }
}

const handlers = {
  clase: async ({
    formData,
    editingId,
    modoCreacion,
    onSuccess,
    setLoading,
    setError,
    setSuccess
  }) => {
    setLoading(true)
    setError(null)

    try {
      const result = await guardarClase(formData, editingId, modoCreacion)

      if (result.success) {
        alertService.success(
          'Clases guardadas',
          `${result.clasesCreadas} horarios de clase ${
            editingId ? 'actualizados' : 'creados'
          } con éxito`
        )
        onSuccess()
      }

      if (result.clasesConError > 0) {
        alertService.warning(
          'Atención',
          `Hubo errores al crear ${result.clasesConError} horarios. Por favor, inténtalo de nuevo.`
        )
      }
    } catch (error) {
      alertService.error('Error', error.message || 'Error al guardar la clase')
      setError(error.message || 'Error al guardar la clase')
    } finally {
      setLoading(false)
    }
  },

  producto: async ({
    state,
    token,
    validateForm,
    dispatch,
    cargarProductos,
    ACTIONS,
    actualizarProducto,
    crearProducto
  }) => {
    if (!validateForm()) return
    dispatch({ type: ACTIONS.SET_LOADING, payload: true })
    dispatch({ type: ACTIONS.SET_ERROR, payload: '' })

    try {
      const response = state.editando
        ? await actualizarProducto(
            token,
            state.editando,
            state.form,
            state.form.imagen
          )
        : await crearProducto(token, state.form, state.form.imagen)

      if (response.success) {
        alertService.success(
          state.editando ? 'Producto actualizado' : 'Producto creado',
          state.editando
            ? 'El producto ha sido actualizado correctamente'
            : 'El producto ha sido creado correctamente'
        )
      }
      dispatch({ type: ACTIONS.RESET_FORM })
      cargarProductos()
      dispatch({ type: ACTIONS.SET_MODAL_OPEN, payload: false })
    } catch (error) {
      alertService.error(
        'Error',
        error.message || 'Error al guardar el producto'
      )
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: error.message || 'Error al guardar el producto'
      })
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false })
    }
  },

  contacto: ({ setMensajeEnviado }) => {
    alertService.success(
      'Mensaje enviado',
      'Tu mensaje ha sido enviado correctamente. Nos pondremos en contacto contigo pronto.'
    )
    setMensajeEnviado(true)
  },

  editarUsuario: async ({
    user,
    avatarFile,
    isSubmitting,
    setIsSubmitting,
    navigate
  }) => {
    if (isSubmitting) return

    setIsSubmitting(true)

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        navigate('/iniciar-sesion')
        return
      }

      const response = await actualizarPerfilUsuario(token, user, avatarFile)
      if (response.success) {
        localStorage.setItem('nombre', user.nombre)

        alertService.success(
          'Perfil actualizado',
          'Tu perfil ha sido actualizado correctamente'
        )
        navigate('/dashboard')
      } else {
        alertService.error(
          'Error',
          'Error al actualizar el perfil: ' +
            (response.message || 'Error desconocido')
        )
      }
    } catch (error) {
      console.error('Error completo:', error)

      alertService.error(
        'Error',
        'Error al actualizar el perfil: ' + error.message
      )
    } finally {
      setIsSubmitting(false)
    }
  },

  login: async ({ formData, setIsLoading, navigate, onError }) => {
    setIsLoading(true)
    try {
      const response = await iniciarSesion(formData.email, formData.password)

      if (response && response.ok) {
        const { data } = response.data
        localStorage.setItem('token', data.token)
        localStorage.setItem('nombre', data.nombre)
        localStorage.setItem('rol', data.rol)

        alertService.success(
          'Inicio de sesión exitoso',
          `Bienvenido/a ${data.nombre}`
        )

        setTimeout(() => navigate('/dashboard'), 1500)
      } else {
        alertService.error(
          'Error de inicio de sesión',
          response.data?.message || 'Credenciales incorrectas'
        )
        if (onError) onError()
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error)

      alertService.error(
        'Error de conexión',
        'No se pudo conectar con el servidor. Por favor, intenta de nuevo más tarde.'
      )
      if (onError) onError()
    } finally {
      setIsLoading(false)
    }
  },

  registro: async ({
    formData,
    selectedImage,
    setIsLoading,
    setRegistroExitoso
  }) => {
    setIsLoading(true)
    try {
      const response = await registrarUsuario(formData, selectedImage)

      if (!response) {
        throw new Error('Respuesta inválida del servidor')
      }

      if (response.ok && response.data) {
        const userData = response.data.data || response.data

        if (userData._id) {
          localStorage.setItem('user', JSON.stringify({ _id: userData._id }))
          localStorage.setItem('userId', userData._id)
          localStorage.setItem('token', userData.token)
          localStorage.setItem('nombre', userData.nombre || formData.nombre)
          localStorage.setItem('rol', userData.rol || 'user')

          if (userData.avatar) {
            localStorage.setItem('avatar', userData.avatar)
          }

          alertService.success(
            '¡Registro exitoso!',
            'Tu cuenta ha sido creada correctamente. Bienvenido/a a AderCrossfit.'
          )

          setRegistroExitoso(true)
          return
        }

        console.warn(
          'No se encontró un _id en la respuesta, pero el registro fue exitoso'
        )

        alertService.success(
          '¡Registro exitoso!',
          'Tu cuenta ha sido creada correctamente. Bienvenido/a a CrossFit Box.'
        )

        setRegistroExitoso(true)
      } else {
        throw new Error(response.message || 'Error en el registro')
      }
    } catch (error) {
      console.error('Error en el registro:', error)

      alertService.error(
        'Error en el registro',
        error.message || 'Error desconocido en el registro'
      )
    } finally {
      setIsLoading(false)
    }
  },

  aspecto: async (params) => {
    alertService.success(
      'Información guardada',
      'Tus datos físicos han sido guardados correctamente'
    )
  },

  marcas: async (params) => {
    alertService.success(
      'Marcas guardadas',
      'Tus marcas personales han sido guardadas correctamente'
    )
  },

  medico: async ({ medicalInfo, setLoading, onSuccess }) => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('No hay token de autenticación')
      }
      await saveMedicalInfo(token, medicalInfo)

      alertService.success(
        '¡Información guardada!',
        'Tu información médica ha sido actualizada correctamente.'
      )

      if (typeof onSuccess === 'function') {
        onSuccess()
      }
    } catch (error) {
      alertService.error(
        'Error',
        error.message || 'Error al guardar la información médica'
      )
    } finally {
      setLoading(false)
    }
  }
}

const handleSubmitHelper = async (e, type, params) => {
  e.preventDefault()

  if (handlers[type]) {
    return handlers[type](params)
  } else {
    console.error(`handleSubmitHelper: Tipo desconocido "${type}"`)
    alertService.error(
      'Error interno',
      `Tipo de formulario desconocido: "${type}"`
    )
  }
}

export default handleSubmitHelper
