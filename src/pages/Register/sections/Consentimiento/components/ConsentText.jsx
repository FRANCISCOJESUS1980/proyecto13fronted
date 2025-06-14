import React from 'react'

const ConsentText = React.memo(() => {
  return (
    <div className='consent-section'>
      <div className='consent-text'>
        <p>
          Yo, con D.N.I. mayor de edad [y/o como padre/madre/tutor del menor con
          D.N.I. AUTORIZO] y (me) considero física y psicológicamente apto y
          estoy de acuerdo en participar en uno o más programas de aptitud
          física(s)/clase(s) o entrenamientos libres realizados por EL CENTRO
          DEPORTIVO ADERCROSSFIT (en adelante EL CENTRO) que puede incluir, pero
          no necesariamente limitarse a CrossFit, entrenamientos de alta
          intensidad y/o entrenamientos de cualquier tipo dirigidos por
          ENTRENADORES contratados por EL CENTRO al igual que entrenamientos de
          forma libre.
        </p>

        <p>
          El CENTRO me hace plenamente consciente de que los programas de
          aptitud física/clases que ofrece y que YO deseo participar, son de
          naturaleza agotadoras y de alta intensidad y pueden/podrían empujarme
          hasta el límite de mis capacidades físicas. Reconozco y entiendo que
          los programas/clases cuentan con diferentes grados de riesgo que
          pueden incluir, pero no se limitan sólo a lo siguiente: Lesiones
          óseas, articulares y/o musculares, en forma más rara problemas
          cardiacos e infarto y casos extremos fallecimiento o muerte súbita.
        </p>

        <p className='highlight'>
          Soy consciente de estos riesgos y otros posibles no mencionados y
          eximo en consecuencia al CENTRO y todos sus trabajadores y
          colaboradores de cualquier responsabilidad, daño o perjuicio que pueda
          sufrir en el desarrollo de la actividad, responsabilidad que es
          asumida en su totalidad por mi parte, renunciando a cualquier tipo de
          indemnización o retribución económica.
        </p>
      </div>
    </div>
  )
})

ConsentText.displayName = 'ConsentText'

export default ConsentText
