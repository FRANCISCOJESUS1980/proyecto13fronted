import BarbellAnimation from './BarbellAnimation'
import KettlebellAnimation from './KettlebellAnimation'
import AthleteAnimation from './AthleteAnimation'
import BoxAnimation from './BoxAnimation'

const AnimationsSection = () => {
  return (
    <section className='cf-crossfit-animations'>
      <BarbellAnimation />
      <KettlebellAnimation />
      <AthleteAnimation />
      <BoxAnimation />
    </section>
  )
}

export default AnimationsSection
