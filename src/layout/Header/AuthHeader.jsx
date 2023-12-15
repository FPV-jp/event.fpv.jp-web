import { useWindowWidth } from '@react-hook/window-size'
import classNames from 'classnames'
import Footer from 'layout/Footer'
import Header from 'layout/Header'
import AuthenticatedNavbar from 'layout/Navbar'
import { useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { sidebarDataHover, toggleCollapsedNav } from 'redux_/action/Theme'
import Spinner from 'utils/Spinner'

const getToken = (state) => state.auth0Reducer.idToken

const AuthenticatedHeader = ({ children, navCollapsed, topNavCollapsed, toggleCollapsedNav, maximize }) => {
  const appRoutes = useMatch('/apps/')
  const errro404Route = useMatch('/error-404')
  const windowWidth = useWindowWidth()

  useEffect(() => {
    if (windowWidth > 1199) {
      toggleCollapsedNav(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowWidth])

  const token = useSelector(getToken)

  const selectInvoking = (state) => state.auth0Reducer.invoking
  const invoking = useSelector(selectInvoking)

  return (
    <div className={classNames('hk-wrapper', { 'hk-pg-auth': errro404Route }, { hk__email__backdrop: maximize })} data-layout='navbar' data-layout-style={navCollapsed ? 'collapsed' : 'default'} data-navbar-style={topNavCollapsed ? 'collapsed' : ''} data-menu='light' data-footer='simple'>
      {invoking ? (
        <Spinner />
      ) : (
        <>
          {token ? <AuthenticatedNavbar /> : <Header />}
          <div className={classNames('hk-pg-wrapper', { 'pb-0': appRoutes })}>
            {children}
            {!appRoutes && <Footer />}
          </div>
        </>
      )}
    </div>
  )
}

const mapStateToProps = ({ theme, emailReducer }) => {
  const { navCollapsed, topNavCollapsed, dataHover } = theme
  const { maximize } = emailReducer
  return { navCollapsed, topNavCollapsed, dataHover, maximize }
}

export default connect(mapStateToProps, { toggleCollapsedNav, sidebarDataHover })(AuthenticatedHeader)
