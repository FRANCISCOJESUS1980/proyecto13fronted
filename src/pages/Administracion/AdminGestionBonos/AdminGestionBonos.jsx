import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Pause, Play, Plus, Clock, Calendar } from 'lucide-react'
import Header from '../../../components/Header/Header'
import Button from '../../../components/Button/Button'
import { obtenerUsuarioPorId } from '../../../services/Api/usuarios'
import {
  obtenerBonoUsuario,
  crearBono,
  pausarBono,
  reactivarBono,
  añadirSesiones,
  obtenerHistorialBonos
} from '../../../services/Api/bonos'
import './AdminGestionBonos.css'

const handleVolver = () => {
  navigate('/administracion/usuarios')
}
const GestionBonos = () => {
  const { userId } = useParams()
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState(null)
  const [bonoActivo, setBonoActivo] = useState(null)
  const [historialBonos, setHistorialBonos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showNuevoBonoModal, setShowNuevoBonoModal] = useState(false)
  const [showPausarBonoModal, setShowPausarBonoModal] = useState(false)
  const [showAñadirSesionesModal, setShowAñadirSesionesModal] = useState(false)

  const [nuevoBonoForm, setNuevoBonoForm] = useState({
    tipo: '8 Sesiones',
    sesionesTotal: 8,
    precio: 40,
    duracionMeses: 1
  })

  const [pausarBonoForm, setPausarBonoForm] = useState({
    motivo: ''
  })

  const [sesionesForm, setSesionesForm] = useState({
    sesionesAdicionales: 1
  })

  useEffect(() => {
    const cargarDatos = async () => {
      setLoading(true)
      try {
        const token = localStorage.getItem('token')
        if (!token) throw new Error('No hay token de autenticación')

        const usuarioData = await obtenerUsuarioPorId(userId, token)
        setUsuario(usuarioData)

        try {
          const bonoData = await obtenerBonoUsuario(token, userId)
          setBonoActivo(bonoData.data)
        } catch (err) {
          console.log('El usuario no tiene bono activo')
        }

        try {
          const historialData = await obtenerHistorialBonos(token, userId)
          setHistorialBonos(historialData.data)
        } catch (err) {
          console.error('Error al cargar historial de bonos:', err)
        }

        setError(null)
      } catch (err) {
        console.error('Error al cargar datos:', err)
        setError(err.message || 'Error al cargar los datos')
      } finally {
        setLoading(false)
      }
    }

    cargarDatos()
  }, [userId])

  const handleNuevoBonoChange = (e) => {
    const { name, value } = e.target
    setNuevoBonoForm({
      ...nuevoBonoForm,
      [name]:
        name === 'duracionMeses' ||
        name === 'sesionesTotal' ||
        name === 'precio'
          ? parseInt(value)
          : value
    })

    if (name === 'tipo') {
      const tiposBono = {
        '8 Sesiones': { sesiones: 8, precio: 40 },
        '10 Sesiones': { sesiones: 10, precio: 45 },
        '12 Sesiones': { sesiones: 12, precio: 50 },
        '16 Sesiones': { sesiones: 16, precio: 55 },
        '20 Sesiones': { sesiones: 20, precio: 60 },
        Ilimitado: { sesiones: 999, precio: 65 },
        'Bono 5 sesiones': { sesiones: 5, precio: 40 },
        'Curso de iniciación + 2 meses': { sesiones: 16, precio: 80 },
        'Drop in': { sesiones: 1, precio: 10 }
      }

      if (tiposBono[value]) {
        setNuevoBonoForm({
          ...nuevoBonoForm,
          tipo: value,
          sesionesTotal: tiposBono[value].sesiones,
          precio: tiposBono[value].precio,
          duracionMeses:
            value === 'Bono 5 sesiones'
              ? 2
              : value === 'Curso de iniciación + 2 meses'
              ? 2
              : 1
        })
      }
    }
  }

  const handleCrearBono = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const token = localStorage.getItem('token')
      if (!token) throw new Error('No hay token de autenticación')

      const response = await crearBono(token, {
        userId,
        ...nuevoBonoForm
      })

      setBonoActivo(response.data)

      const historialData = await obtenerHistorialBonos(token, userId)
      setHistorialBonos(historialData.data)

      setShowNuevoBonoModal(false)
      setError(null)
    } catch (err) {
      console.error('Error al crear bono:', err)
      setError(err.message || 'Error al crear el bono')
    } finally {
      setLoading(false)
    }
  }

  const handlePausarBono = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const token = localStorage.getItem('token')
      if (!token) throw new Error('No hay token de autenticación')

      await pausarBono(token, bonoActivo._id, pausarBonoForm)

      const bonoData = await obtenerBonoUsuario(token, userId)
      setBonoActivo(bonoData.data)

      setShowPausarBonoModal(false)
      setPausarBonoForm({ motivo: '' })
      setError(null)
    } catch (err) {
      console.error('Error al pausar bono:', err)
      setError(err.message || 'Error al pausar el bono')
    } finally {
      setLoading(false)
    }
  }

  const handleReactivarBono = async () => {
    setLoading(true)

    try {
      const token = localStorage.getItem('token')
      if (!token) throw new Error('No hay token de autenticación')

      await reactivarBono(token, bonoActivo._id, { diasExtension: 0 })

      const bonoData = await obtenerBonoUsuario(token, userId)
      setBonoActivo(bonoData.data)

      setError(null)
    } catch (err) {
      console.error('Error al reactivar bono:', err)
      setError(err.message || 'Error al reactivar el bono')
    } finally {
      setLoading(false)
    }
  }
  const handleAñadirSesiones = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const token = localStorage.getItem('token')
      if (!token) throw new Error('No hay token de autenticación')

      console.log(
        'Añadiendo sesiones al bono:',
        bonoActivo._id,
        'Sesiones:',
        sesionesForm.sesionesAdicionales
      )

      await añadirSesiones(token, bonoActivo._id, sesionesForm)

      const bonoData = await obtenerBonoUsuario(token, userId)
      setBonoActivo(bonoData.data)

      setShowAñadirSesionesModal(false)
      setSesionesForm({ sesionesAdicionales: 1 })
      setError(null)
    } catch (err) {
      console.error('Error al añadir sesiones:', err)
      setError(err.message || 'Error al añadir sesiones')
    } finally {
      setLoading(false)
    }
  }

  const formatFecha = (fechaStr) => {
    const fecha = new Date(fechaStr)
    return fecha.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  if (loading && !usuario) {
    return (
      <div className='cf-gestion-bonos-container'>
        <Header />
        <div className='cf-gestion-bonos-content'>
          <div className='cf-gestion-bonos-loading'>
            <div className='cf-gestion-bonos-spinner'></div>
            <p className='cf-gestion-bonos-loading-text'>
              Cargando información...
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (error && !usuario) {
    return (
      <div className='cf-gestion-bonos-container'>
        <Header />
        <div className='cf-gestion-bonos-content'>
          <div className='cf-gestion-bonos-error'>
            <div className='cf-gestion-bonos-error-icon'></div>
            <p>Error: {error}</p>
          </div>
          <Button
            variant='secondary'
            onClick={() => navigate('/administracion/usuarios')}
            leftIcon={<ArrowLeft size={18} />}
          >
            Volver a Usuarios
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className='cf-gestion-bonos-container'>
      <Header />
      <div className='cf-gestion-bonos-content'>
        <div className='cf-gestion-bonos-header'>
          <Button
            variant='secondary'
            onClick={() => navigate('/administracion/usuarios')}
            leftIcon={<ArrowLeft size={18} />}
          >
            Volver a AdminUsuarios
          </Button>

          <div className='cf-gestion-bonos-title-container'>
            <h1 className='cf-gestion-bonos-title'>
              Gestión de Bonos - {usuario?.nombre}
            </h1>
          </div>

          <Button
            variant='primary'
            onClick={() => setShowNuevoBonoModal(true)}
            leftIcon={<Plus size={18} />}
          >
            Nuevo Bono
          </Button>
        </div>

        {error && (
          <div className='cf-gestion-bonos-alert error'>
            <div className='cf-gestion-bonos-alert-icon'></div>
            <p>{error}</p>
          </div>
        )}

        <div className='cf-gestion-bonos-section'>
          <h2 className='cf-gestion-bonos-section-title'>Bono Activo</h2>

          {bonoActivo ? (
            <div className='cf-gestion-bonos-card'>
              <div className='cf-gestion-bonos-card-header'>
                <h3 className='cf-gestion-bonos-card-title'>
                  {bonoActivo.tipo}
                </h3>
                <span
                  className={`cf-gestion-bonos-badge ${
                    bonoActivo.estado === 'activo' ? 'activo' : 'pausado'
                  }`}
                >
                  {bonoActivo.estado === 'activo' ? 'Activo' : 'Pausado'}
                </span>
              </div>

              <div className='cf-gestion-bonos-card-content'>
                <div className='cf-gestion-bonos-info-row'>
                  <div className='cf-gestion-bonos-info-item'>
                    <Clock size={16} />
                    <span>Sesiones: </span>
                    <strong>
                      {bonoActivo.tipo === 'Ilimitado'
                        ? 'Ilimitadas'
                        : `${bonoActivo.sesionesRestantes}/${bonoActivo.sesionesTotal}`}
                    </strong>
                  </div>

                  <div className='cf-gestion-bonos-info-item'>
                    <Calendar size={16} />
                    <span>Validez: </span>
                    <strong>
                      {formatFecha(bonoActivo.fechaInicio)} -{' '}
                      {formatFecha(bonoActivo.fechaFin)}
                    </strong>
                  </div>
                </div>

                {bonoActivo.estado === 'pausado' && (
                  <div className='cf-gestion-bonos-pausa-info'>
                    <p>
                      <strong>Motivo de pausa:</strong> {bonoActivo.motivoPausa}
                    </p>
                    <p>
                      <strong>Fecha de pausa:</strong>{' '}
                      {formatFecha(bonoActivo.fechaPausa)}
                    </p>
                  </div>
                )}
              </div>

              <div className='cf-gestion-bonos-card-actions'>
                {bonoActivo.estado === 'activo' ? (
                  <>
                    <Button
                      variant='secondary'
                      onClick={() => setShowPausarBonoModal(true)}
                      leftIcon={<Pause size={16} />}
                    >
                      Pausar Bono
                    </Button>

                    {bonoActivo.tipo !== 'Ilimitado' && (
                      <Button
                        variant='secondary'
                        onClick={() => setShowAñadirSesionesModal(true)}
                        leftIcon={<Plus size={16} />}
                      >
                        Añadir Sesiones
                      </Button>
                    )}
                  </>
                ) : (
                  <Button
                    variant='primary'
                    onClick={handleReactivarBono}
                    leftIcon={<Play size={16} />}
                    disabled={loading}
                  >
                    {loading ? 'Reactivando...' : 'Reactivar Bono'}
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className='cf-gestion-bonos-empty'>
              <p>El usuario no tiene ningún bono activo.</p>
              <Button
                variant='primary'
                onClick={() => setShowNuevoBonoModal(true)}
                leftIcon={<Plus size={18} />}
              >
                Asignar Bono
              </Button>
            </div>
          )}
        </div>

        {historialBonos.length > 0 && (
          <div className='cf-gestion-bonos-section'>
            <h2 className='cf-gestion-bonos-section-title'>
              Historial de Bonos
            </h2>

            <div className='cf-gestion-bonos-historial'>
              <table className='cf-gestion-bonos-table'>
                <thead>
                  <tr>
                    <th>Tipo</th>
                    <th>Sesiones</th>
                    <th>Fecha Inicio</th>
                    <th>Fecha Fin</th>
                    <th>Estado</th>
                    <th>Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {historialBonos.map((bono) => (
                    <tr key={bono._id}>
                      <td>{bono.tipo}</td>
                      <td>
                        {bono.tipo === 'Ilimitado'
                          ? 'Ilimitadas'
                          : `${bono.sesionesRestantes}/${bono.sesionesTotal}`}
                      </td>
                      <td>{formatFecha(bono.fechaInicio)}</td>
                      <td>{formatFecha(bono.fechaFin)}</td>
                      <td>
                        <span
                          className={`cf-gestion-bonos-badge ${bono.estado}`}
                        >
                          {bono.estado.charAt(0).toUpperCase() +
                            bono.estado.slice(1)}
                        </span>
                      </td>
                      <td>{bono.precio}€</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {showNuevoBonoModal && (
          <div className='cf-gestion-bonos-modal-overlay'>
            <div className='cf-gestion-bonos-modal'>
              <div className='cf-gestion-bonos-modal-header'>
                <h2>Asignar Nuevo Bono</h2>
                <button
                  className='cf-gestion-bonos-modal-close'
                  onClick={() => setShowNuevoBonoModal(false)}
                >
                  &times;
                </button>
              </div>

              <form onSubmit={handleCrearBono}>
                <div className='cf-gestion-bonos-form-group'>
                  <label htmlFor='tipo'>Tipo de Bono</label>
                  <select
                    id='tipo'
                    name='tipo'
                    value={nuevoBonoForm.tipo}
                    onChange={handleNuevoBonoChange}
                    required
                  >
                    <option value='8 Sesiones'>8 Sesiones (40€)</option>
                    <option value='10 Sesiones'>10 Sesiones (45€)</option>
                    <option value='12 Sesiones'>12 Sesiones (50€)</option>
                    <option value='16 Sesiones'>16 Sesiones (55€)</option>
                    <option value='20 Sesiones'>20 Sesiones (60€)</option>
                    <option value='Ilimitado'>Ilimitado (65€)</option>
                    <option value='Bono 5 sesiones'>
                      Bono 5 sesiones (40€)
                    </option>
                    <option value='Curso de iniciación + 2 meses'>
                      Curso de iniciación + 2 meses (80€)
                    </option>
                    <option value='Drop in'>Drop in (10€)</option>
                  </select>
                </div>

                <div className='cf-gestion-bonos-form-group'>
                  <label htmlFor='sesionesTotal'>Número de Sesiones</label>
                  <input
                    type='number'
                    id='sesionesTotal'
                    name='sesionesTotal'
                    value={nuevoBonoForm.sesionesTotal}
                    onChange={handleNuevoBonoChange}
                    min='1'
                    required
                  />
                </div>

                <div className='cf-gestion-bonos-form-group'>
                  <label htmlFor='precio'>Precio (€)</label>
                  <input
                    type='number'
                    id='precio'
                    name='precio'
                    value={nuevoBonoForm.precio}
                    onChange={handleNuevoBonoChange}
                    min='0'
                    required
                  />
                </div>

                <div className='cf-gestion-bonos-form-group'>
                  <label htmlFor='duracionMeses'>Duración (meses)</label>
                  <input
                    type='number'
                    id='duracionMeses'
                    name='duracionMeses'
                    value={nuevoBonoForm.duracionMeses}
                    onChange={handleNuevoBonoChange}
                    min='1'
                    required
                  />
                </div>

                <div className='cf-gestion-bonos-form-actions'>
                  <Button
                    type='button'
                    variant='secondary'
                    onClick={() => setShowNuevoBonoModal(false)}
                  >
                    Cancelar
                  </Button>
                  <Button type='submit' variant='primary' disabled={loading}>
                    {loading ? 'Creando...' : 'Crear Bono'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showPausarBonoModal && (
          <div className='cf-gestion-bonos-modal-overlay'>
            <div className='cf-gestion-bonos-modal'>
              <div className='cf-gestion-bonos-modal-header'>
                <h2>Pausar Bono</h2>
                <button
                  className='cf-gestion-bonos-modal-close'
                  onClick={() => setShowPausarBonoModal(false)}
                >
                  &times;
                </button>
              </div>

              <form onSubmit={handlePausarBono}>
                <div className='cf-gestion-bonos-form-group'>
                  <label htmlFor='motivo'>Motivo de la Pausa</label>
                  <textarea
                    id='motivo'
                    name='motivo'
                    value={pausarBonoForm.motivo}
                    onChange={(e) =>
                      setPausarBonoForm({ motivo: e.target.value })
                    }
                    required
                    rows='4'
                    placeholder='Ej: Lesión, vacaciones, enfermedad...'
                  ></textarea>
                </div>

                <div className='cf-gestion-bonos-form-actions'>
                  <Button
                    type='button'
                    variant='secondary'
                    onClick={() => setShowPausarBonoModal(false)}
                  >
                    Cancelar
                  </Button>
                  <Button type='submit' variant='primary' disabled={loading}>
                    {loading ? 'Pausando...' : 'Pausar Bono'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showAñadirSesionesModal && (
          <div className='cf-gestion-bonos-modal-overlay'>
            <div className='cf-gestion-bonos-modal'>
              <div className='cf-gestion-bonos-modal-header'>
                <h2>Añadir Sesiones</h2>
                <button
                  className='cf-gestion-bonos-modal-close'
                  onClick={() => setShowAñadirSesionesModal(false)}
                >
                  &times;
                </button>
              </div>

              <form onSubmit={handleAñadirSesiones}>
                <div className='cf-gestion-bonos-form-group'>
                  <label htmlFor='sesionesAdicionales'>
                    Número de Sesiones
                  </label>
                  <input
                    type='number'
                    id='sesionesAdicionales'
                    name='sesionesAdicionales'
                    value={sesionesForm.sesionesAdicionales}
                    onChange={(e) =>
                      setSesionesForm({
                        sesionesAdicionales: parseInt(e.target.value)
                      })
                    }
                    min='1'
                    required
                  />
                </div>

                <div className='cf-gestion-bonos-form-actions'>
                  <Button
                    type='button'
                    variant='secondary'
                    onClick={() => setShowAñadirSesionesModal(false)}
                  >
                    Cancelar
                  </Button>
                  <Button type='submit' variant='primary' disabled={loading}>
                    {loading ? 'Añadiendo...' : 'Añadir Sesiones'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default GestionBonos
