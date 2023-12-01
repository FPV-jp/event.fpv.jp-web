import classNames from 'classnames'
import { Suspense } from 'react'
import { Route, Routes, useMatch } from 'react-router-dom'
import { privateRoutes } from 'routes/RouteList'
import PageAnimate from 'components/Animation/PageAnimate'
import { AnimatePresence } from 'framer-motion'

const ClassicRoutes = () => {
  const match = useMatch('/auth/*')

  return (
    <>
      <AnimatePresence>
        <Suspense
          fallback={
            <div className='preloader-it'>
              <div className='loader-pendulums' />
            </div>
          }
        >
          <div className={classNames('hk-wrapper hk-pg-auth', { 'bg-primary-dark-3': match })} data-footer='simple'>
            <Routes>
              {privateRoutes.map((route, i) => (
                <Route
                  key={i}
                  path={route.path}
                  element={
                    <PageAnimate>
                      <route.component />
                    </PageAnimate>
                  }
                />
              ))}
              {/* <Navigate to="/dashboard" /> */}
            </Routes>
          </div>
        </Suspense>
      </AnimatePresence>
    </>
  )
}

export default ClassicRoutes
