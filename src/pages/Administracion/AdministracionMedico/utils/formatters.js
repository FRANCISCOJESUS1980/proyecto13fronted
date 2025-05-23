export const formatDate = (dateString) => {
  if (!dateString) return 'No registrado'
  return new Date(dateString).toLocaleDateString()
}
