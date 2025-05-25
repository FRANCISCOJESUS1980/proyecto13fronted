export const enrichConsentimientosWithUsers = (consentimientos, usuarios) => {
  return consentimientos.map((consentimiento) => {
    const usuario = usuarios.find((u) => u._id === consentimiento.userId)
    return {
      ...consentimiento,
      nombreUsuario: usuario
        ? `${usuario.nombre || ''} ${usuario.apellidos || ''}`.trim()
        : 'Usuario desconocido',
      email: usuario ? usuario.email : 'Email no disponible'
    }
  })
}

export const formatDate = (dateString) => {
  if (!dateString) return 'Fecha no disponible'

  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch (error) {
    console.error('Error al formatear fecha:', error)
    return 'Fecha inválida'
  }
}

export const calculateStats = (consentimientos) => {
  const total = consentimientos.length
  const autorizan = consentimientos.filter((c) => c.autorizaImagen).length
  const noAutorizan = consentimientos.filter(
    (c) => c.autorizaImagen === false
  ).length

  return { total, autorizan, noAutorizan }
}
