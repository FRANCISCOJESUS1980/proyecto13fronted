import ClasesTimeline from '../../../../Clases/components/ClaseTimeline/ClasesTimeline'
import Loading from '../../../../../components/Loading/loading'
import MensajeEstado from '../../../../Clases/components/MensajeEstado/MensajeEstado'

const ClassesSection = ({
  selectedDate,
  clasesOrdenadas,
  handleInscribir,
  handleCancelar,
  estaInscrito,
  loading,
  claseSeleccionada,
  error
}) => {
  const puedeInscribirse = () => true
  const puedeCancelar = () => true

  if (loading && !claseSeleccionada) {
    return <Loading isVisible={true} loadingText='CARGANDO CLASES...' />
  }

  if (error) {
    return <MensajeEstado tipo='error' mensaje={error} />
  }

  return (
    <div className='cf-classes-section'>
      <ClasesTimeline
        selectedDate={selectedDate}
        clasesOrdenadas={clasesOrdenadas}
        handleInscribir={handleInscribir}
        handleCancelar={handleCancelar}
        estaInscrito={estaInscrito}
        loading={loading}
        claseSeleccionada={claseSeleccionada}
        puedeInscribirse={puedeInscribirse}
        puedeCancelar={puedeCancelar}
      />
    </div>
  )
}

export default ClassesSection
