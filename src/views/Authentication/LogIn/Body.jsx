import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { Button, Card, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { Eye, EyeOff } from 'react-feather'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from 'utils/AuthProvider'

const Body = (props) => {
  let history = useNavigate()

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const { loginWithRedirect } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    history('/')
  }

  return (
    <div className='hk-pg-body'>
      <Container>
        <Row>
          <Col sm={10} className='position-relative mx-auto'>
            <div className='auth-content py-8'>
              <Form className='w-100' onSubmit={(e) => handleSubmit(e)}>
                <Row>
                  <Col lg={5} md={7} sm={10} className='mx-auto'>
                    <Card className='card-lg card-border'>
                      <Card.Body>
                        <h4 className='mb-4 text-center'>Sign in to your account</h4>
                        <Button
                          variant='outline-dark'
                          className='btn-rounded btn-block mb-3'
                          onClick={async (e) => {
                            e.preventDefault()
                            loginWithRedirect()
                          }}
                        >
                          <span>
                            <span className='icon'>
                              <FontAwesomeIcon icon={faGoogle} />
                            </span>
                            <span>Sign In with Gmail</span>
                          </span>
                        </Button>
                        <Button variant='social-facebook' className='btn-social btn-rounded btn-block'>
                          <span>
                            <span className='icon'>
                              <FontAwesomeIcon icon={faFacebook} />
                            </span>
                            <span>Sign In with Facebook</span>
                          </span>
                        </Button>
                        <div className='title-sm title-wth-divider divider-center my-4'>
                          <span>Or</span>
                        </div>
                        <Row className='gx-3'>
                          <Col as={Form.Group} lg={12} className='mb-3'>
                            <div className='form-label-group'>
                              <Form.Label>User Name</Form.Label>
                            </div>
                            <Form.Control placeholder='Enter username or email ID' type='text' value={userName} onChange={(e) => setUserName(e.target.value)} />
                          </Col>
                          <Col as={Form.Group} lg={12} className='mb-3'>
                            <div className='form-label-group'>
                              <Form.Label>Password</Form.Label>
                              <Link to='#' className='fs-7 fw-medium'>
                                Forgot Password ?
                              </Link>
                            </div>
                            <InputGroup className='password-check'>
                              <span className='input-affix-wrapper'>
                                <Form.Control placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} />
                                <Link to='#' className='input-suffix text-muted' onClick={() => setShowPassword(!showPassword)}>
                                  <span className='feather-icon'>{showPassword ? <EyeOff className='form-icon' /> : <Eye className='form-icon' />}</span>
                                </Link>
                              </span>
                            </InputGroup>
                          </Col>
                        </Row>
                        <div className='d-flex justify-content-center'>
                          <Form.Check id='logged_in' className='form-check-sm mb-3'>
                            <Form.Check.Input type='checkbox' defaultChecked />
                            <Form.Check.Label className='text-muted fs-7'>Keep me logged in</Form.Check.Label>
                          </Form.Check>
                        </div>
                        <Button variant='primary' type='submit' className='btn-uppercase btn-block'>
                          Login
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Body
