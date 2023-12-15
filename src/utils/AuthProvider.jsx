import * as auth0 from '@auth0/auth0-spa-js'
import { createContext, useCallback, useContext, useMemo } from 'react'
import { connect } from 'react-redux'
import { setInvoking, setToken, setUser } from 'redux_/action/Auth0'

const AuthContext = createContext()

const AuthProviderComponent = ({ children, setToken, setUser, setInvoking }) => {
  function createAuth0Client() {
    return auth0.createAuth0Client({
      domain: process.env.REACT_APP_AUTH0_DOMAIN,
      clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
      authorizationParams: {
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        redirect_uri: window.location.origin,
        scope: process.env.REACT_APP_AUTH0_SCOPES,
      },
    })
  }

  const loginWithRedirect = useCallback(async () => {
    setInvoking(true)
    const auth0Instance = await createAuth0Client()
    await auth0Instance.loginWithRedirect()
  }, [setInvoking])

  const logout = useCallback(async () => {
    setInvoking(true)
    const auth0Instance = await createAuth0Client()
    await auth0Instance.logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    })
    setToken(null)
    setUser(null, null, null, null, false, null)
  }, [setToken, setUser, setInvoking])

  const getUser = useCallback(async () => {
    setInvoking(true)
    const auth0Instance = await createAuth0Client()
    const user = await auth0Instance.getUser()
    if (user) {
      setUser(user.name, user.nickname, user.picture, user.email, user.email_verified, user.sub, user.locale ? user.locale : 'jp')
      const accessToken = await auth0Instance.getTokenSilently()
      setToken(accessToken)
      setInvoking(false)
      return user
    }
    var hasAuthParams = window.location.href.indexOf('code=') !== -1 && window.location.href.indexOf('state=') !== -1
    if (hasAuthParams) {
      await auth0Instance.handleRedirectCallback()
      const user = await auth0Instance.getUser()
      setUser(user.name, user.nickname, user.picture, user.email, user.email_verified, user.sub, user.locale ? user.locale : 'jp')
      const accessToken = await auth0Instance.getTokenSilently()
      setToken(accessToken)
      setInvoking(false)
      return user
    }
    setToken(null)
    setUser(null, null, null, null, false, null)
    setInvoking(false)
    return user
  }, [setToken, setUser, setInvoking])

  const authContextValue = useMemo(
    () => ({
      loginWithRedirect,
      logout,
      getUser,
    }),
    [loginWithRedirect, logout, getUser],
  )

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

const mapDispatchToProps = {
  setToken,
  setUser,
  setInvoking,
}

export default connect(null, mapDispatchToProps)(AuthProviderComponent)
