import { useTarifasContext } from '../context/TarifasContext'
import { useCallback } from 'react'

export const useTarifasOptimized = () => {
  const context = useTarifasContext()

  const planData = useCallback(
    () => ({
      selectedPlan: context.selectedPlan,
      isMensual: context.selectedPlan === 'mensual',
      isEspecial: context.selectedPlan === 'especial'
    }),
    [context.selectedPlan]
  )

  const uiState = useCallback(
    () => ({
      loading: context.loading,
      fadeIn: context.fadeIn
    }),
    [context.loading, context.fadeIn]
  )

  return {
    planData,
    uiState,
    setSelectedPlan: context.setSelectedPlan,
    handleBackNavigation: context.handleBackNavigation,
    selectedPlan: context.selectedPlan,
    loading: context.loading,
    fadeIn: context.fadeIn
  }
}
