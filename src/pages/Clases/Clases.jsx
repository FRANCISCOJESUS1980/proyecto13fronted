import { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import './Clases.css'

const Clases = () => {
  const [clases, setClases] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchClases = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/classes')
        const data = await response.json()

        console.log('Respuesta del servidor:', data)

        if (data && Array.isArray(data.data)) {
          setClases(data.data)
        } else {
          throw new Error('La respuesta del servidor no es válida')
        }
      } catch (err) {
        console.error('Error en fetchClases:', err)
        setError('No se pudieron cargar las clases')
      }
    }

    fetchClases()
  }, [])

  return (
    <div className='clases-container'>
      <Header />
      <h2>Nuestras Clases</h2>
      {error ? (
        <p className='error-message'>{error}</p>
      ) : (
        <div className='clases-grid'>
          {clases.length > 0 ? (
            clases.map((clase) => (
              <div key={clase._id} className='clase-card'>
                <h3>{clase.nombre}</h3>
                <p>
                  <strong>Descripción:</strong> {clase.descripcion}
                </p>
                <p>
                  <strong>Horario:</strong> {clase.horario}
                </p>
                <p>
                  <strong>Duración:</strong> {clase.duracion} min
                </p>
                <p>
                  <strong>Monitor:</strong> {clase.monitor.nombre}
                </p>
                <p>
                  <strong>Capacidad:</strong> {clase.capacidadMaxima} personas
                </p>
                <p>
                  <strong>Ubicación:</strong> {clase.ubicacion}
                </p>
                <p>
                  <strong>Días:</strong> {clase.diasSemana.join(', ')}
                </p>
                <p>
                  <strong>Estado:</strong> {clase.estado}
                </p>
              </div>
            ))
          ) : (
            <p>No hay clases disponibles.</p>
          )}
        </div>
      )}
    </div>
  )
}

export default Clases
