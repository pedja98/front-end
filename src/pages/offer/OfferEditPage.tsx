import React, { lazy, Suspense } from 'react'
import { useAppSelector } from '../../app/hooks'
import Spinner from '../../components/Spinner'
import { OfferEditProps } from '../../types/offer'
import { useParams } from 'react-router-dom'

const RemoteOfferEditApp = lazy(() => import('offerEdit/OfferEditApp')) as React.ComponentType<OfferEditProps>

const OfferEditPage: React.FC = () => {
  const crmOfferId = Number(useParams().id)
  const auth = useAppSelector((state) => state.auth)

  return (
    <Suspense fallback={<Spinner />}>
      <RemoteOfferEditApp
        language={auth.language}
        username={auth.username as string}
        type={auth.type}
        crmOfferId={crmOfferId}
      />
    </Suspense>
  )
}

export default OfferEditPage
