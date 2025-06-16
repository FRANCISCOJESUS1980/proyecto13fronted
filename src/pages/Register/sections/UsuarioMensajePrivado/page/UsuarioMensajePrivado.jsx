import React from 'react'
import './UsuarioMensajePrivado.css'
import Header from '../../../../../components/Header/page/Header'
import Loading from '../../../../../components/Loading/loading'
import AnimationWrapper from '../components/AnimationWrapper'
import MensajesContent from '../components/MensajesContent'
import { MensajesPrivadosProvider } from '../context/MensajesPrivadosContext'
import { useMensajesPrivadosOptimized } from '../hooks/useMensajesPrivadosOptimized'

const UsuarioMensajePrivadoInner = React.memo(() => {
  const { loading } = useMensajesPrivadosOptimized()

  if (loading) {
    return (
      <Loading
        isVisible={loading}
        loadingText='CARGANDO MENSAJES PRIVADOS...'
        onComplete={() => {}}
      />
    )
  }

  return (
    <div className='cf-mensajes-container'>
      <AnimationWrapper />
      <Header />
      <MensajesContent />
    </div>
  )
})

UsuarioMensajePrivadoInner.displayName = 'UsuarioMensajePrivadoInner'

const UsuarioMensajePrivado = () => {
  return (
    <MensajesPrivadosProvider>
      <UsuarioMensajePrivadoInner />
    </MensajesPrivadosProvider>
  )
}

export default UsuarioMensajePrivado
