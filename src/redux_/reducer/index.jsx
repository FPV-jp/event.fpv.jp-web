import { combineReducers } from 'redux'
import Auth0Reducer from './Auth0'
import ChatReducer from './Chat'
import ChatPopupReducer from './ChatPopup'
import EmailReducer from './Email'
import Theme from './Theme'
import ToDoReducer from './ToDo'

const reducers = combineReducers({
  auth0Reducer: Auth0Reducer,
  chatReducer: ChatReducer,
  chatPopupReducer: ChatPopupReducer,
  emailReducer: EmailReducer,
  theme: Theme,
  toDoReducer: ToDoReducer,
})

export default reducers
