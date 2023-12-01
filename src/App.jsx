import React from 'react'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import AuthRoutes from './routes/AuthRoutes'
import ScrollToTop from './utils/ScrollToTop'
import PublicRoute from './routes'

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<Navigate to='/dashboard' />} />
          {/* Auth */}
          <Route path='/auth/*' element={<AuthRoutes />} />
          {/* Layouts */}
          <Route path='/*' element={<PublicRoute />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
