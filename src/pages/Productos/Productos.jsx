import { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import './Productos.css'

const Productos = () => {
  /* const [clases, setClases] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/api/classes')
      .then((res) => res.json())
      .then((data) => setClases(data))
      .catch((error) => console.error('Error:', error))
  }, [])

  return (
    <div className='clases-container'>
      <Header />
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
  )*/
  return (
    <div className='productos-container'>
      <Header />
    </div>
  )
}

export default Productos
