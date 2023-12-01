import { useWindowWidth } from '@react-hook/window-size'
import classNames from 'classnames'
import PageFooter from 'layout/Footer/PageFooter'
import Navbar from 'layout/Navbar'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { sidebarDataHover, toggleCollapsedNav } from 'redux/action/Theme'

const CompactLayout = ({ children, navCollapsed, topNavCollapsed, toggleCollapsedNav, sidebarDataHover, dataHover, maximize }) => {
  const appRoutes = useMatch('/apps/')
  const errro404Route = useMatch('/error-404')
  const windowWidth = useWindowWidth()

  useEffect(() => {
    if (windowWidth > 1199) {
      toggleCollapsedNav(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowWidth])

  return (
    <div className={classNames('hk-wrapper', { 'hk-pg-auth': errro404Route }, { hk__email__backdrop: maximize })} data-layout='navbar' data-layout-style={navCollapsed ? 'collapsed' : 'default'} data-navbar-style={topNavCollapsed ? 'collapsed' : ''} data-menu='light' data-footer='simple'>
      <Navbar />
      <div className={classNames('hk-pg-wrapper', { 'pb-0': appRoutes })}>
        {children}
        {!appRoutes && <PageFooter />}
      </div>
    </div>
  )
}

const mapStateToProps = ({ theme, emailReducer }) => {
  const { navCollapsed, topNavCollapsed, dataHover } = theme
  const { maximize } = emailReducer
  return { navCollapsed, topNavCollapsed, dataHover, maximize }
}

export default connect(mapStateToProps, { toggleCollapsedNav, sidebarDataHover })(CompactLayout)
