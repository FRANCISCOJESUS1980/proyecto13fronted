export const timerModes = [
  {
    id: 'forTime',
    title: 'FOR TIME',
    description:
      'Completa el WOD lo más rápido posible dentro del tiempo límite',
    example: 'Ej: 21-15-9 Thrusters & Pull-ups'
  },
  {
    id: 'amrap',
    title: 'AMRAP',
    description: 'Tantas rondas como sea posible en el tiempo establecido',
    example: 'Ej: 20 min AMRAP: 5 Pull-ups, 10 Push-ups, 15 Squats'
  },
  {
    id: 'emom',
    title: 'EMOM',
    description: 'Cada minuto en el minuto - completa el trabajo y descansa',
    example: 'Ej: 10 min EMOM: 5 Burpees'
  },
  {
    id: 'tabata',
    title: 'TABATA',
    description: 'Protocolo Tabata: trabajo intenso y descanso corto',
    example: 'Ej: 8 rounds: 20 seg trabajo, 10 seg descanso'
  },
  {
    id: 'custom',
    title: 'PERSONALIZADO',
    description: 'Configura tu propio timer con rondas y descansos',
    example: 'Ej: 5 rounds de 3 min con 1 min descanso'
  }
]
