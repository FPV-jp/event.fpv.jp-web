import Brand from 'assets/dist/img/Jampack.svg'
import avatar10 from 'assets/dist/img/avatar10.jpg'
import avatar2 from 'assets/dist/img/avatar2.jpg'
import avatar3 from 'assets/dist/img/avatar3.jpg'
import BrandSm from 'assets/dist/img/brand-sm.svg'
import HkBadge from 'components/@hk-badge/@hk-badge'
import NavMenu from 'layout/Navbar/NavMenu'
import NavSearch from 'layout/Navbar/NavSearch'
import { Button, Container, Dropdown, Nav, Navbar } from 'react-bootstrap'
import { AlignLeft, Bell, Calendar, Clock, Inbox, LogOut, Settings, User } from 'react-feather'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { setUser } from 'redux/action/Auth0'
import { toggleCollapsedNav } from 'redux/action/Theme'
import SimpleBar from 'simplebar-react'
import { useAuth } from 'utils/AuthProvider'

const AuthenticatedNavbar = ({ navCollapsed, toggleCollapsedNav, nickname, picture, email }) => {
  const { logout } = useAuth()
  return (
    <Navbar expand='xl' className='hk-navbar navbar-light fixed-top'>
      <Container fluid>
        <div className='nav-start-wrap flex-fill'>
          <Link to='/' className='navbar-brand d-xl-flex d-none'>
            <img className='brand-img img-fluid' src={BrandSm} alt='brand' />
            <img className='brand-img img-fluid' src={Brand} alt='brand' />
          </Link>
          <Button onClick={() => toggleCollapsedNav(!navCollapsed)} className='btn-icon btn-rounded btn-flush-dark flush-soft-hover navbar-toggle d-xl-none'>
            <span className='icon'>
              <span className='feather-icon'>
                <AlignLeft />
              </span>
            </span>
          </Button>
          <NavMenu />
          <div onClick={() => toggleCollapsedNav(!navCollapsed)} className='hk-menu-backdrop' />
        </div>
        <div className='nav-end-wrap'>
          <NavSearch />
          <Nav className='navbar-nav flex-row'>
            <Nav.Item>
              <Button variant='flush-dark' as={Link} to='/apps/email' className='btn-icon btn-rounded flush-soft-hover'>
                <span className='icon'>
                  <span className=' position-relative'>
                    <span className='feather-icon'>
                      <Inbox />
                    </span>
                    <HkBadge bg='primary' soft pill size='sm' className='position-top-end-overflow-1'>
                      4
                    </HkBadge>
                  </span>
                </span>
              </Button>
            </Nav.Item>
            <Nav.Item>
              <Dropdown className='dropdown-notifications'>
                <Dropdown.Toggle variant='flush-dark' className='btn-icon btn-rounded flush-soft-hover no-caret'>
                  <span className='icon'>
                    <span className='position-relative'>
                      <span className='feather-icon'>
                        <Bell />
                      </span>
                      <HkBadge bg='success' indicator className='position-top-end-overflow-1' />
                    </span>
                  </span>
                </Dropdown.Toggle>
                <Dropdown.Menu align='end' className='p-0'>
                  <Dropdown.Header className='px-4 fs-6'>
                    Notifications
                    <Button variant='flush-dark' className='btn-icon btn-rounded flush-soft-hover'>
                      <span className='icon'>
                        <span className='feather-icon'>
                          <Settings />
                        </span>
                      </span>
                    </Button>
                  </Dropdown.Header>
                  <SimpleBar className='dropdown-body  p-2'>
                    <Dropdown.Item>
                      <div className='media'>
                        <div className='media-head'>
                          <div className='avatar avatar-rounded avatar-sm'>
                            <img src={avatar2} alt='user' className='avatar-img' />
                          </div>
                        </div>
                        <div className='media-body'>
                          <div>
                            <div className='notifications-text'>Morgan Freeman accepted your invitation to join the team</div>
                            <div className='notifications-info'>
                              <HkBadge bg='success' soft>
                                Collaboration
                              </HkBadge>
                              <div className='notifications-time'>Today, 10:14 PM</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <div className='media'>
                        <div className='media-head'>
                          <div className='avatar  avatar-icon avatar-sm avatar-success avatar-rounded'>
                            <span className='initial-wrap'>
                              <span className='feather-icon'>
                                <Inbox />
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className='media-body'>
                          <div>
                            <div className='notifications-text'>New message received from Alan Rickman</div>
                            <div className='notifications-info'>
                              <div className='notifications-time'>Today, 7:51 AM</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <div className='media'>
                        <div className='media-head'>
                          <div className='avatar  avatar-icon avatar-sm avatar-pink avatar-rounded'>
                            <span className='initial-wrap'>
                              <span className='feather-icon'>
                                <Clock />
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className='media-body'>
                          <div>
                            <div className='notifications-text'>You have a follow up with Jampack Head on Friday, Dec 19 at 9:30 am</div>
                            <div className='notifications-info'>
                              <div className='notifications-time'>Yesterday, 9:25 PM</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <div className='media'>
                        <div className='media-head'>
                          <div className='avatar avatar-sm avatar-rounded'>
                            <img src={avatar3} alt='user' className='avatar-img' />
                          </div>
                        </div>
                        <div className='media-body'>
                          <div>
                            <div className='notifications-text'>Application of Sarah Williams is waiting for your approval</div>
                            <div className='notifications-info'>
                              <div className='notifications-time'>Today 10:14 PM</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <div className='media'>
                        <div className='media-head'>
                          <div className='avatar avatar-sm avatar-rounded'>
                            <img src={avatar10} alt='user' className='avatar-img' />
                          </div>
                        </div>
                        <div className='media-body'>
                          <div>
                            <div className='notifications-text'>Winston Churchil shared a document with you</div>
                            <div className='notifications-info'>
                              <HkBadge bg='violet' soft>
                                File Manager
                              </HkBadge>
                              <div className='notifications-time'>2 Oct, 2021</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <div className='media'>
                        <div className='media-head'>
                          <div className='avatar  avatar-icon avatar-sm avatar-danger avatar-rounded'>
                            <span className='initial-wrap'>
                              <span className='feather-icon'>
                                <Calendar />
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className='media-body'>
                          <div>
                            <div className='notifications-text'>Last 2 days left for the project to be completed</div>
                            <div className='notifications-info'>
                              <HkBadge bg='orange' soft>
                                Updates
                              </HkBadge>
                              <div className='notifications-time'>14 Sep, 2021</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Dropdown.Item>
                  </SimpleBar>
                  <div className='dropdown-footer'>
                    <Link to='#'>
                      <u>View all notifications</u>
                    </Link>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Item>
            <Nav.Item>
              <Dropdown className='ps-2'>
                <Dropdown.Toggle as={Link} to='#' className='no-caret'>
                  <div className='avatar avatar-rounded avatar-xs'>
                    <img src={picture} alt='user' className='avatar-img' />
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu align='end'>
                  <div className='p-2'>
                    <div className='media'>
                      <div className='media-head me-2'>
                        <div className='avatar avatar-primary avatar-sm avatar-rounded'>
                          <img src={picture} alt='user' className='avatar-img' />
                        </div>
                      </div>
                      <div className='media-body'>
                        <Dropdown>
                          <div className='d-block fw-medium text-dark'>{nickname}</div>
                        </Dropdown>
                        <div className='fs-7'>{email}</div>
                      </div>
                    </div>
                  </div>
                  <Dropdown.Divider as='div' />
                  <Dropdown.Item as={Link} to='/pages/profile'>
                    <span className='dropdown-icon feather-icon'>
                      <User />
                    </span>
                    <span>Profile</span>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => logout()}>
                    <span className='dropdown-icon feather-icon'>
                      <LogOut />
                    </span>
                    <span>Sign Out</span>
                  </Dropdown.Item>
                  <h6 className='dropdown-header'>Manage Account</h6>
                  <Dropdown.Item>
                    <span className='dropdown-icon feather-icon'>
                      <Settings />
                    </span>
                    <span>Settings</span>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Item>
          </Nav>
        </div>
      </Container>
    </Navbar>
  )
}

const mapStateToProps = ({ theme, auth0Reducer }) => {
  const { navCollapsed } = theme
  const { name, nickname, picture, email, email_verified, sub } = auth0Reducer
  return { navCollapsed, name, nickname, picture, email, email_verified, sub }
}

export default connect(mapStateToProps, { toggleCollapsedNav, setUser })(AuthenticatedNavbar)
