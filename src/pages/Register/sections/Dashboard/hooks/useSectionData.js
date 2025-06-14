import { useMemo } from 'react'
import { useDashboardOptimized } from './useDashboardOptimized'

export const useSectionData = () => {
  const { unreadMessages, userId } = useDashboardOptimized()

  const sectionData = useMemo(
    () => [
      {
        icon: 'class',
        title: 'Clases',
        description: 'Consulta horarios y reserva tus clases',
        path: '/clases',
        color: 'teal'
      },
      {
        icon: 'timer',
        title: 'TIMER',
        description: 'Timer profesional para WODs de CrossFit',
        path: '/dashboard/timer',
        color: 'red'
      },
      {
        icon: 'medical',
        title: 'Información Médica',
        description: 'Gestiona tu información médica y de salud',
        path: '/dashboard/medico',
        color: 'blue'
      },
      {
        icon: 'physical',
        title: 'Aspecto Físico',
        description: 'Registra tus medidas y progreso físico',
        path: '/dashboard/aspecto',
        color: 'green'
      },
      {
        icon: 'chat',
        title: 'Chat en Vivo',
        description: 'Conversa con otros miembros del box',
        path: '/dashboard/chat',
        color: 'purple'
      },
      {
        icon: 'message',
        title: 'Mensajes Privados',
        description: 'Comunicación directa con administración',
        path: '/dashboard/mensajes',
        badge: unreadMessages > 0 ? unreadMessages : null,
        color: 'pink'
      },
      {
        icon: 'record',
        title: 'Marcas Personales',
        description: 'Registra tus récords y logros',
        path: '/dashboard/marcas',
        color: 'amber'
      },
      {
        icon: 'profile',
        title: 'Editar Perfil',
        description: 'Modifica tu información personal',
        path: `/dashboard/editar-perfil/${userId}`,
        color: 'orange'
      },
      {
        icon: 'video',
        title: 'Videos',
        description: 'Accede a videos de entrenamiento y tutoriales',
        path: '/videos',
        color: 'red'
      },
      {
        icon: 'product',
        title: 'Productos',
        description: 'Explora nuestra tienda de productos',
        path: '/productos',
        color: 'indigo'
      }
    ],
    [unreadMessages, userId]
  )

  return { sectionData }
}
