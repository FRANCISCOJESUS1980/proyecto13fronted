import { memo } from 'react'
import PropTypes from 'prop-types'
import Consentimiento from '../../sections/Consentimiento/page/Consentimiento'

export const ConsentScreen = memo(({ onConsentAccepted }) => {
  return <Consentimiento onConsentAccepted={onConsentAccepted} />
})

ConsentScreen.propTypes = {
  onConsentAccepted: PropTypes.func.isRequired
}

ConsentScreen.displayName = 'ConsentScreen'
