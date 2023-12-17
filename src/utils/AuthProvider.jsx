import * as auth0 from '@auth0/auth0-spa-js'
import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { connect } from 'react-redux'
import { setAccessToken, setExpiresAt, setIdToken, setInvoking, setUser } from 'redux_/action/Auth0'
import { AUTH0_ACCESS_TOKEN, AUTH0_EXPIRES_AT, AUTH0_ID_TOKEN } from 'redux_/constants/Auth0'

const AuthContext = createContext()

const AuthProviderComponent = ({ children, setAccessToken, setIdToken, setExpiresAt, setUser, setInvoking }) => {
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
      const newInstance = await createAuth0Client()
      setAuth0Instance(newInstance)
      return newInstance
    }
    return auth0Instance
  }, [auth0Instance])

  // -------------- saveWithToken
  const saveWithToken = useCallback(
    async (auth0Instance, user) => {
      setUser(user.name, user.nickname, user.picture, user.email, user.email_verified, user.sub, user.locale ? user.locale : 'jp')
      const accessToken = await auth0Instance.getTokenSilently()
      setAccessToken(accessToken)
      const idToken = await auth0Instance.getIdTokenClaims()
      setIdToken(idToken.__raw)
      let expiresAt = JSON.stringify(idToken.exp * 1000 + new Date().getTime())
      setExpiresAt(expiresAt)
      setInvoking(false)
    },
    [setUser, setAccessToken, setIdToken, setExpiresAt, setInvoking],
  )

  // -------------- clear
  const clear = useCallback(async () => {
    setExpiresAt(null)
    setIdToken(null)
    setAccessToken(null)
    setUser(null, null, null, null, false, null)
  }, [setUser, setAccessToken, setIdToken, setExpiresAt])

  // -------------- isAuthenticated
  const isAuthenticated = useCallback(async () => {
    var authenticated = await (await getAuth0Instance()).isAuthenticated()
    if (!authenticated) {
      const expiresAt = localStorage.getItem(AUTH0_EXPIRES_AT)
      authenticated = expiresAt !== null && new Date().getTime() < JSON.parse(expiresAt)
    }
    if (authenticated) {
      setAccessToken(localStorage.getItem(AUTH0_ACCESS_TOKEN))
      setIdToken(localStorage.getItem(AUTH0_ID_TOKEN))
      const token = localStorage.getItem(AUTH0_ID_TOKEN).split('.')[1]
      const base64 = token.replace(/-/g, '+').replace(/_/g, '/')
      const user = JSON.parse(decodeURIComponent(window.atob(base64)))
      setUser(user.name, user.nickname, user.picture, user.email, user.email_verified, user.sub, user.locale ? user.locale : 'jp')
    }
    return authenticated
  }, [getAuth0Instance, setAccessToken, setIdToken, setUser])

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
    await clear()
  }, [setInvoking, getAuth0Instance, clear])

  // -------------- getUser
  const getUser = useCallback(async () => {
    setInvoking(true)
    const auth0Instance = await getAuth0Instance()
    const user = await auth0Instance.getUser()
    if (user) {
      await saveWithToken(auth0Instance, user)
      return user
    }
    var hasAuthParams = window.location.href.indexOf('code=') !== -1 && window.location.href.indexOf('state=') !== -1
    if (hasAuthParams) {
      await auth0Instance.handleRedirectCallback()
      await saveWithToken(auth0Instance, await auth0Instance.getUser())
      return user
    }
    await clear()
    setInvoking(false)
    return user
  }, [setInvoking, getAuth0Instance, saveWithToken, clear])

  // export --------------
  const authContextValue = useMemo(
    () => ({
      isAuthenticated,
      loginWithRedirect,
      logout,
      getUser,
    }),
    [isAuthenticated, loginWithRedirect, logout, getUser],
  )

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

const mapDispatchToProps = {
  setAccessToken,
  setUser,
  setExpiresAt,
  setIdToken,
  setInvoking,
}

export default connect(null, mapDispatchToProps)(AuthProviderComponent)
