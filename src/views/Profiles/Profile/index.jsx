import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import ProfileIntro from './ProfileIntro'
import Header from './Header'
import Body from './Body'
// Redux
import { connect } from 'react-redux'
import { toggleCollapsedNav, sidebarDataHover } from 'redux/action/Theme'

//Images
import bgImg from 'assets/dist/img/profile-bg.jpg'

const Profile = ({ toggleCollapsedNav, sidebarDataHover }) => {
  useEffect(() => {
    toggleCollapsedNav(false)
    sidebarDataHover(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='hk-pg-body'>
      <Container>
        <div className='profile-wrap'>
          <div className='profile-img-wrap'>
            <img className='img-fluid rounded-5' src={bgImg} alt='Img Description' />
          </div>
          <ProfileIntro />
          <Header />
          <Body />
        </div>
      </Container>
    </div>
  )
}

const mapStateToProps = ({ theme }) => {
  const { navCollapsed, dataHover } = theme
  return { navCollapsed, dataHover }
}

export default connect(mapStateToProps, { toggleCollapsedNav, sidebarDataHover })(Profile)
