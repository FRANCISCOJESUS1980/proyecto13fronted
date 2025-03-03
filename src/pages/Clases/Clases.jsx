import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import {
  format,
  isToday,
  eachDayOfInterval,
  parseISO,
  addWeeks,
  subWeeks
} from 'date-fns'
import { es } from 'date-fns/locale'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Header from '../../components/Header/Header'
import './Clases.css'

axios.defaults.withCredentials = true

const getImageUrl = (user) => {
  if (!user) return '/default-avatar.png'

  if (typeof user === 'string') {
    return '/default-avatar.png'
  }

  if (user.avatar && user.avatar !== 'default-avatar.jpg') {
    if (
      user.avatar.includes('cloudinary.com') ||
      user.avatar.startsWith('http')
    ) {
      return user.avatar
    }

    return `http://localhost:5000/uploads/${user.avatar}`
  }

  return '/default-avatar.png'
}

const MonitorInfo = ({ monitor }) => {
  if (!monitor) return null

  const avatarUrl = getImageUrl(monitor)

  return (
    <div className='monitor-info'>
      <div className='monitor-avatar'>
        <img
          src={avatarUrl || '/placeholder.svg'}
          alt={monitor.nombre}
          onError={(e) => {
            if (e.target.src !== '/default-avatar.png') {
              e.target.src = '/default-avatar.png'
            }
          }}
        />
      </div>
      <div className='monitor-details'>
        <span className='monitor-label'>Monitor:</span>
        <span className='monitor-name'>{monitor.nombre}</span>
      </div>
    </div>
  )
}

const Clases = () => {
  const [clases, setClases] = useState([])
  const [error, setError] = useState(null)
  const [userId, setUserId] = useState('')
  const [userInfo, setUserInfo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [inscripcionExitosa, setInscripcionExitosa] = useState(null)
  const [claseSeleccionada, setClaseSeleccionada] = useState(null)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [visibleDates, setVisibleDates] = useState([])
  const [cancelacionExitosa, setCancelacionExitosa] = useState(null)
  const calendarRef = useRef(null)

  useEffect(() => {
    const img = new Image()
    img.src = '/default-avatar.png'
  }, [])

  useEffect(() => {
    const start = subWeeks(selectedDate, 4)
    const end = addWeeks(selectedDate, 4)
    const dates = eachDayOfInterval({ start, end })
    setVisibleDates(dates)

    if (calendarRef.current) {
      const dayWidth = 100
      const selectedIndex = dates.findIndex(
        (date) =>
          format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
      )
      const scrollPosition =
        selectedIndex * dayWidth -
        calendarRef.current.offsetWidth / 2 +
        dayWidth / 2
      calendarRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      })
    }
  }, [selectedDate])

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
              return response.data.data
            }
            return clase
          })
        )

        setInscripcionExitosa(`¡Te has inscrito correctamente a la clase!`)
        setTimeout(() => setInscripcionExitosa(null), 3000)
      }
    } catch (err) {
      console.error('Error al inscribirse:', err)
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
          prevClases.map((clase) => {
            if (clase._id === claseId) {
              return response.data.data
            }
            return clase
          })
        )

        setCancelacionExitosa(`Has cancelado tu inscripción correctamente`)
        setTimeout(() => setCancelacionExitosa(null), 3000)
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
      return inscrito._id.toString() === userId.toString()
    })
  }

  const getClasesPorDia = () => {
    const diaSeleccionado = format(selectedDate, 'EEEE', {
      locale: es
    }).toLowerCase()

    const fechaSeleccionadaStr = format(selectedDate, 'yyyy-MM-dd')

    return clases.filter((clase) => {
      if (clase.esFechaEspecifica && clase.fecha) {
        try {
          const fechaClase = format(parseISO(clase.fecha), 'yyyy-MM-dd')
          return fechaClase === fechaSeleccionadaStr
        } catch (error) {
          console.error('Error al comparar fechas:', error)
          return false
        }
      }

      return !clase.esFechaEspecifica && clase.diaSemana === diaSeleccionado
    })
  }

  const clasesOrdenadas = getClasesPorDia().sort((a, b) => {
    const getMinutos = (horario) => {
      const [horas, minutos] = horario.split(':').map(Number)
      return horas * 60 + minutos
    }

    return getMinutos(a.horario) - getMinutos(b.horario)
  })

  const handlePrevWeek = () => {
    setSelectedDate(subWeeks(selectedDate, 1))
  }

  const handleNextWeek = () => {
    setSelectedDate(addWeeks(selectedDate, 1))
  }

  const CalendarioDias = () => (
    <div className='calendario-container'>
      <button className='scroll-button left' onClick={handlePrevWeek}>
        <ChevronLeft size={20} />
      </button>

      <div className='calendario-dias' ref={calendarRef}>
        {visibleDates.map((date) => {
          const dayName = format(date, 'EEEE', { locale: es })
          const dayNumber = format(date, 'd')
          const month = format(date, 'MMM', { locale: es })
          const isSelected =
            format(selectedDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
          const isPast = date < new Date(new Date().setHours(0, 0, 0, 0))

          return (
            <button
              key={date.toString()}
              className={`dia-btn ${isSelected ? 'activo' : ''} ${
                isToday(date) ? 'hoy' : ''
              } ${isPast ? 'pasado' : ''}`}
              onClick={() => setSelectedDate(date)}
              disabled={isPast}
            >
              <span className='dia-nombre'>{dayName.slice(0, 3)}</span>
              <span className='dia-numero'>{dayNumber}</span>
              <span className='dia-mes'>{month}</span>
            </button>
          )
        })}
      </div>

      <button className='scroll-button right' onClick={handleNextWeek}>
        <ChevronRight size={20} />
      </button>
    </div>
  )

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

      <CalendarioDias />

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
            {format(selectedDate, "EEEE d 'de' MMMM", { locale: es })}
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
                        {clase.esFechaEspecifica && (
                          <span className='clase-unica'>Clase única</span>
                        )}
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
                                          getImageUrl(inscrito) ||
                                          '/placeholder.svg' ||
                                          '/placeholder.svg'
                                        }
                                        alt='Usuario inscrito'
                                        onError={(e) => {
                                          if (
                                            e.target.src !==
                                            '/default-avatar.png'
                                          ) {
                                            e.target.src = '/default-avatar.png'
                                          }
                                        }}
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

                    <MonitorInfo monitor={clase.entrenador} />

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
              <p>
                No hay clases disponibles para{' '}
                {format(selectedDate, "EEEE d 'de' MMMM", { locale: es })}.
              </p>
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
