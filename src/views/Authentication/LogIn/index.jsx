import Footer from 'layout/Footer'
import Header from 'layout/Header'
import Body from './Body'

const LoginClassic = () => {
  return (
    <div>
      <Header />
      <div className='hk-pg-wrapper'>
        <Body />
        <Footer />
      </div>
    </div>
  )
}

export default LoginClassic
