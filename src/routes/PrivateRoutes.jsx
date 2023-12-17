import PageAnimate from 'components/Animation/PageAnimate'
import { AnimatePresence } from 'framer-motion'
import AuthHeader from 'layout/Header/AuthHeader'
import { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { privateRoutes } from 'routes/RouteList'

const PrivateRoutes = () => {
  return (
    <AnimatePresence>
      <Suspense
        fallback={
          <div className='preloader-it'>
            <div className='loader-pendulums' />
          </div>
        }
      >
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
