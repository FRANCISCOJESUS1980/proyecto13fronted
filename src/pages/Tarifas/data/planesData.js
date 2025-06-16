export const planes = [
  {
    nombre: '8 Sesiones',
    sesiones: 8,
    precio: 40,
    caracteristicas: [
      '8 sesiones mensuales',
      'Evaluación física inicial',
      'Acceso a la app de seguimiento',
      'Casillero durante la sesión'
    ],
    popular: false
  },
  {
    nombre: '10 Sesiones',
    sesiones: 10,
    precio: 45,
    caracteristicas: [
      '10 sesiones mensuales',
      'Evaluación física inicial',
      'Acceso a la app de seguimiento',
      'Casillero durante la sesión'
    ],
    popular: false
  },
  {
    nombre: '12 Sesiones',
    sesiones: 12,
    precio: 50,
    caracteristicas: [
      '12 sesiones mensuales',
      'Evaluación física inicial',
      'Acceso a la app de seguimiento',
      'Casillero personal',
      '1 sesión PT al mes'
    ],
    popular: true
  },
  {
    nombre: '16 Sesiones',
    sesiones: 16,
    precio: 55,
    caracteristicas: [
      '16 sesiones mensuales',
      'Evaluación física inicial',
      'Acceso a la app de seguimiento',
      'Casillero personal',
      '1 sesión PT al mes'
    ],
    popular: false
  },
  {
    nombre: '20 Sesiones',
    sesiones: 20,
    precio: 60,
    caracteristicas: [
      '20 sesiones mensuales',
      'Evaluación física mensual',
      'Acceso a la app premium',
      'Casillero personal',
      '2 sesiones PT al mes'
    ],
    popular: false
  },
  {
    nombre: 'Ilimitado',
    sesiones: 'Ilimitadas',
    descripcion: '(2 sesiones diarias)',
    precio: 65,
    caracteristicas: [
      'Hasta 2 sesiones diarias',
      'Evaluación física mensual',
      'Acceso a la app premium',
      'Casillero personal premium',
      '2 sesiones PT al mes',
      'Programación personalizada'
    ],
    popular: false
  }
]

export const bonosEspeciales = [
  {
    nombre: 'Curso de iniciación + 2 meses',
    descripcion: '2 meses a 8 sesiones',
    precio: 80,
    caracteristicas: [
      'Curso de iniciación completo',
      '2 meses con 8 sesiones mensuales',
      'Evaluación física inicial y final',
      'Acceso a la app de seguimiento'
    ]
  },
  {
    nombre: 'Bono 5 sesiones',
    descripcion: '(2 meses caducidad)',
    precio: 40,
    caracteristicas: [
      '5 sesiones para usar en 2 meses',
      'Ideal para visitantes ocasionales',
      'Acceso a todas las clases',
      'Sin compromiso mensual'
    ]
  }
]

export const dropIns = [
  {
    nombre: 'Drop in socios',
    descripcion: 'open box/clase',
    precio: 6
  },
  {
    nombre: 'Drop in no socios',
    descripcion: 'open box',
    precio: 6
  },
  {
    nombre: 'Drop in no socios',
    descripcion: 'clases',
    precio: 10
  }
]

export const beneficios = [
  {
    titulo: 'Entrenadores Certificados',
    descripcion:
      'Todos nuestros coaches tienen certificaciones oficiales de CrossFit'
  },
  {
    titulo: 'Comunidad Increíble',
    descripcion: 'Únete a una comunidad que te apoyará en cada paso del camino'
  },
  {
    titulo: 'Instalaciones Premium',
    descripcion:
      'Equipamiento de primera calidad y espacios amplios y ventilados'
  },
  {
    titulo: 'Resultados Garantizados',
    descripcion: 'Sistema probado de entrenamiento y seguimiento de progreso'
  }
]

export const faqData = [
  {
    pregunta: '¿Cómo funcionan los bonos de sesiones?',
    respuesta:
      'Cada bono te da acceso a un número determinado de sesiones mensuales que puedes utilizar cuando mejor te convenga.'
  },
  {
    pregunta: '¿Puedo acumular sesiones no utilizadas?',
    respuesta:
      'Las sesiones no utilizadas no se acumulan para el siguiente mes, excepto en casos especiales.'
  },
  {
    pregunta: '¿Hay permanencia mínima?',
    respuesta:
      'No hay permanencia mínima en los bonos mensuales. Los bonos especiales tienen sus propias condiciones.'
  },
  {
    pregunta: '¿Qué pasa si quiero más sesiones?',
    respuesta:
      'Puedes adquirir sesiones adicionales como drop-in o cambiar a un bono superior en cualquier momento.'
  }
]
