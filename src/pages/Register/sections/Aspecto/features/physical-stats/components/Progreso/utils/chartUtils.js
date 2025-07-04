import { es } from 'date-fns/locale'
import {
  CHART_COLORS,
  MEDIDAS_OPTIONS,
  TREND_TYPES
} from '../constants/progressConstants.js'

export const safeToFixed = (value, decimals = 2) => {
  if (value === undefined || value === null) return '0.00'
  return Number(value).toFixed(decimals)
}

export const getMeasureUnit = (selectedMedida) => {
  const option = MEDIDAS_OPTIONS.find((opt) => opt.value === selectedMedida)
  return option?.unit || ''
}

export const getMeasureLabel = (selectedMedida) => {
  const option = MEDIDAS_OPTIONS.find((opt) => opt.value === selectedMedida)
  return option?.label || selectedMedida
}

export const getTrendLabel = (trend) => {
  switch (trend) {
    case TREND_TYPES.AUMENTO:
      return 'Aumento'
    case TREND_TYPES.DISMINUCION:
      return 'Disminución'
    default:
      return 'Estable'
  }
}

export const getTrendClass = (trend) => {
  switch (trend) {
    case TREND_TYPES.AUMENTO:
      return 'cf-progreso-trend-up-text'
    case TREND_TYPES.DISMINUCION:
      return 'cf-progreso-trend-down-text'
    default:
      return 'cf-progreso-trend-stable-text'
  }
}

export const prepareChartData = (historialMedidas, selectedMedida) => {
  if (!historialMedidas || historialMedidas.length === 0) {
    return null
  }

  const sortedData = [...historialMedidas].sort(
    (a, b) => new Date(a.fecha) - new Date(b.fecha)
  )

  const labels = sortedData.map((item) => new Date(item.fecha))
  const values = sortedData.map((item) => {
    const value = item.medidas && item.medidas[selectedMedida]
    return value !== undefined ? value : null
  })

  return {
    labels,
    datasets: [
      {
        label: getMeasureLabel(selectedMedida),
        data: values,
        borderColor: CHART_COLORS.primary,
        backgroundColor: CHART_COLORS.primaryAlpha,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: CHART_COLORS.primary,
        pointBorderColor: 'rgba(255, 255, 255, 0.8)',
        pointBorderWidth: 2
      }
    ]
  }
}

export const getChartOptions = (selectedMedida) => ({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      type: 'time',
      time: {
        unit: 'day',
        tooltipFormat: 'PPP',
        displayFormats: {
          day: 'dd MMM'
        }
      },
      adapters: {
        date: {
          locale: es
        }
      },
      title: {
        display: true,
        text: 'Fecha',
        color: CHART_COLORS.white
      },
      grid: {
        color: CHART_COLORS.grid
      },
      ticks: {
        color: CHART_COLORS.white
      }
    },
    y: {
      beginAtZero: false,
      title: {
        display: true,
        text: getMeasureLabel(selectedMedida),
        color: CHART_COLORS.white
      },
      grid: {
        color: CHART_COLORS.grid
      },
      ticks: {
        color: CHART_COLORS.white
      }
    }
  },
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: CHART_COLORS.whiteStrong,
        font: {
          weight: 'bold'
        }
      }
    },
    tooltip: {
      backgroundColor: CHART_COLORS.tooltipBg,
      titleColor: CHART_COLORS.primary,
      bodyColor: CHART_COLORS.whiteStrong,
      borderColor: CHART_COLORS.tooltipBorder,
      borderWidth: 1,
      callbacks: {
        title: (context) => {
          if (
            context &&
            context[0] &&
            context[0].parsed &&
            context[0].parsed.x
          ) {
            const date = new Date(context[0].parsed.x)
            return date.toLocaleDateString('es-ES', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })
          }
          return ''
        }
      }
    }
  }
})
