const PRECIOS_BONOS = {
  Mensual: 50,
  Trimestral: 120,
  Ilimitado: 80,
  '8 Sesiones': 80,
  '10 Sesiones': 100,
  '12 Sesiones': 120,
  '16 Sesiones': 160,
  '20 Sesiones': 200,
  'Bono 5 sesiones': 50,
  'Curso de iniciación + 2 meses': 150,
  'Drop in': 15
}

export const calcularMontoBono = (bono) => {
  if (!bono || !bono.tipo) {
    console.warn('Bono sin tipo o indefinido:', bono)
    return 0
  }

  if (bono.precio && typeof bono.precio === 'number') {
    return bono.precio
  }

  return PRECIOS_BONOS[bono.tipo] || (bono.sesionesTotal || 0) * 10
}
