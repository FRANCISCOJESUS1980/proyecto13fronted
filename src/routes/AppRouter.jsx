import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Register from '../pages/Register/Registro/page/Register'
import Clases from '../pages/Clases/page/Clases'
import RedesSociales from '../pages/Redessociales/page/Redessociales'
import Contacto from '../pages/Contactos/page/Contacto'
import UserDashboard from '../pages/Register/sections/Dashboard/page/UserDashboard'
import Medico from '../pages/Register/sections/Medico/page/Medico'
import Aspecto from '../pages/Register/sections/Aspecto/features/physical-stats/pages/Aspecto'
import Marcas from '../pages/Register/sections/Marcas/page/Marcas'
import Iniciarsesion from '../pages/Iniciar Sesion/page/iniciarsesion'
import Productos from '../pages/Productos/pages/productos/page/Productos'
import Carrito from '../pages/Productos/pages/Carrito/page/Carrito'
import Tarifas from '../pages/Tarifas/page/Tarifas'
import Administracion from '../pages/Administracion/Administracion/page/Administracion'
import AdminClases from '../pages/Administracion/AdminClases/page/AdminClases'
import AdminProductos from '../pages/Administracion/AdminProductos/page/AdminProductos'
import AdminUsuarios from '../pages/Administracion/AdminUsuarios/page/AdminUsuarios'
import AdminConsentimientos from '../pages/Administracion/AdminConsentimientos/page/AdminConsentimientos'
import Chat from '../pages/Register/sections/Chat/page/Chat'
import EditarPerfil from '../pages/EditUser/page/EditUser'
import MedicalInfoList from '../pages/Administracion/AdministracionMedico/page/MedicalinfoList'
import Videos from '../pages/Videos/page/Videos'
import AdminUsuarioClases from '../pages/Administracion/AdminUsuarios/AdminUsuarioClases/page/AdminUsuarioClases'
import AdminUsuarioMensajePrivado from '../pages/Administracion/AdminUsuarios/AdminUsuarioMensajePrivado/page/AdminUsuarioMensajePrivado'
import UserMensajes from '../pages/Register/sections/UsuarioMensajePrivado/page/UsuarioMensajePrivado'
import GestionBonos from '../pages/Administracion/AdminGestionBonos/page/AdminGestionBonos'
import Timer from '../pages/Register/sections/Timer/page/Timer'
import NotFound from '../pages/NotFound/NotFound'

import {
  PhysicalStatsProvider,
  PhysicalStatsPage
} from '../pages/Register/sections/Aspecto/features/physical-stats'
import { CartProvider } from '../pages/Productos/context/CartContext'
import { ConsentProvider } from '../context/ConssentContext'
import PendingTasksChecker from '../components/Pending Tasks/PendingTasksChecker'
import AdminMensajeMasivo from '../pages/Administracion/AdminMensajeMasivo/page/AdminMensajeMasivo'
import AdminFacturacion from '../pages/Administracion/AdminFacturacion/page/AdminFacturacion'

const AppRouter = () => {
  return (
    <Router>
      <CartProvider>
        <ConsentProvider>
          <PhysicalStatsProvider>
            <PendingTasksChecker>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/registro' element={<Register />} />
                <Route path='/iniciar-sesion' element={<Iniciarsesion />} />
                <Route path='/clases' element={<Clases />} />
                <Route path='/productos' element={<Productos />} />
                <Route path='/carrito' element={<Carrito />} />
                <Route path='/contacto' element={<Contacto />} />
                <Route path='/tarifas' element={<Tarifas />} />
                <Route path='/redessociales' element={<RedesSociales />} />
                <Route path='/administracion' element={<Administracion />} />
                <Route path='/videos' element={<Videos />} />

                <Route
                  path='/administracion/clases'
                  element={<AdminClases />}
                />
                <Route
                  path='/administracion/productos'
                  element={<AdminProductos />}
                />
                <Route
                  path='/administracion/usuarios'
                  element={<AdminUsuarios />}
                />
                <Route
                  path='/admin/medical-info'
                  element={<MedicalInfoList />}
                />
                <Route
                  path='/administracion/consentimientos'
                  element={<AdminConsentimientos />}
                />
                <Route
                  path='/admin/usuario/:userId/clases'
                  element={<AdminUsuarioClases />}
                />
                <Route
                  path='/admin/usuario/:userId/mensajes'
                  element={<AdminUsuarioMensajePrivado />}
                />
                <Route
                  path='/administracion/mensaje-masivo'
                  element={<AdminMensajeMasivo />}
                />
                <Route
                  path='/admin/usuario/:userId/bonos'
                  element={<GestionBonos />}
                />

                <Route
                  path='/administracion/facturacion'
                  element={<AdminFacturacion />}
                />

                <Route path='/dashboard' element={<UserDashboard />} />
                <Route path='/dashboard/medico' element={<Medico />} />
                <Route path='/dashboard/aspecto' element={<Aspecto />} />
                <Route path='/physical-stats' element={<PhysicalStatsPage />} />
                <Route path='/dashboard/marcas' element={<Marcas />} />
                <Route path='/dashboard/chat' element={<Chat />} />
                <Route path='/dashboard/mensajes' element={<UserMensajes />} />
                <Route path='/dashboard/timer' element={<Timer />} />
                <Route
                  path='/dashboard/editar-perfil/:id'
                  element={<EditarPerfil />}
                />

                <Route path='*' element={<NotFound />} />
              </Routes>
            </PendingTasksChecker>
          </PhysicalStatsProvider>
        </ConsentProvider>
      </CartProvider>
    </Router>
  )
}

export default AppRouter
