export const enrichConsentimientosWithUsers = (consentimientos, usuarios) => {
  return consentimientos.map((consentimiento) => {
    if (consentimiento.userId && typeof consentimiento.userId === 'object') {
      return {
        ...consentimiento,
        nombreUsuario:
          consentimiento.userId.nombre && consentimiento.userId.apellidos
            ? `${consentimiento.userId.nombre} ${consentimiento.userId.apellidos}`.trim()
            : consentimiento.userId.nombre || 'Usuario desconocido',
        email: consentimiento.userId.email || 'Email no disponible'
      }
    }

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
  const sinFirma = consentimientos.filter((c) => !c.firmaDigital).length

  return {
    total,
    autorizan,
    noAutorizan,
    sinFirma
  }
}

export const validateConsentimiento = (consentimiento) => {
  const errors = []

  if (!consentimiento.nombreCompleto?.trim()) {
    errors.push('Nombre completo requerido')
  }

  if (!consentimiento.dni?.trim()) {
    errors.push('DNI requerido')
  }

  if (!consentimiento.firmaDigital) {
    errors.push('Firma digital requerida')
  }

  if (
    consentimiento.autorizaImagen === null ||
    consentimiento.autorizaImagen === undefined
  ) {
    errors.push('Autorización de imagen requerida')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

export const exportConsentimientoData = (consentimiento) => {
  return {
    nombreCompleto: consentimiento.nombreCompleto,
    dni: consentimiento.dni,
    email: consentimiento.email,
    autorizaImagen: consentimiento.autorizaImagen ? 'Sí' : 'No',
    fechaAceptacion: formatDate(consentimiento.fechaAceptacion),
    tieneFirma: consentimiento.firmaDigital ? 'Sí' : 'No'
  }
}
