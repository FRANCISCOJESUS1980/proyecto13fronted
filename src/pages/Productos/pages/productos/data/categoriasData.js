export const CATEGORIAS = [
  'suplementos',
  'ropa',
  'equipamiento',
  'accesorios',
  'otros'
]

export const OPCIONES_ORDENAR = [
  { value: 'destacado', label: 'Destacados' },
  { value: 'precio-asc', label: 'Menor precio' },
  { value: 'precio-desc', label: 'Mayor precio' },
  { value: 'nombre-asc', label: 'A-Z' },
  { value: 'nombre-desc', label: 'Z-A' }
]

export const formatCategoria = (categoria) => {
  return categoria.charAt(0).toUpperCase() + categoria.slice(1)
}
