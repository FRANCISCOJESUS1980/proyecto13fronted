import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import './sweealert2.css'

const MySwal = withReactContent(Swal)

const alertService = {
  success: (title, text, options = {}) => {
    return MySwal.fire({
      icon: 'success',
      title,
      text,
      ...options
    })
  },

  error: (title, text, options = {}) => {
    return MySwal.fire({
      icon: 'error',
      title,
      text,
      ...options
    })
  },

  warning: (title, text, options = {}) => {
    return MySwal.fire({
      icon: 'warning',
      title,
      text,
      ...options
    })
  },

  info: (title, text, options = {}) => {
    return MySwal.fire({
      icon: 'info',
      title,
      text,
      ...options
    })
  },

  confirm: (title, text, options = {}) => {
    return MySwal.fire({
      icon: 'question',
      title,
      text,
      showCancelButton: true,
      confirmButtonText: options.confirmButtonText || 'Confirmar',
      cancelButtonText: options.cancelButtonText || 'Cancelar',
      ...options
    })
  },

  custom: (options) => {
    return MySwal.fire(options)
  },

  toast: (title, icon = 'success', options = {}) => {
    return MySwal.fire({
      toast: true,
      position: 'top-end',
      icon,
      title,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      ...options
    })
  }
}

export default alertService
