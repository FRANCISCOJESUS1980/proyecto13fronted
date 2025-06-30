export const LOADING_MESSAGES = {
  USER_INFO: 'CARGANDO INFORMACIÓN DEL USUARIO...',
  CLASSES: 'CARGANDO CLASES...'
}

export const ERROR_MESSAGES = {
  NO_TOKEN: 'No hay token de autenticación',
  FETCH_CLASSES:
    'No se pudieron cargar las clases. Por favor, intenta de nuevo más tarde.',
  INSCRIBE_USER: 'Error al inscribir al usuario',
  CANCEL_INSCRIPTION: 'Error al cancelar la inscripción'
}

export const SUCCESS_MESSAGES = {
  INSCRIPTION: (userName) =>
    `${userName} ha sido inscrito correctamente en la clase`,
  CANCELLATION: (userName) =>
    `La inscripción de ${userName} ha sido cancelada correctamente`
}

export const NOTIFICATION_TIMEOUT = 3000

export const DEFAULT_AVATAR = '/default-avatar.png'
