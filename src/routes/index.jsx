import PageAnimate from 'components/Animation/PageAnimate'
import { AnimatePresence } from 'framer-motion'
import CompactLayout from 'layout/MainLayout'
import { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { publicRoutes } from 'routes/RouteList'

const IndexRoute = () => {
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
          <CompactLayout>
            <Routes>
              {publicRoutes.map((route, i) => (
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
              <Route path='*' element={<Navigate to='/error-404' />} />
            </Routes>
          </CompactLayout>
        </Suspense>
      </AnimatePresence>
    </>
  )
}

export default IndexRoute
