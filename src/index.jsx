import i18n from 'i18next'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider, useSelector } from 'react-redux'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import store from 'redux_/store'
import PrivateRoutes from 'routes/PrivateRoutes'
import PublicRoutes from 'routes/PublicRoutes'
import AuthProvider, { useAuth } from 'utils/AuthProvider'
import ScrollToTop from 'utils/ScrollToTop'
import './assets/scss/style.scss'
import './i18n'

function App() {
  const { getUser } = useAuth()

  React.useEffect(() => {
    getUser()
  }, [getUser])

  const selectLocale = (state) => state.auth0Reducer.locale
  const locale = useSelector(selectLocale)

  React.useEffect(() => {
    i18n.changeLanguage(locale)
  }, [locale])

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Navigate to='/dashboard' />} />
        {/* Public Access */}
        <Route path='/auth/*' element={<PublicRoutes />} />
        {/* Private Access */}
        <Route path='/*' element={<PrivateRoutes />} />
      </Routes>
    </Router>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Provider>,
)
