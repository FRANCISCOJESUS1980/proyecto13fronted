import React, { useMemo } from 'react'
import AdminCard from './AdminCard'

const AdminSections = React.memo(() => {
  const sectionData = useMemo(
    () => [
      {
        title: 'Crear Clases',
        description: 'Agrega nuevas clases para los usuarios.',
        path: '/administracion/clases',
        icon: 'calendar',
        color: 'blue'
      },
      {
        title: 'Crear Productos',
        description: 'Agrega nuevos productos a la tienda.',
        path: '/administracion/productos',
        icon: 'shopping',
        color: 'green'
      },
      {
        title: 'Ver Usuarios',
        description: 'Lista de todos los usuarios registrados.',
        path: '/administracion/usuarios',
        icon: 'users',
        color: 'purple'
      },
      {
        title: 'Información Médica',
        description:
          'Revisa y gestiona los datos médicos de todos los usuarios.',
        path: '/admin/medical-info',
        icon: 'heart',
        color: 'pink'
      },
      {
        title: 'Consentimientos',
        description:
          'Revisa los consentimientos y autorizaciones de imagen de los usuarios.',
        path: '/administracion/consentimientos',
        icon: 'document',
        color: 'amber'
      },
      {
        title: 'Facturación',
        description:
          'Gestiona los pagos, genera informes y analiza los ingresos por período.',
        path: '/administracion/facturacion',
        icon: 'invoice',
        color: 'teal'
      }
    ],
    []
  )

  return (
    <div className='cf-admin-sections'>
      {sectionData.map((section, index) => (
        <AdminCard key={section.title} section={section} index={index} />
      ))}
    </div>
  )
})

AdminSections.displayName = 'AdminSections'

export default AdminSections
