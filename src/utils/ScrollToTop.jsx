import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const ScrollToTop = ({ children }) => {
  const history = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }, [pathname, history])

  return children || null
}

export default ScrollToTop
