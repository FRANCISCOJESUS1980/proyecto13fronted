import React from 'react'
import './Tarifas.css'
import Header from '../../../components/Header/page/Header'
import Loading from '../../../components/Loading/loading'
import TarifasHeader from '../components/TarifasHeader'
import TarifasContent from '../components/TarifasContent'
import { TarifasProvider } from '../context/TarifasContext'
import { useTarifasOptimized } from '../hooks/useTarifasOptimized'

const TarifasInner = React.memo(() => {
  const { loading, fadeIn } = useTarifasOptimized()

  if (loading) {
    return (
      <Loading
        isVisible={loading}
        loadingText='CARGANDO TARIFAS...'
        onComplete={() => {}}
      />
    )
  }

  return (
    <div className={`precios-container ${fadeIn ? 'fade-in' : ''}`}>
      <Header />
      <TarifasHeader />
      <TarifasContent />
    </div>
  )
})

TarifasInner.displayName = 'TarifasInner'

const Tarifas = () => {
  return (
    <TarifasProvider>
      <TarifasInner />
    </TarifasProvider>
  )
}

export default Tarifas
