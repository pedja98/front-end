import React, { lazy, Suspense } from 'react'
import Spinner from '../components/Spinner'
import { useAppSelector } from '../app/hooks'
import { CatalogueProps } from '../types/catalogue'

const RemoteCatalogueApp = lazy(() => import('catalogue/CatalogueApp')) as React.ComponentType<CatalogueProps>

const CataloguePage: React.FC = () => {
  const auth = useAppSelector((state) => state.auth)

  return (
    <Suspense fallback={<Spinner />}>
      <RemoteCatalogueApp language={auth.language} username={auth.username as string} type={auth.type} />
    </Suspense>
  )
}

export default CataloguePage
