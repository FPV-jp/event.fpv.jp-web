import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const ScrollToTop = ({ children }) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }, [pathname, navigate])

  return children || null
}

export default ScrollToTop
