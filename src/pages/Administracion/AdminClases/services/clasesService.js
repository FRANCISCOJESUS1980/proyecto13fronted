import {
  fetchClases as fetchClasesApi,
  deleteClase as deleteClaseApi,
  guardarClaseAPI as guardarClaseApiCentral
} from '../../../../services/Api/index'

export const fetchClasesAPI = async () => {
  const token = localStorage.getItem('token')
  return await fetchClasesApi(token)
}

export const deleteClaseAPI = async (id) => {
  const token = localStorage.getItem('token')

  return await deleteClaseApi(id, token)
}

export const guardarClase = async (formData, editingId, modoCreacion) => {
  const token = localStorage.getItem('token')
  console.log('Datos enviados desde clasesService:', {
    formData,
    editingId,
    modoCreacion
  })
  return await guardarClaseApiCentral(token, formData, editingId, modoCreacion)
}
