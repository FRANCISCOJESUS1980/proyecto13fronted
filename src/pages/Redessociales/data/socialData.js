import { Users, Calendar, Camera, Dumbbell, Trophy, Heart } from 'lucide-react'

export const socialStats = [
  {
    icon: Users,
    value: '2.5K+',
    label: 'Seguidores'
  },
  {
    icon: Calendar,
    value: '15+',
    label: 'Eventos/mes'
  },
  {
    icon: Camera,
    value: '500+',
    label: 'Fotos'
  }
]

export const socialFeeds = {
  instagram: [
    {
      id: 1,
      image: 'imagenes/alterofilia1.JPG',
      caption:
        '¡Nuevo récord personal en Clean & Jerk! 💪 #CrossFit #Superación',
      likes: 124,
      comments: 18,
      date: '2h'
    },
    {
      id: 2,
      image: 'imagenes/alterofilia2.JPG',
      caption:
        'WOD de hoy: "Murph" - ¡Todos dieron el máximo! 🔥 #TeamAder #NoExcuses',
      likes: 98,
      comments: 12,
      date: '1d'
    },
    {
      id: 3,
      image: 'imagenes/alterofilia3.JPG',
      caption:
        '¡Nuevos equipos en el box! Ven a probarlos 🏋️‍♂️ #AderCrossFit #NuevoEquipo',
      likes: 156,
      comments: 24,
      date: '2d'
    }
  ],
  facebook: [
    {
      id: 1,
      image: 'imagenes/box.jpg',
      caption:
        '¡Inscripciones abiertas para la competición de verano! Reserva tu plaza ahora 🏆 #AderCompetition',
      likes: 87,
      comments: 32,
      shares: 15,
      date: '5h'
    },
    {
      id: 2,
      image: 'imagenes/boxfrente.jpg',
      caption:
        'Taller de nutrición este sábado con nuestra nutricionista deportiva. ¡No te lo pierdas! 🥗 #FuelYourWorkout',
      likes: 65,
      comments: 8,
      shares: 11,
      date: '1d'
    }
  ]
}

export const socialFeatures = [
  {
    icon: Dumbbell,
    title: 'WODs Diarios',
    description:
      'Hacemos los WODS personalmente a Diario para que siempre esteis avanzando y mejorando vuestro rendimento.'
  },
  {
    icon: Calendar,
    title: 'Eventos Exclusivos',
    description:
      'Sé el primero en enterarte de competiciones, talleres y eventos especiales.'
  },
  {
    icon: Trophy,
    title: 'Logros de Atletas',
    description:
      'Celebramos los PRs y logros de nuestra comunidad. ¡El próximo podrías ser tú!'
  },
  {
    icon: Heart,
    title: 'Comunidad Unida',
    description:
      'Forma parte de una familia que comparte la pasión por el fitness y el CrossFit.'
  }
]
