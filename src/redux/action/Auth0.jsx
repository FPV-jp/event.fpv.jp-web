import { AUTH0_ACCESS_TOKEN, AUTH0_INVOKING, AUTH0_USER } from 'redux/constants/Auth0'

export function setToken(accessToken) {
  return {
    type: AUTH0_ACCESS_TOKEN,
    accessToken,
  }
}

export function setUser(name, nickname, picture, email, email_verified, sub) {
  return {
    type: AUTH0_USER,
    name,
    nickname,
    picture,
    email,
    email_verified,
    sub,
  }
}

export function setInvoking(invoking) {
  return {
    type: AUTH0_INVOKING,
    invoking,
  }
}

//   {
//     "given_name": "友和",
//     "family_name": "田高",
//     "nickname": "tantaka.tomokazu",
//     "name": "田高友和",
//     "picture": "https://lh3.googleusercontent.com/a/ACg8ocIDmKG8tLAFy_AhuwOGS-4lXiI8vlEPl8feQRSrxEK9AZU=s96-c",
//     "locale": "ja",
//     "updated_at": "2023-12-07T05:10:27.207Z",
//     "email": "tantaka.tomokazu@gmail.com",
//     "email_verified": true,
//     "sub": "google-oauth2|107069145138026073821"
//   }

// {
//     "nickname": "denine223",
//     "name": "denine223@via.tokyo.jp",
//     "picture": "https://s.gravatar.com/avatar/ece8290b789b779d833bc4f910b16889?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fde.png",
//     "updated_at": "2023-12-07T07:47:01.850Z",
//     "email": "denine223@via.tokyo.jp",
//     "email_verified": true,
//     "sub": "auth0|656a971e508c0ac6a7dbf0a6"
//   }
