import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import './sweealert2.css'

const MySwal = withReactContent(Swal)

const clearExistingAlerts = () => {
  Swal.close()

  const rootElement = document.getElementById('root')
  if (rootElement && rootElement.hasAttribute('aria-hidden')) {
    rootElement.removeAttribute('aria-hidden')
  }
}

const alertService = {
  success: (title, text, options = {}) => {
    clearExistingAlerts()
    return MySwal.fire({
      icon: 'success',
      title: title,
      text: text,
      showConfirmButton: true,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#3085d6',
      ...options,

      customClass: {
        container: 'swal2-container-top-layer',
        popup: 'swal2-popup-top-layer',
        ...(options.customClass || {})
      },
      target: document.body
    })
  },

  error: (title, text, options = {}) => {
    clearExistingAlerts()
    return MySwal.fire({
      icon: 'error',
      title: title,
      text: text,
      showConfirmButton: true,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#d33',
      ...options,

      customClass: {
        container: 'swal2-container-top-layer',
        popup: 'swal2-popup-top-layer',
        ...(options.customClass || {})
      },

      target: document.body
    })
  },

  info: (title, text, options = {}) => {
    clearExistingAlerts()
    return MySwal.fire({
      icon: 'info',
      title: title,
      text: text,
      showConfirmButton: true,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#3085d6',
      ...options,

      customClass: {
        container: 'swal2-container-top-layer',
        popup: 'swal2-popup-top-layer',
        ...(options.customClass || {})
      },

      target: document.body
    })
  },

  warning: (title, text, options = {}) => {
    clearExistingAlerts()
    return MySwal.fire({
      icon: 'warning',
      title: title,
      text: text,
      showConfirmButton: true,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#f8bb86',
      ...options,

      customClass: {
        container: 'swal2-container-top-layer',
        popup: 'swal2-popup-top-layer',
        ...(options.customClass || {})
      },

      target: document.body
    })
  },

  confirm: (titleOrOptions, text, options = {}) => {
    clearExistingAlerts()

    const defaultOptions = {
      title: '¿Estás seguro?',
      text: '¿Deseas continuar con esta acción?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      reverseButtons: true,
      focusCancel: false,
      allowOutsideClick: false,
      allowEscapeKey: true,
      allowEnterKey: true,
      backdrop: true,

      customClass: {
        container: 'swal2-container-top-layer',
        popup: 'swal2-popup-top-layer'
      },

      target: document.body,

      didClose: () => {
        const rootElement = document.getElementById('root')
        if (rootElement && rootElement.hasAttribute('aria-hidden')) {
          rootElement.removeAttribute('aria-hidden')
        }
      }
    }

    if (typeof titleOrOptions === 'object') {
      return MySwal.fire({
        ...defaultOptions,
        ...titleOrOptions,
        didClose: () => {
          if (titleOrOptions.didClose) titleOrOptions.didClose()
          const rootElement = document.getElementById('root')
          if (rootElement && rootElement.hasAttribute('aria-hidden')) {
            rootElement.removeAttribute('aria-hidden')
          }
        }
      })
    }

    return MySwal.fire({
      ...defaultOptions,
      title: titleOrOptions,
      text: text,
      ...options,
      didClose: () => {
        if (options.didClose) options.didClose()
        const rootElement = document.getElementById('root')
        if (rootElement && rootElement.hasAttribute('aria-hidden')) {
          rootElement.removeAttribute('aria-hidden')
        }
      }
    })
  },

  loading: (
    title = 'Procesando...',
    text = 'Por favor, espera un momento',
    options = {}
  ) => {
    clearExistingAlerts()
    return MySwal.fire({
      title: title,
      text: text,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading()
      },
      ...options,
      customClass: {
        container: 'swal2-container-top-layer',
        popup: 'swal2-popup-top-layer',
        ...(options.customClass || {})
      },
      target: document.body
    })
  },

  showLoading: () => {
    return Swal.showLoading()
  },

  close: clearExistingAlerts,

  clearAlerts: clearExistingAlerts
}

const style = document.createElement('style')
style.innerHTML = `
  .swal2-container-top-layer {
    z-index: 9999 !important;
  }
  .swal2-popup-top-layer {
    z-index: 10000 !important;
  }
`
document.head.appendChild(style)

export default alertService
