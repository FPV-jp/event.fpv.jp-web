import classNames from 'classnames'
import PageAnimate from 'components/Animation/PageAnimate'
import { AnimatePresence } from 'framer-motion'
import { Suspense } from 'react'
import { Route, Routes, useMatch } from 'react-router-dom'
import { publicRoutes } from 'routes/RouteList'
import Spinner from 'utils/Spinner'

const PublicRoutes = () => {
  const match = useMatch('/auth/*')
  return (
    <AnimatePresence>
      <Suspense fallback={<Spinner />}>
        <div className={classNames('hk-wrapper hk-pg-auth', { 'bg-primary-dark-3': !match })} data-footer='simple'>
          <Routes>
            {publicRoutes.map((route, i) => (
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
            {/* <Navigate to='/dashboard' /> */}
          </Routes>
        </div>
      </Suspense>
    </AnimatePresence>
  )
}

export default PublicRoutes
