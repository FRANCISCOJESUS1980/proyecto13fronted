import { useEffect, useState } from 'react'
import './Clases.css'

const Clases = () => {
  const [clases, setClases] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/api/classes')
      .then((res) => res.json())
      .then((data) => setClases(data))
      .catch((error) => console.error('Error:', error))
  }, [])

  return (
    <div className='clases-container'>
      <h2>Nuestras Clases</h2>
      <div className='clases-grid'>
        {clases.map((clase) => (
          <div key={clase.id} className='clase-card'>
            <h3>{clase.nombre}</h3>
            <p>Horario: {clase.horario}</p>
            <p>Instructor: {clase.instructor}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Clases
