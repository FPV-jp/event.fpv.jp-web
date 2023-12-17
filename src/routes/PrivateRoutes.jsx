import PageAnimate from 'components/Animation/PageAnimate'
import { AnimatePresence } from 'framer-motion'
import { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import AuthHeader from 'layout/Header/AuthHeader'
import { privateRoutes } from 'routes/RouteList'
import Spinner from 'utils/Spinner'

const PrivateRoutes = () => {
  return (
    <AnimatePresence>
      <Suspense fallback={<Spinner />}>
        <AuthHeader>
          <Routes>
            {privateRoutes.map((route, i) => (
              <Route
                key={i}
                path={route.path}
                element={
                  <PageAnimate>
                    <route.element />
                  </PageAnimate>
                }
              />
            ))}
            <Route path='*' element={<Navigate to='/error-404' />} />
          </Routes>
        </AuthHeader>
      </Suspense>
    </AnimatePresence>
  )
}

export default PrivateRoutes
