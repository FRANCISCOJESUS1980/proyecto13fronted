import { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../../components/Header/Header'
import './Clases.css'

axios.defaults.withCredentials = true

const Clases = () => {
  const [clases, setClases] = useState([])
  const [error, setError] = useState(null)
  const [userId, setUserId] = useState('')
  const [userInfo, setUserInfo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [inscripcionExitosa, setInscripcionExitosa] = useState(null)
  const [claseSeleccionada, setClaseSeleccionada] = useState(null)
  const [imagenesFallidas, setImagenesFallidas] = useState({})
  const [diaSeleccionado, setDiaSeleccionado] = useState(obtenerDiaActual())
  const [cancelacionExitosa, setCancelacionExitosa] = useState(null)

  function obtenerDiaActual() {
    const dias = [
      'domingo',
      'lunes',
      'martes',
      'miércoles',
      'jueves',
      'viernes',
      'sábado'
    ]
    const hoy = new Date().getDay()
    return dias[hoy]
  }

  const diasSemana = [
    'lunes',
    'martes',
    'miércoles',
    'jueves',
    'viernes',
    'sábado',
    'domingo'
  ]

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          console.warn('No hay token en localStorage')
          return
        }

        const response = await axios.get('http://localhost:5000/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        })

        setUserId(response.data.userId)
        setUserInfo(response.data)
      } catch (err) {
        console.error(
          'Error al obtener usuario:',
          err.response?.data || err.message
        )
      }
    }

    const fetchClases = async () => {
      setLoading(true)
      try {
        const response = await axios.get('http://localhost:5000/api/classes', {
          withCredentials: true
        })
        if (response.data && Array.isArray(response.data.data)) {
          setClases(response.data.data)
        } else {
          throw new Error('La respuesta del servidor no es válida')
        }
      } catch (err) {
        console.error('Error al cargar clases:', err)
        setError('No se pudieron cargar las clases')
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
    fetchClases()
  }, [])

  const handleInscribir = async (claseId) => {
    if (!userId) {
      alert('Debes iniciar sesión para inscribirte en una clase')
      return
    }

    setLoading(true)
    setClaseSeleccionada(claseId)

    try {
      const response = await axios.post(
        `http://localhost:5000/api/classes/${claseId}/inscribir`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          withCredentials: true
        }
      )

      if (response.data.success) {
        setClases((prevClases) =>
          prevClases.map((clase) => {
            if (clase._id === claseId) {
              const userInfoToAdd = {
                _id: userId,
                nombre: userInfo?.nombre || '',
                email: userInfo?.email || '',
                imagen: userInfo?.imagen || '/default-avatar.png',
                rol: userInfo?.rol || 'usuario'
              }

              return {
                ...clase,
                inscritos: [...clase.inscritos, userInfoToAdd]
              }
            }
            return clase
          })
        )

        setInscripcionExitosa(`¡Te has inscrito correctamente a la clase!`)
        setTimeout(() => setInscripcionExitosa(null), 3000)
      } else {
        alert(response.data.message || 'Error al inscribirse')
      }
    } catch (err) {
      console.error('Error al inscribirse:', err.response?.data || err.message)
      alert(err.response?.data?.message || 'Error al inscribirse en la clase')
    } finally {
      setLoading(false)
      setClaseSeleccionada(null)
    }
  }

  const handleCancelar = async (claseId) => {
    if (!userId) {
      alert('Debes iniciar sesión para cancelar tu inscripción')
      return
    }

    setLoading(true)
    setClaseSeleccionada(claseId)

    try {
      const response = await axios.post(
        `http://localhost:5000/api/classes/${claseId}/cancelar`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          withCredentials: true
        }
      )

      if (response.data && response.data.success) {
        setClases((prevClases) =>
          prevClases.map((clase) =>
            clase._id === claseId
              ? {
                  ...clase,
                  inscritos: clase.inscritos.filter(
                    (inscrito) =>
                      inscrito._id &&
                      inscrito._id.toString() !== userId.toString() &&
                      (typeof inscrito === 'string'
                        ? inscrito !== userId
                        : true)
                  )
                }
              : clase
          )
        )

        setCancelacionExitosa(`Has cancelado tu inscripción correctamente`)
        setTimeout(() => setCancelacionExitosa(null), 3000)
      } else {
        throw new Error(
          response.data?.message || 'Error al cancelar la inscripción'
        )
      }
    } catch (err) {
      console.error(
        'Error al cancelar inscripción:',
        err.response?.data || err.message
      )
      alert(
        err.response?.data?.message ||
          err.message ||
          'Error al cancelar la inscripción'
      )
    } finally {
      setLoading(false)
      setClaseSeleccionada(null)
    }
  }

  const estaInscrito = (clase) => {
    if (!userId || !clase || !clase.inscritos) return false

    return clase.inscritos.some((inscrito) => {
      if (typeof inscrito === 'string') {
        return inscrito === userId
      }

      if (inscrito && inscrito._id) {
        return inscrito._id.toString() === userId.toString()
      }

      return false
    })
  }

  const getImageUrl = (inscrito) => {
    if (!inscrito) return '/default-avatar.png'

    if (typeof inscrito === 'string') {
      return '/default-avatar.png'
    }

    if (inscrito.avatar) {
      if (inscrito.avatar.includes('cloudinary.com')) {
        return inscrito.avatar
      }

      if (inscrito.avatar.startsWith('http')) {
        return inscrito.avatar
      }

      return `http://localhost:5000/uploads/${inscrito.avatar}`
    }

    return '/default-avatar.png'
  }

  const handleImageError = (inscritoId) => {
    setImagenesFallidas((prev) => ({
      ...prev,
      [inscritoId]: true
    }))
  }

  const clasesPorDia = clases.filter(
    (clase) => clase.diaSemana === diaSeleccionado
  )

  const clasesOrdenadas = [...clasesPorDia].sort((a, b) => {
    const getMinutos = (horario) => {
      const [horas, minutos] = horario.split(':').map(Number)
      return horas * 60 + minutos
    }

    return getMinutos(a.horario) - getMinutos(b.horario)
  })

  return (
    <div className='clases-container'>
      <Header />

      <div className='clases-header'>
        <h1>Reserva tu Clase</h1>
        <p className='clases-subtitle'>
          Selecciona el día y la hora que prefieras
        </p>
      </div>

      {inscripcionExitosa && (
        <div className='mensaje-exito'>
          <span>✓</span> {inscripcionExitosa}
        </div>
      )}

      {cancelacionExitosa && (
        <div className='mensaje-info'>
          <span>ℹ️</span> {cancelacionExitosa}
        </div>
      )}

      <div className='calendario-dias'>
        {diasSemana.map((dia) => (
          <button
            key={dia}
            className={`dia-btn ${diaSeleccionado === dia ? 'activo' : ''}`}
            onClick={() => setDiaSeleccionado(dia)}
          >
            <span className='dia-nombre'>
              {dia.charAt(0).toUpperCase() + dia.slice(1, 3)}
            </span>
          </button>
        ))}
      </div>

      {loading && !claseSeleccionada && (
        <div className='loading-container'>
          <div className='loading-spinner'></div>
          <p>Cargando clases...</p>
        </div>
      )}

      {error ? (
        <div className='error-message'>
          <span>⚠️</span> {error}
        </div>
      ) : (
        <div className='clases-por-dia'>
          <h2 className='dia-seleccionado'>
            {diaSeleccionado.charAt(0).toUpperCase() + diaSeleccionado.slice(1)}
          </h2>

          {clasesOrdenadas.length > 0 ? (
            <div className='timeline-clases'>
              {clasesOrdenadas.map((clase) => (
                <div key={clase._id} className='clase-timeline-item'>
                  <div className='clase-hora'>{clase.horario}</div>

                  <div className='clase-card'>
                    <div className='clase-info'>
                      <h3 className='clase-nombre'>{clase.nombre}</h3>
                      <div className='clase-detalles'>
                        <span className={getNivelBadgeClass(clase.nivel)}>
                          {clase.nivel.charAt(0).toUpperCase() +
                            clase.nivel.slice(1)}
                        </span>
                        <span className='clase-duracion'>
                          {clase.duracion} min
                        </span>
                      </div>
                    </div>

                    <div className='clase-ocupacion'>
                      <div className='ocupacion-header'>
                        <span className='ocupacion-label'>Ocupación:</span>
                        <span className='ocupacion-contador'>
                          {clase.inscritos.length}/{clase.capacidadMaxima}
                        </span>
                      </div>

                      <div className='huecos-container'>
                        <div className='huecos'>
                          {Array.from({ length: clase.capacidadMaxima }).map(
                            (_, index) => {
                              const inscrito =
                                index < clase.inscritos.length
                                  ? clase.inscritos[index]
                                  : null
                              const isCurrentUser =
                                inscrito &&
                                estaInscrito({ inscritos: [inscrito] })

                              return (
                                <div
                                  key={index}
                                  className={`hueco ${
                                    inscrito ? 'ocupado' : ''
                                  } ${isCurrentUser ? 'usuario-actual' : ''}`}
                                >
                                  {inscrito ? (
                                    <div className='avatar-container'>
                                      <img
                                        src={
                                          imagenesFallidas[
                                            typeof inscrito === 'string'
                                              ? inscrito
                                              : inscrito._id
                                          ]
                                            ? '/default-avatar.png'
                                            : getImageUrl(inscrito)
                                        }
                                        alt='Usuario inscrito'
                                        onError={() =>
                                          handleImageError(
                                            typeof inscrito === 'string'
                                              ? inscrito
                                              : inscrito._id
                                          )
                                        }
                                      />
                                      {isCurrentUser && (
                                        <div className='usuario-indicador'>
                                          Tú
                                        </div>
                                      )}
                                    </div>
                                  ) : (
                                    <div className='hueco-vacio'></div>
                                  )}
                                </div>
                              )
                            }
                          )}
                        </div>
                      </div>
                    </div>

                    <div className='clase-actions'>
                      {estaInscrito(clase) ? (
                        <button
                          className={`btn-cancelar ${
                            claseSeleccionada === clase._id ? 'loading' : ''
                          }`}
                          onClick={() => handleCancelar(clase._id)}
                          disabled={loading || claseSeleccionada === clase._id}
                        >
                          {claseSeleccionada === clase._id ? (
                            <>
                              <span className='btn-spinner'></span>
                              Cancelando...
                            </>
                          ) : (
                            'Cancelar reserva'
                          )}
                        </button>
                      ) : clase.inscritos.length >= clase.capacidadMaxima ? (
                        <button className='btn-completo' disabled>
                          Clase completa
                        </button>
                      ) : (
                        <button
                          className={`btn-inscribir ${
                            claseSeleccionada === clase._id ? 'loading' : ''
                          }`}
                          onClick={() => handleInscribir(clase._id)}
                          disabled={loading || claseSeleccionada === clase._id}
                        >
                          {claseSeleccionada === clase._id ? (
                            <>
                              <span className='btn-spinner'></span>
                              Reservando...
                            </>
                          ) : (
                            'Reservar plaza'
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='no-clases'>
              <p>No hay clases disponibles para {diaSeleccionado}.</p>
              <p>Por favor, selecciona otro día o vuelve más tarde.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function getNivelBadgeClass(nivel) {
  switch (nivel) {
    case 'principiante':
      return 'nivel-badge principiante'
    case 'intermedio':
      return 'nivel-badge intermedio'
    case 'avanzado':
      return 'nivel-badge avanzado'
    default:
      return 'nivel-badge'
  }
}

export default Clases
