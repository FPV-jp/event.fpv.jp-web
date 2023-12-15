import * as auth0 from '@auth0/auth0-spa-js'
import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { connect } from 'react-redux'
import { setAccessToken, setIdToken, setInvoking, setUser } from 'redux_/action/Auth0'

const AuthContext = createContext()

const AuthProviderComponent = ({ children, setAccessToken, setIdToken, setUser, setInvoking }) => {
  const [auth0Instance, setAuth0Instance] = useState(null)

  const createAuth0Client = () => {
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

  // -------------- getAuth0Instance
  const getAuth0Instance = useCallback(async () => {
    if (!auth0Instance) {
      const instance = await createAuth0Client()
      setAuth0Instance(instance)
      return instance
    }
    return auth0Instance
  }, [auth0Instance])

  // -------------- save
  const save = useCallback(
    async (auth0Instance, user) => {
      setUser(user.name, user.nickname, user.picture, user.email, user.email_verified, user.sub, user.locale ? user.locale : 'jp')
      const accessToken = await auth0Instance.getTokenSilently()
      setAccessToken(accessToken)
      const idToken = await auth0Instance.getIdTokenClaims()
      setIdToken(idToken.__raw)
      console.log(idToken)
      setInvoking(false)
    },
    [setUser, setAccessToken, setIdToken, setInvoking],
  )

  // -------------- clear
  const clear = useCallback(async () => {
    setIdToken(null)
    setAccessToken(null)
    setUser(null, null, null, null, false, null)
  }, [setUser, setAccessToken, setIdToken])

  // -------------- loginWithRedirect
  const loginWithRedirect = useCallback(async () => {
    setInvoking(true)
    await (await getAuth0Instance()).loginWithRedirect()
  }, [setInvoking, getAuth0Instance])

  // -------------- logout
  const logout = useCallback(async () => {
    setInvoking(true)
    await (
      await getAuth0Instance()
    ).logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    })
    clear()
  }, [setInvoking, getAuth0Instance, clear])

  // -------------- getUser
  const getUser = useCallback(async () => {
    setInvoking(true)
    const auth0Instance = await getAuth0Instance()
    const user = await auth0Instance.getUser()
    if (user) {
      save(auth0Instance, user)
      return user
    }
    var hasAuthParams = window.location.href.indexOf('code=') !== -1 && window.location.href.indexOf('state=') !== -1
    if (hasAuthParams) {
      await auth0Instance.handleRedirectCallback()
      save(auth0Instance, await auth0Instance.getUser())
      return user
    }
    clear()
    setInvoking(false)
    return user
  }, [setInvoking, getAuth0Instance, save, clear])

  // export --------------
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
  setAccessToken,
  setUser,
  setIdToken,
  setInvoking,
}

export default connect(null, mapDispatchToProps)(AuthProviderComponent)
