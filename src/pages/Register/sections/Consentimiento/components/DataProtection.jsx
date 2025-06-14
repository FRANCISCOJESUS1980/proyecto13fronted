import React from 'react'

const DataProtection = React.memo(() => {
  return (
    <div className='consent-section'>
      <h4>PROTECCIÓN DE DATOS</h4>
      <div className='consent-text'>
        <p>
          Responsable: Identidad: Manuel Alexandre Atienza Sobrino - NIF:
          45654031-C Izq, C.P. 41300, San José de la Rinconada, Dir. Fiscal: C/
          Córdoba 34 1 Correo electrónico: m.a.atienza360@hotmail.com Teléfono:
          627491774
        </p>

        <p>
          En nombre de la empresa tratamos la información que nos facilita con
          el fin de prestarles el servicio solicitado, realizar la facturación
          del mismo. Los datos proporcionados se conservarán mientras se
          mantenga la relación comercial o durante los años necesarios para
          cumplir con las obligaciones legales, en virtud de la cual se legitima
          el tratamiento. Los datos no se cederán a terceros salvo en los casos
          en que exista una obligación legal o sin su expresa autorización.
        </p>

        <p>
          Usted tiene derecho a obtener confirmación sobre si estamos tratando
          sus datos personales, por tanto tiene derecho a acceder a sus datos
          personales, rectificar los datos inexactos o solicitar su supresión
          cuando los datos ya no sean necesarios.
        </p>

        <p>
          Puede ejercer sus derechos mediante escrito dirigido a Manuel
          Alexandre Atienza Sobrino o por correo electrónico a
          m.a.atienza360@hotmail.com. La empresa se compromete a dar respuesta a
          su solicitud en el plazo de un mes ampliable a tres por motivos
          justificados. Puede ejercitar sus reclamaciones ante la autoridad de
          control, la Agencia Española de Protección de Datos.
        </p>
      </div>
    </div>
  )
})

DataProtection.displayName = 'DataProtection'

export default DataProtection
