export const MEDIDAS_SECTIONS = [
  {
    id: 'basicas',
    title: 'Medidas Básicas',
    iconClass: 'cf-medidas-basic-icon',
    fields: [
      {
        name: 'altura',
        label: 'Altura (cm)',
        placeholder: '175',
        iconClass: 'cf-medidas-altura-icon'
      },
      {
        name: 'peso',
        label: 'Peso (kg)',
        placeholder: '75',
        step: '0.1',
        iconClass: 'cf-medidas-peso-icon'
      }
    ]
  },
  {
    id: 'composicion',
    title: 'Composición Corporal',
    iconClass: 'cf-medidas-composition-icon',
    fields: [
      {
        name: 'grasa',
        label: '% Grasa Corporal',
        placeholder: '15',
        step: '0.1',
        iconClass: 'cf-medidas-grasa-icon'
      },
      {
        name: 'musculo',
        label: '% Masa Muscular',
        placeholder: '40',
        step: '0.1',
        iconClass: 'cf-medidas-musculo-icon'
      }
    ]
  },
  {
    id: 'torso',
    title: 'Torso',
    iconClass: 'cf-medidas-torso-icon',
    fields: [
      {
        name: 'pecho',
        label: 'Pecho (cm)',
        placeholder: '100',
        step: '0.1',
        iconClass: 'cf-medidas-pecho-icon'
      },
      {
        name: 'cintura',
        label: 'Cintura (cm)',
        placeholder: '80',
        step: '0.1',
        iconClass: 'cf-medidas-cintura-icon'
      },
      {
        name: 'cadera',
        label: 'Cadera (cm)',
        placeholder: '95',
        step: '0.1',
        iconClass: 'cf-medidas-cadera-icon'
      }
    ]
  },
  {
    id: 'extremidades',
    title: 'Extremidades',
    iconClass: 'cf-medidas-extremities-icon',
    fields: [
      {
        name: 'biceps',
        label: 'Bíceps (cm)',
        placeholder: '35',
        step: '0.1',
        iconClass: 'cf-medidas-biceps-icon'
      },
      {
        name: 'muslos',
        label: 'Muslos (cm)',
        placeholder: '55',
        step: '0.1',
        iconClass: 'cf-medidas-muslos-icon'
      }
    ]
  }
]
