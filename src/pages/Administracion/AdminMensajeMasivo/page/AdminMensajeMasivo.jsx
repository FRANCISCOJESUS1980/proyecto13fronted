import React from 'react'
import './AdminMensajeMasivo.css'
import Header from '../../../../components/Header/page/Header'
import AnimationWrapper from '../components/AnimationWrapper'
import MensajeMasivoForm from '../components/MensajeMasivoForm'
import { MensajeMasivoProvider } from '../context/MensajeMasivoContext'
import { useAnimationsOptimized } from '../hooks/useAnimationsOptimized'

const AdminMensajeMasivoContent = React.memo(() => {
  useAnimationsOptimized(1000)

  return (
    <div className='cf-admin-mensaje-masivo-page'>
      <Header />
      <AnimationWrapper />
      <MensajeMasivoForm />
    </div>
  )
})

AdminMensajeMasivoContent.displayName = 'AdminMensajeMasivoContent'

const AdminMensajeMasivo = () => {
  return (
    <MensajeMasivoProvider>
      <AdminMensajeMasivoContent />
    </MensajeMasivoProvider>
  )
}

export default AdminMensajeMasivo
