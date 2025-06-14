import { useState, useEffect, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Header from '../../../../components/Header/page/Header'
import Button from '../../../../components/Button/Button'
import Loading from '../../../../components/Loading/loading'
import './AdminFacturacion.css'
import { obtenerBonos } from '../../../../services/Api/index'
import { FacturacionStats } from '../components/FacturacionStats'
import { FacturacionFilters } from '../components/FacturacionFilters'
import { FacturacionActions } from '../components/FacturacionActions'
import { FacturacionTable } from '../components/FacturacionTable'
import { ErrorMessage } from '../components/ErrorMessage'
import { AnimationBackground } from '../components/AnimationBackground'
import { calcularEstadisticas } from '../utils/estadisticas'
import { aplicarFiltros } from '../utils/filtros'

const AdminFacturacion = () => {
  const navigate = useNavigate()
  const [bonos, setBonos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filtroActivo, setFiltroActivo] = useState('todos')
  const [busqueda, setBusqueda] = useState('')
  const [fechaInicio, setFechaInicio] = useState('')
  const [fechaFin, setFechaFin] = useState('')
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState('este-mes')
  const [animationComplete, setAnimationComplete] = useState(false)
  const [estadisticas, setEstadisticas] = useState({})

  const bonosFiltrados = useMemo(() => {
    return aplicarFiltros({
      bonos,
      filtroActivo,
      busqueda,
      fechaInicio,
      fechaFin,
      periodoSeleccionado
    })
  }, [
    bonos,
    filtroActivo,
    busqueda,
    fechaInicio,
    fechaFin,
    periodoSeleccionado
  ])

  const estadisticasCalculadas = useMemo(() => {
    return calcularEstadisticas(bonosFiltrados)
  }, [bonosFiltrados])

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('rol')?.toLowerCase().trim()

    if (
      !token ||
      !(role === 'administrador' || role === 'admin' || role === 'creador')
    ) {
      console.error('Acceso denegado: no tienes permisos.')
      navigate('/')
      return
    }

    const cargarBonos = async () => {
      try {
        setLoading(true)
        const response = await obtenerBonos(token)

        console.log('Respuesta completa de bonos:', response)

        const bonosData = response.data || response
        console.log('Bonos extraídos:', bonosData)
        console.log('Número de bonos:', bonosData.length)

        bonosData.forEach((bono, index) => {
          console.log(`Bono ${index}:`, bono)
          console.log(`Usuario del bono ${index}:`, bono.usuario)
        })

        const bonosOrdenados = bonosData.sort(
          (a, b) =>
            new Date(b.createdAt || b.fechaInicio) -
            new Date(a.createdAt || a.fechaInicio)
        )

        setBonos(bonosOrdenados)
        setEstadisticas(calcularEstadisticas(bonosOrdenados))
      } catch (error) {
        console.error('Error al cargar bonos:', error)
        setError('No se pudieron cargar los datos de facturación')
      } finally {
        setLoading(false)
      }
    }

    cargarBonos()
  }, [navigate])

  const handlePeriodoChange = useCallback((e) => {
    const periodo = e.target.value
    setPeriodoSeleccionado(periodo)

    if (periodo !== 'personalizado') {
      setFechaInicio('')
      setFechaFin('')
    }
  }, [])

  if (loading) {
    return <Loading isVisible={loading} loadingText='CARGANDO FACTURACIÓN...' />
  }

  return (
    <div className='cf-admin-facturacion'>
      <Header />
      <AnimationBackground />

      <div className='cf-admin-facturacion-container'>
        <div className='cf-admin-facturacion-header'>
          <h1>Gestión de Facturación</h1>
          <Button
            variant='secondary'
            onClick={() => navigate('/administracion')}
            leftIcon={<ArrowLeft size={18} />}
            className='cf-secondary-button'
          >
            Volver a Administracion
          </Button>
        </div>

        {error ? (
          <ErrorMessage message={error} />
        ) : (
          <>
            <FacturacionStats estadisticas={estadisticasCalculadas} />

            <FacturacionFilters
              periodoSeleccionado={periodoSeleccionado}
              handlePeriodoChange={handlePeriodoChange}
              fechaInicio={fechaInicio}
              setFechaInicio={setFechaInicio}
              fechaFin={fechaFin}
              setFechaFin={setFechaFin}
              filtroActivo={filtroActivo}
              setFiltroActivo={setFiltroActivo}
              busqueda={busqueda}
              setBusqueda={setBusqueda}
            />

            <FacturacionActions
              bonosFiltrados={bonosFiltrados}
              estadisticas={estadisticasCalculadas}
            />

            <FacturacionTable bonosFiltrados={bonosFiltrados} />
          </>
        )}
      </div>
    </div>
  )
}

export default AdminFacturacion
