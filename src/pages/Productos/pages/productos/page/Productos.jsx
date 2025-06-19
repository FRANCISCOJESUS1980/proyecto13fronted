import React from 'react'
import './Productos.css'
import Header from '../../../../../components/Header/page/Header'
import Loading from '../../../../../components/Loading/loading'
import ProductosContent from '../components/ProductosContent'
import { ProductosProvider } from '../context/ProductosContext'
import { useProductosOptimized } from '../hooks/useProductosOptimized'

const ProductosInner = React.memo(() => {
  const { loading, fadeIn } = useProductosOptimized()

  if (loading) {
    return (
      <Loading
        isVisible={loading}
        loadingText='CARGANDO PRODUCTOS...'
        onComplete={() => {}}
      />
    )
  }

  return (
    <div
      className={`cf-productos-container ${
        fadeIn ? 'cf-productos-fade-in' : ''
      }`}
    >
      <Header />
      <ProductosContent />
    </div>
  )
})

ProductosInner.displayName = 'ProductosInner'

const Productos = () => {
  return (
    <ProductosProvider>
      <ProductosInner />
    </ProductosProvider>
  )
}

export default Productos
