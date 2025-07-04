export const MEDIDAS_OPTIONS = [
  { value: 'peso', label: 'Peso (kg)', unit: 'kg' },
  { value: 'grasa', label: '% Grasa Corporal', unit: '%' },
  { value: 'musculo', label: '% Masa Muscular', unit: '%' },
  { value: 'pecho', label: 'Pecho (cm)', unit: 'cm' },
  { value: 'cintura', label: 'Cintura (cm)', unit: 'cm' },
  { value: 'cadera', label: 'Cadera (cm)', unit: 'cm' },
  { value: 'biceps', label: 'Bíceps (cm)', unit: 'cm' },
  { value: 'muslos', label: 'Muslos (cm)', unit: 'cm' }
]

export const CHART_COLORS = {
  primary: '#FF5A1F',
  primaryAlpha: 'rgba(255, 90, 31, 0.2)',
  white: 'rgba(255, 255, 255, 0.7)',
  whiteStrong: 'rgba(255, 255, 255, 0.9)',
  grid: 'rgba(255, 255, 255, 0.1)',
  tooltipBg: 'rgba(30, 30, 30, 0.8)',
  tooltipBorder: 'rgba(255, 90, 31, 0.3)'
}

export const TREND_TYPES = {
  AUMENTO: 'aumento',
  DISMINUCION: 'disminución',
  ESTABLE: 'estable'
}

export const TRENDS_ACTION_TYPES = {
  FETCH_START: 'FETCH_START',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_ERROR: 'FETCH_ERROR',
  RESET: 'RESET'
}
