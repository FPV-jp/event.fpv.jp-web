import logo from 'assets/dist/img/logo-light.png'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from 'utils/AuthProvider'

const Header = () => {
  // const loginPath = useMatch('/auth/login')
  // const signupPath = useMatch('/auth/signup')

  const { loginWithRedirect } = useAuth()
  return (
    <Navbar expand='xl' className='hk-navbar navbar-light fixed-top'>
      <Container>
        <div className='nav-start-wrap'>
          <Navbar.Brand as={Link} to='/'>
            <img className='brand-img d-inline-block' src={logo} alt='brand' />
          </Navbar.Brand>
        </div>
        <div className='nav-end-wrap'>
          <Nav as='ul' className='flex-row'>
            <Nav.Item as='li' className='nav-link px-1 py-0'>
              <Button variant='primary' onClick={() => loginWithRedirect()}>
                Login
              </Button>
            </Nav.Item>
            {/* 
            <Nav.Item as='li' className='nav-link py-0'>
              <Button size='sm' variant='outline-light'>
                <span>
                  <span className='icon'>
                    <span className='feather-icon'>
                      <HelpCircle />
                    </span>
                  </span>
                  <span>Get Help</span>
                </span>
              </Button>
            </Nav.Item> 
            */}
            {/* 
            {loginPath && (
              <Nav.Item as='li' className='nav-link py-0'>
                <Button size='sm' variant='outline-light'>
                  <span>
                    <span className='icon'>
                      <span className='feather-icon'>
                        <HelpCircle />
                      </span>
                    </span>
                    <span>Get Help</span>
                  </span>
                </Button>
              </Nav.Item>
            )}
            {signupPath && (
              <>
                <Nav.Item as='li' className='nav-link px-1 py-0'>
                  <Button variant='primary' as={Link} to='#'>
                    Help
                  </Button>
                </Nav.Item>
                <Nav.Item as='li' className='nav-link px-1 py-0'>
                  <Button variant='outline-light' as={Link} to='login'>
                    Sign In
                  </Button>
                </Nav.Item>
              </>
            )} 
            */}
          </Nav>
        </div>
      </Container>
    </Navbar>
  )
}

export default Header
