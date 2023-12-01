import { AUTH0_ACCESS_TOKEN, AUTH0_INVOKING, AUTH0_USER } from 'redux/constants/Auth0'

export const initialState = {
  invoking: false,
  accessToken: null,
  name: null,
  nickname: null,
  picture: null,
  email: null,
  email_verified: false,
  sub: null,
}

const Auth0Reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH0_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.accessToken,
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
        userId: action.userId,
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
