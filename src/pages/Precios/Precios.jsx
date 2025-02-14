/*import { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import './Precios.css'

const Precios = () => {
  return (
    <div className='Precios-container'>
      <Header />
    </div>
  )
}

export default Precios*/
'use client'

import { useState } from 'react'
import Header from '../../components/Header/Header'
import './Precios.css'

const Precios = () => {
  const [isAnnual, setIsAnnual] = useState(false)

  const planes = [
    {
      nombre: 'Plan Básico',
      precioMensual: 49.99,
      precioAnual: 539.89,
      caracteristicas: [
        'Acceso a clases grupales 3 veces por semana',
        'Evaluación física inicial',
        'Acceso a la app de seguimiento',
        'Casillero personal'
      ],
      noIncluido: [
        'Clases ilimitadas',
        'Programación personalizada',
        'Nutrición personalizada',
        'Acceso 24/7'
      ],
      popular: false
    },
    {
      nombre: 'Plan Premium',
      precioMensual: 79.99,
      precioAnual: 863.89,
      caracteristicas: [
        'Clases grupales ilimitadas',
        'Evaluación física mensual',
        'Acceso a la app de seguimiento',
        'Casillero personal',
        'Programación personalizada',
        '2 sesiones PT al mes'
      ],
      noIncluido: ['Nutrición personalizada', 'Acceso 24/7'],
      popular: true
    },
    {
      nombre: 'Plan Elite',
      precioMensual: 129.99,
      precioAnual: 1403.89,
      caracteristicas: [
        'Acceso total 24/7',
        'Clases ilimitadas',
        'Evaluación física semanal',
        'Acceso a la app premium',
        'Casillero personal premium',
        'Programación personalizada',
        '4 sesiones PT al mes',
        'Plan nutricional personalizado'
      ],
      noIncluido: [],
      popular: false
    }
  ]

  return (
    <div className='precios-container'>
      <Header />

      <main className='precios-main'>
        <section className='precios-hero'>
          <h1>Planes y Membresías</h1>
          <p>Encuentra el plan perfecto para alcanzar tus objetivos</p>

          <div className='toggle-container'>
            <span className={!isAnnual ? 'active' : ''}>Mensual</span>
            <div
              className={`toggle ${isAnnual ? 'active' : ''}`}
              onClick={() => setIsAnnual(!isAnnual)}
            >
              <div className='toggle-button'></div>
            </div>
            <span className={isAnnual ? 'active' : ''}>
              Anual <span className='descuento'>¡10% descuento!</span>
            </span>
          </div>
        </section>

        <section className='planes-container'>
          {planes.map((plan, index) => (
            <div
              key={index}
              className={`plan-card ${plan.popular ? 'popular' : ''}`}
            >
              {plan.popular && <div className='popular-badge'>Más Popular</div>}
              <h2>{plan.nombre}</h2>
              <div className='precio'>
                <span className='moneda'>€</span>
                <span className='cantidad'>
                  {isAnnual
                    ? (plan.precioAnual / 12).toFixed(2)
                    : plan.precioMensual}
                </span>
                <span className='periodo'>/mes</span>
              </div>
              {isAnnual && (
                <div className='precio-total'>
                  Total anual: €{plan.precioAnual}
                </div>
              )}
              <button
                className={`btn-suscribir ${plan.popular ? 'popular' : ''}`}
              >
                Comenzar Ahora
              </button>
              <div className='caracteristicas'>
                <h3>Incluye:</h3>
                {plan.caracteristicas.map((caracteristica, i) => (
                  <div key={i} className='caracteristica incluido'>
                    <span className='check-icon'>✓</span>
                    <span>{caracteristica}</span>
                  </div>
                ))}
                {plan.noIncluido.map((caracteristica, i) => (
                  <div key={i} className='caracteristica no-incluido'>
                    <span className='x-icon'>×</span>
                    <span>{caracteristica}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className='beneficios'>
          <h2>¿Por qué elegir nuestro Box?</h2>
          <div className='beneficios-grid'>
            <div className='beneficio'>
              <h3>Entrenadores Certificados</h3>
              <p>
                Todos nuestros coaches tienen certificaciones oficiales de
                CrossFit
              </p>
            </div>
            <div className='beneficio'>
              <h3>Comunidad Increíble</h3>
              <p>
                Únete a una comunidad que te apoyará en cada paso del camino
              </p>
            </div>
            <div className='beneficio'>
              <h3>Instalaciones Premium</h3>
              <p>
                Equipamiento de primera calidad y espacios amplios y ventilados
              </p>
            </div>
            <div className='beneficio'>
              <h3>Resultados Garantizados</h3>
              <p>Sistema probado de entrenamiento y seguimiento de progreso</p>
            </div>
          </div>
        </section>

        <section className='faq'>
          <h2>Preguntas Frecuentes</h2>
          <div className='faq-grid'>
            <div className='faq-item'>
              <h3>¿Necesito experiencia previa?</h3>
              <p>
                No, todos nuestros programas se adaptan a cualquier nivel de
                experiencia.
              </p>
            </div>
            <div className='faq-item'>
              <h3>¿Puedo cambiar de plan?</h3>
              <p>Sí, puedes cambiar tu plan en cualquier momento del mes.</p>
            </div>
            <div className='faq-item'>
              <h3>¿Hay permanencia mínima?</h3>
              <p>
                No hay permanencia mínima en los planes mensuales. Los planes
                anuales tienen 12 meses de compromiso.
              </p>
            </div>
            <div className='faq-item'>
              <h3>¿Qué incluye la evaluación física?</h3>
              <p>
                Mediciones corporales, pruebas de capacidad física y
                establecimiento de objetivos personalizados.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Precios
