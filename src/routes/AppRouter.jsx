import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Register from '../pages/Register/Registro/Register'
import Clases from '../pages/Clases/Clases'
import Entrenamientos from '../pages/Entrenamientos/Entrenamientos'
import Contacto from '../pages/Contactos/Contacto'
import UserDashboard from '../pages/Register/sections/Dashboard/UserDashboard'
import Medico from '../pages/Register/sections/Medico/Medico'
import Aspecto from '../pages/Register/sections/Aspecto/Aspecto'
import Marcas from '../pages/Register/sections/Marcas/Marcas'
import Iniciarsesion from '../pages/Iniciar Sesion/iniciarsesion'
import Productos from '../pages/Productos/Productos'
import Precios from '../pages/Precios/Precios'

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/registro' element={<Register />} />
        <Route path='/iniciar-sesion' element={<Iniciarsesion />} />
        <Route path='/clases' element={<Clases />} />
        <Route path='/productos' element={<Productos />} />
        <Route path='/contacto' element={<Contacto />} />
        <Route path='/precios' element={<Precios />} />
        <Route path='/entrenamientos' element={<Entrenamientos />} />

        <Route path='/dashboard' element={<UserDashboard />} />
        <Route path='/dashboard/medico' element={<Medico />} />
        <Route path='/dashboard/aspecto' element={<Aspecto />} />
        <Route path='/dashboard/marcas' element={<Marcas />} />
      </Routes>
    </Router>
  )
}

export default AppRouter
