import { AUTH0_ACCESS_TOKEN, AUTH0_ID_TOKEN, AUTH0_INVOKING, AUTH0_USER } from 'redux_/constants/Auth0'

export function setAccessToken(accessToken) {
  return {
    type: AUTH0_ACCESS_TOKEN,
    accessToken,
  }
}

export function setIdToken(idToken) {
  return {
    type: AUTH0_ID_TOKEN,
    idToken,
  }
}

export function setUser(name, nickname, picture, email, email_verified, sub, locale) {
  return {
    type: AUTH0_USER,
    name,
    nickname,
    picture,
    email,
    email_verified,
    sub,
    locale,
  }
}

export function setInvoking(invoking) {
  return {
    type: AUTH0_INVOKING,
    invoking,
  }
}
