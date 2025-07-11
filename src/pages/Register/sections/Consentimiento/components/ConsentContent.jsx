import React from 'react'
import ConsentTitle from './ConsentTitle'
import ConsentText from './ConsentText'
import PersonalData from './PersonalData'
import DigitalSignature from './DigitalSignature'
import DataProtection from './DataProtection'
import ImageAuthorization from './imageAutorization'

const ConsentContent = React.memo(() => {
  const contentRef = React.useRef(null)

  return (
    <div className='consent-content' ref={contentRef}>
      <ConsentTitle />
      <ConsentText />
      <PersonalData />
      <DigitalSignature />
      <DataProtection />
      <ImageAuthorization />
    </div>
  )
})

ConsentContent.displayName = 'ConsentContent'
export default ConsentContent
