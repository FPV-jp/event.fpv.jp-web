import { AUTH0_ACCESS_TOKEN, AUTH0_EXPIRES_AT, AUTH0_ID_TOKEN, AUTH0_INVOKING, AUTH0_USER } from 'redux_/constants/Auth0'

export const initialState = {
  invoking: false,
  accessToken: null,
  idToken: null,
  expiresAt: null,
  name: null,
  nickname: null,
  picture: null,
  email: null,
  email_verified: false,
  sub: null,
  locale: 'ja',
}

const saveLocalStorage = (type, value) => {
  value ? localStorage.setItem(type, value) : localStorage.removeItem(type)
}

const Auth0Reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH0_ACCESS_TOKEN:
      saveLocalStorage(AUTH0_ACCESS_TOKEN, action.accessToken)
      return {
        ...state,
        accessToken: action.accessToken,
      }
    case AUTH0_ID_TOKEN:
      saveLocalStorage(AUTH0_ID_TOKEN, action.idToken)
      return {
        ...state,
        idToken: action.idToken,
      }
    case AUTH0_EXPIRES_AT:
      saveLocalStorage(AUTH0_EXPIRES_AT, action.expiresAt)
      return {
        ...state,
        expiresAt: action.expiresAt,
      }

    case AUTH0_USER:
      return {
        ...state,
        name: action.name,
        nickname: action.nickname,
        picture: action.picture,
        email: action.email,
        email_verified: action.email_verified,
        sub: action.sub,
        locale: action.locale,
      }
    case AUTH0_INVOKING:
      return {
        ...state,
        invoking: action.invoking,
      }
    default:
      return state
  }
}

export default Auth0Reducer
