import i18n from 'i18next'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import store from 'redux/store'
import PrivateRoutes from 'routes/PrivateRoutes'
import PublicRoutes from 'routes/PublicRoutes'
import AuthProvider, { useAuth } from 'utils/AuthProvider'
import ScrollToTop from 'utils/ScrollToTop'
import './assets/scss/style.scss'
import './i18n'

function App() {
  const { getUser } = useAuth()
  getUser()
  i18n.changeLanguage('ja')

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
