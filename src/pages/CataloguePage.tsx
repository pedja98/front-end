import React, { lazy, Suspense } from 'react'
import Spinner from '../components/Spinner'

const RemoteCatalogueApp = lazy(() => import('catalogue/CatalogueApp'))

export default function Wrapper() {
  return (
    <Suspense fallback={<Spinner />}>
      <RemoteCatalogueApp />
    </Suspense>
  )
}
